import Microblog from '@/domains/microblog/Microblog'
import graymatter from 'gray-matter'
import fs from 'node:fs/promises'
import path from 'node:path'

const Page: React.FC = async () => {
  const data = await getData()

  if ('error' in data) {
    return <p>Sorry, there was an error loading the microblog posts.</p>
  }

  return <Microblog />
}

export default Page

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
async function getData(): Promise<any> {
  try {
    const files = await fs.readdir(
      path.join(process.cwd(), 'public', 'microblog'),
    )

    const data = Promise.all(
      files.map(async (file) => {
        const fileText = await fs.readFile(
          path.join(process.cwd(), 'public', 'microblog', file),
          'utf-8',
        )

        const { data, content } = graymatter(fileText)

        return {
          content,
          frontmatter: data,
        }
      }),
    )
    return data
  } catch (err) {
    return {
      error: err as Error,
    }
  }
}
