import { getMdxSource } from '@/lib/serializeMdx'
import { langs } from '@/shared/i18n/langs'
import dynamic from 'next/dynamic'
import { readFileSync, readdirSync } from 'node:fs'
import fs from 'node:fs/promises'
import path from 'node:path'

import styles from './styles.module.css'

const Microblog = dynamic(() => import('@/domains/microblog/Microblog'))

type PagePropTypes = {
  params: {
    lang: string
  }
}

const Page: React.FC<PagePropTypes> = async ({ params }) => {
  const data = await getData({ lang: params.lang })

  if ('error' in data) {
    return <p>Sorry, there was an error loading the microblog posts.</p>
  }

  return (
    <article className='microblog'>
      <h1 className={styles.title}>Microblog</h1>
      <Microblog data={data} />
    </article>
  )
}

export default Page

async function getData({ lang }: { lang: string }) {
  try {
    const [file] = await fs.readdir(
      path.join(process.cwd(), 'public', 'microblog', lang),
    )

    const filepath = path.join(process.cwd(), 'public', 'microblog', lang, file)

    const content = readFileSync(filepath, 'utf-8')
    const mdxSource = await getMdxSource(content)

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

export async function generateStaticParams({
  params,
}: {
  params: {
    lang: string
  }
}) {
  const data = await generatePaths({ lang: params.lang })

  return data?.posts.map((post) => ({
    slug: post.slug,
  }))
}

const generatePaths = async ({
  lang,
}: {
  lang: string
}) => {
  const files = []
  try {
    for await (const lang of langs) {
      const file = readdirSync(
        path.join(process.cwd(), 'public', 'microblog', lang),
      ).map((file) => {
        const slug = file.replace(/\.mdx$/, '')
        return {
          slug,
        }
      })
      files.push(...file)
    }

    return {
      posts: files,
    }
  } catch (error) {
    console.error(error)
    return {
      posts: [],
    }
  }
}
