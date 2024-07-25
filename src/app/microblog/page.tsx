import { getMdxSource } from '@/lib/serializeMdx'
import { WorkerThread } from '@/lib/worker'
import dynamic from 'next/dynamic'
import fs from 'node:fs/promises'
import path from 'node:path'
import { workerPath } from 'utils/workerPath'

const Microblog = dynamic(() => import('@/domains/microblog/Microblog'))

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

async function getData() {
  const worker = new WorkerThread()
  try {
    const [main] = await fs.readdir(
      path.join(process.cwd(), 'public', 'microblog'),
    )
    const filePath = path.join(process.cwd(), 'public', 'microblog', `${main}`)

    const file = await worker.runWorker<string>(
      workerPath('fileReaderWorker.js'),
      filePath,
    )

    const mdxSource = await getMdxSource(file)

    return {
      content: mdxSource,
    }
  } catch (err) {
    console.error(`[${process.cwd()}src/app/microblog]`, err)
    worker.terminate()
    return {
      error: err as Error,
    }
  }
}
