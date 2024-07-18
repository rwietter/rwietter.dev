import Microblog from '@/domains/microblog/Microblog'
import { getMdxSource } from '@/lib/serializeMdx'
import { WorkerThread } from '@/lib/worker'
import type { MDXSerialized } from '@/types/MDX'
import fs from 'node:fs/promises'
import path from 'node:path'

const Page: React.FC = async () => {
  const data = await getData()

  if ('error' in data) {
    return <p>Sorry, there was an error loading the microblog posts.</p>
  }

  return (
    <article className='microblog'>
      <Microblog data={data} />
    </article>
  )
}

export default Page

type Data =
  | {
      content: MDXSerialized
    }
  | { error: Error }

async function getData(): Promise<Data> {
  try {
    const [mainEntityOfPage] = await fs.readdir(
      path.join(process.cwd(), 'public', 'microblog'),
    )
    const filePath = path.join(
      process.cwd(),
      'public',
      'microblog',
      `${mainEntityOfPage}`,
    )

    const file = await new WorkerThread().runWorker<string>(
      workerPath('fileReaderWorker.js'),
      filePath,
    )

    const mdxSource = await getMdxSource(file)

    return {
      content: mdxSource,
    }
  } catch (err) {
    console.error(`[${process.cwd()}src/app/microblog]`, err)
    return {
      error: err as Error,
    }
  }
}

function workerPath(workerName: string) {
  return path.join(process.cwd(), 'public', 'workers', `${workerName}`)
}
