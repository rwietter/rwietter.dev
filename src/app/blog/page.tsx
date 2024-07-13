import matter from 'gray-matter'
import type { Metadata } from 'next'
import fs from 'node:fs'
import path from 'node:path'
import { makeSeo } from 'src/components/SEO/makeSeo'
import type { PostFrontMatter } from 'src/domains/article/ts'
import { BlogPosts } from 'src/domains/blog'
import generateRssFeed from 'utils/feed-rss'

const getData = async () => {
  try {
    const files = fs.readdirSync(path.join(process.cwd(), 'public', 'posts'))
    const mdxFiles = files.filter((file) =>
      ['.mdx', '.md'].includes(path.extname(file)),
    )

    const posts = await Promise.all(
      mdxFiles.map(async (file) => {
        const source = fs.readFileSync(
          path.join(process.cwd(), 'public', 'posts', file),
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
    if (error instanceof Error) {
      console.error(
        `[ERROR]: ${error.name}\n[MESSAGE]: ${error.message}\n[STACK]: ${error.stack}`,
      )
    }
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

const Page = async () => {
  const data = await getData()
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
