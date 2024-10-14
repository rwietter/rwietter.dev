import type { PostFrontMatter } from '@/types/Post'
import matter from 'gray-matter'
import type { Metadata } from 'next'
import fs from 'node:fs'
import path from 'node:path'
import type React from 'react'
import type { Langs } from 'shared/locale/langs'
import { makeSeo } from 'src/components/SEO/makeSeo'
import { BlogPosts } from 'src/domains/blog'
import generateRssFeed from 'utils/feed-rss'

const getData = async ({
  lang,
}: {
  lang: Langs
}) => {
  try {
    const files = fs.readdirSync(
      path.join(process.cwd(), 'public', 'posts', lang),
    )
    const mdxFiles = files.filter((file) =>
      ['.mdx'].includes(path.extname(file)),
    )

    const posts = await Promise.all(
      mdxFiles.map(async (file) => {
        const source = fs.readFileSync(
          path.join(process.cwd(), 'public', 'posts', lang, file),
          'utf8',
        )

        const { data, content } = matter(source)

        return {
          frontmatter: data as PostFrontMatter,
          slug: data?.slug,
          content,
        }
      }),
    )

    const sortedByDatePosts = posts.sort(
      (a, b) =>
        -new Date(a.frontmatter?.publishedAt) -
        -new Date(b.frontmatter?.publishedAt),
    )

    await generateRssFeed(sortedByDatePosts)

    return {
      posts: sortedByDatePosts,
    }
  } catch (error) {
    console.error(error)
    return {
      posts: [],
    }
  }
}

export const metadata: Metadata = makeSeo({
  title: 'Blog | Maurício Witter | Software Developer',
  description:
    'My blog, where I write about my experiences, my projects, and my life. :)',
  image:
    'https://res.cloudinary.com/ddwnioveu/image/upload/v1707422678/large_joshua_sortino_71v_Ab1_FXB_6g_unsplash_46a1453603.jpg',
  slug: '/blog',
  ogText:
    'My blog, where I write about my experiences, my projects, and my life. :)',
  abstract:
    'My blog, where I write about my experiences, my projects, and my life.',
  keywords: 'blog, experiences, projects, life',
})

const jsonLd = {
  type: 'Blog',
  authorName: 'Maurício Witter',
  url: 'https://rwietter.dev/blog',
  title: 'Blog | Maurício Witter | Software Developer',
  description:
    'My blog, where I write about my experiences, my projects, and my life. :)',
  image:
    'https://res.cloudinary.com/ddwnioveu/image/upload/v1707422678/large_joshua_sortino_71v_Ab1_FXB_6g_unsplash_46a1453603.jpg',
}

type PagePropTypes = {
  params: {
    lang: Langs
  }
}

const Page: React.FC<PagePropTypes> = async ({ params }) => {
  const data = await getData({ lang: params.lang })

  if ('error' in data) {
    return <p>Ops... Something went wrong. Please, try again later.</p>
  }

  return (
    <>
      <script
        type='application/ld+json'
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPosts posts={data.posts} />
    </>
  )
}

export default Page
