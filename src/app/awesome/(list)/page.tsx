import matter from 'gray-matter'
import type { Metadata } from 'next'
import Link from 'next/link'
import fs from 'node:fs'
import path from 'node:path'
import { makeSeo } from 'src/components/SEO/makeSeo'
import styles from 'src/domains/awesome/styles.module.css'

const getData = async () => {
  try {
    const files = fs.readdirSync(path.join(process.cwd(), 'public', 'awesome'))

    const posts = await Promise.all(
      files.map(async (file) => {
        const source = fs.readFileSync(
          path.join(process.cwd(), 'public', 'awesome', file),
          'utf8',
        )

        const { data, content } = matter(source)

        return {
          frontmatter: data,
          slug: data?.slug,
          content,
        }
      }),
    )

    const awesomeListsByPublishedDate = posts.sort(
      (a, b) =>
        -new Date(a.frontmatter?.publishedAt) -
        -new Date(b.frontmatter?.publishedAt),
    )

    return {
      awesome: awesomeListsByPublishedDate,
    }
  } catch (error) {
    return {
      awesome: [],
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
      <section className={styles.container}>
        <h1 className={styles.title}>Awesome Lists</h1>
        <ul className={styles.list}>
          {data.awesome.map((list) => (
            <Link
              href={`/awesome/${list.slug}`}
              key={list.slug}
              className={styles.item}
            >
              {list.frontmatter.title}
            </Link>
          ))}
        </ul>
      </section>
    </>
  )
}

export default Page
