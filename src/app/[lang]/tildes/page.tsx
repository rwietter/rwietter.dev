import type { Langs } from '@/shared/i18n/langs'
import type { PostFrontMatter } from '@/types/Post'
import matter from 'gray-matter'
import type { Metadata } from 'next'
import fs from 'node:fs'
import path from 'node:path'
import type React from 'react'
import { makeSeo } from 'src/components/SEO/makeSeo'
// import generateRssFeed from 'utils/feed-rss'

import { TilList } from '@/domains/til/list'
import styles from './styles.module.css'

const getData = async () => {
  try {
    const files = fs.readdirSync(
      path.join(process.cwd(), 'public', 'til'),
    )
    const mdxFiles = files.filter((file) =>
      ['.mdx'].includes(path.extname(file)),
    )

    const til = await Promise.all(
      mdxFiles.map(async (file) => {
        const source = fs.readFileSync(
          path.join(process.cwd(), 'public', 'til', file),
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
    const sortedByDate = til.sort(
      (a, b) =>
        -new Date(a.frontmatter?.publishedAt) -
        -new Date(b.frontmatter?.publishedAt),
    )

    // await generateRssFeed(sortedByDate)

    return {
      tildes: sortedByDate,
    }
  } catch (error) {
    console.error(error)
    return {
      tildes: [],
    }
  }
}

export const metadata: Metadata = makeSeo({
  title: 'Today I Learned | Maurício Witter | Software Developer',
  description:
    'A collection of small things I learn every day. :)',
  image:
    'https://res.cloudinary.com/ddwnioveu/image/upload/v1707422678/large_joshua_sortino_71v_Ab1_FXB_6g_unsplash_46a1453603.jpg',
  slug: '/til',
  ogText:
    'A collection of small things I learn every day. :)',
  abstract:
    'A collection of small things I learn every day. :)',
  keywords: 'til, experiences, projects, life',
})

const jsonLd = {
  type: 'Blog',
  authorName: 'Maurício Witter',
  url: 'https://rwietter.xyz/til',
  title: 'Today I Learned | Maurício Witter | Software Developer',
  description:
    'A collection of small things I learn every day. :)',
  image:
    'https://res.cloudinary.com/ddwnioveu/image/upload/v1707422678/large_joshua_sortino_71v_Ab1_FXB_6g_unsplash_46a1453603.jpg',
}

type PagePropTypes = {
  params: {
    lang: Langs
  }
}

const Page: React.FC<PagePropTypes> = async () => {
  const data = await getData()

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
      <h1 className={styles.title}>Today I Learned</h1>
      <span className={styles.description}>Every day is a new opportunity to learn something new 📚.</span>
      <TilList tildes={data.tildes} />
    </>
  )
}

export default Page
