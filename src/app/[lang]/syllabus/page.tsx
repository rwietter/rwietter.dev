import Syllabus from '@/domains/syllabus/compose'
import fs from 'node:fs/promises'
import path from 'node:path'
import { getMdxSource } from 'src/lib/serializeMdx'
import { WorkerThread } from 'src/lib/worker'
import { workerPath } from 'utils/workerPath'

const Page: React.FC = async () => {
  const data = await getData()

  if ('error' in data) {
    return <p>Sorry, there was an error loading the syllabus.</p>
  }

  return (
    <article className='syllabus'>
      <Syllabus data={data} />
    </article>
  )
}

export default Page

async function getData() {
  const worker = new WorkerThread()
  try {
    const [main] = await fs.readdir(
      path.join(process.cwd(), 'public', 'syllabus'),
    )
    const filePath = path.join(process.cwd(), 'public', 'syllabus', `${main}`)

    const file = await worker.runWorker<string>(
      workerPath('fileReaderWorker.js'),
      filePath,
    )

    const mdxSource = await getMdxSource(file)

    return {
      content: mdxSource,
    }
  } catch (err) {
    console.error('src/app/syllabus', err)
    worker.terminate()
    return {
      error: err as Error,
    }
  }
}
