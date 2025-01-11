import type { Langs } from '@/shared/i18n/langs'
import type { PostFrontMatter } from '@/types/Post'
import matter from 'gray-matter'
import type { Metadata } from 'next'
import fs from 'node:fs'
import path from 'node:path'
import type React from 'react'
import { makeSeo } from 'src/components/SEO/makeSeo'
// import generateRssFeed from 'utils/feed-rss'

import styles from './styles.module.css'
import { AtomsList } from '@/domains/atoms/list'

const getData = async () => {
  try {
    const files = fs.readdirSync(
      path.join(process.cwd(), 'public', 'atoms'),
    )
    const mdxFiles = files.filter((file) =>
      ['.mdx'].includes(path.extname(file)),
    )

    const atoms = await Promise.all(
      mdxFiles.map(async (file) => {
        const source = fs.readFileSync(
          path.join(process.cwd(), 'public', 'atoms', file),
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
    const sortedByDate = atoms.sort(
      (a, b) =>
        -new Date(a.frontmatter?.publishedAt) -
        -new Date(b.frontmatter?.publishedAt),
    )

    // await generateRssFeed(sortedByDate)

    return {
      atoms: sortedByDate,
    }
  } catch (error) {
    console.error(error)
    return {
      atoms: [],
    }
  }
}

export const metadata: Metadata = makeSeo({
  title: 'Atoms | Maurício Witter',
  description:
    'Atoms of interesting things that I have seen, read, or done.',
  image:
    'https://res.cloudinary.com/ddwnioveu/image/upload/v1707422678/large_joshua_sortino_71v_Ab1_FXB_6g_unsplash_46a1453603.jpg',
  slug: '/atoms',
  ogText:
    'Atoms of interesting things that I have seen, read, or done.',
  abstract:
    'Atoms of interesting things that I have seen, read, or done.',
  keywords: 'Atoms, quotes, books, articles, podcasts',
})

const jsonLd = {
  type: 'Atoms',
  authorName: 'Maurício Witter',
  url: 'https://rwietter.dev/til',
  title: 'Atoms | Maurício Witter',
  description:
    'Atoms of interesting things that I have seen, read, or done.',
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
      <h1 className={styles.title}>Atoms</h1>
      <AtomsList atoms={data.atoms} />
    </>
  )
}

export default Page
