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

    const posts = files.map((file) => {
      const content = fs.readFileSync(
        path.join(process.cwd(), 'public', 'awesome', file),
        'utf8',
      )
      const { data } = matter(content)
      return {
        frontmatter: data,
        slug: data?.slug,
      }
    })

    return {
      awesome: posts,
    }
  } catch (error) {
    return {
      error: error as Error,
    }
  }
}

export const metadata: Metadata = makeSeo({
  title: 'Awesome | Maurício Witter | Software Developer',
  description:
    'Awesome lists about programming, software development, and other cool stuff.',
  image:
    'https://res.cloudinary.com/ddwnioveu/image/upload/v1707422678/large_joshua_sortino_71v_Ab1_FXB_6g_unsplash_46a1453603.jpg',
  slug: '/awesome',
  ogText:
    'Awesome lists about programming, software development, and other cool stuff.',
  abstract:
    'Awesome lists are curated lists of awesome things, such as programming languages, libraries, frameworks, and other cool stuff.',
  keywords:
    'awesome, lists, programming, software development, computer science',
})

const jsonLd = {
  type: 'Blog',
  authorName: 'Maurício Witter',
  url: 'https://rwietter.xyz/awesome',
  title: 'Awesome | Maurício Witter | Software Developer',
  description:
    'Awesome lists about programming, software development, and other cool stuff.',
  image:
    'https://res.cloudinary.com/ddwnioveu/image/upload/v1707422678/large_joshua_sortino_71v_Ab1_FXB_6g_unsplash_46a1453603.jpg',
}

const Page = async () => {
  const data = await getData()

  if ('error' in data) {
    return <p>Sorry, there was an error loading the awesome lists.</p>
  }

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
          {data?.awesome.map((list) => (
            <Link
              href={`/awesome/${list.slug}`}
              key={list.slug}
              scroll={false}
              shallow={true}
              prefetch={true}
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
