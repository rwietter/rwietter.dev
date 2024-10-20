import { Categories } from '@/domains/categories'
import type { CategoryPost } from '@/types/Category'
import matter from 'gray-matter'
import fs from 'node:fs'
import path from 'node:path'
import type React from 'react'

type PagePropTypes = {
  params: {
    category: string
    lang: string
  }
}

const Page: React.FC<PagePropTypes> = ({ params }) => {
  const { category, lang } = params
  const { data, error } = getData({ category, lang })

  if (error || !data) {
    return <h1>Ops! Something went wrong...</h1>
  }

  return <Categories posts={data.posts} category={data.category} />
}

function getData({ category, lang }: { category: string; lang: string }) {
  try {
    const filePaths = fs.readdirSync(
      path.join(process.cwd(), 'public', 'posts', lang),
    )
    const mdxFilePaths = filePaths.filter((file) => file.endsWith('.mdx'))

    const posts = mdxFilePaths.reduce((acc: CategoryPost[], filePath) => {
      const source = fs.readFileSync(
        path.join(process.cwd(), 'public', 'posts', lang, filePath),
        'utf8',
      )
      const front = matter(source)?.data
      if (front.category === decodeURIComponent(category)) {
        const data: CategoryPost = {
          title: front.title,
          category: front.category,
          publishedAt: front.publishedAt,
          updatedAt: front.updatedAt,
          slug: filePath.replace(/\.mdx$/, ''),
        }
        // biome-ignore lint/performance/noAccumulatingSpread: <explanation>
        return [...acc, data]
      }
      return acc
    }, [])

    return {
      data: {
        posts,
        category,
      },
    }
  } catch (error) {
    console.error(`[CATEGORY]: ${category}`, error)
    return { data: null, error }
  }
}

export default Page
