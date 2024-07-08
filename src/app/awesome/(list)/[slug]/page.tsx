import matter from 'gray-matter'
import type { Metadata } from 'next'
import fs from 'node:fs'
import path from 'node:path'
import Markdown from 'react-markdown'
import { makeSeo } from 'src/components/SEO/makeSeo'
import styles from 'src/domains/awesome/list/styles.module.css'
import md from 'styles/github-markdown.module.css'
import rehypeExternalLinks from 'rehype-external-links'

type PageProps = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

async function getData(slug: string) {
  try {
    let file = ''

    const filepath = path.join(process.cwd(), 'public', 'awesome', `${slug}.md`)

    if (fs.existsSync(filepath)) {
      file = fs.readFileSync(filepath, 'utf8')
    }

    const { content, data } = matter(file)

    return {
      data: {
        content,
        frontmatter: {
          ...data,
        },
      },
    }
  } catch (error) {
    return {
      data: {
        content: '',
        frontmatter: {},
      },
    }
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const slug = params.slug
  const { data } = await getData(slug)

  if (!data.frontmatter) {
    return makeSeo({
      title: 'Page not found',
      description: 'Page not found',
      slug: '/blog/article/not-found',
      image: '',
      ogText: 'Page not found',
      keywords: 'article, blog, rwietter, web development, programming, tech',
    })
  }

  const seo = makeSeo({
    title: data.frontmatter.title.trim(),
    description: data.frontmatter.description,
    image: data.frontmatter.image,
    ogText: data.frontmatter.description,
    keywords: `${data.frontmatter?.keywords} article, blog, rwietter, web development, programming, tech`,
    author: data.frontmatter.author,
    slug: `/blog/article/${slug}`,
    abstract: data.frontmatter.description,
  })

  return seo
}

export const revalidate = 60

const Page = async (props: PageProps) => {
  const { slug } = props.params
  const { data } = await getData(slug)

  if (!data.frontmatter) {
    return
  }

  const { content, frontmatter } = data

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id:': 'https://rwietter.dev',
    },
    headline: data.frontmatter.title,
    author: 'Maurício Witter',
    articleBody: content,
    backstory: frontmatter.description,
    license: 'CC-BY-SA-4.0',
    url: `https://rwietter.dev/blog/article/${slug}`,
    text: frontmatter.description,
    keywords: 'article, blog, rwietter, web development, programming, tech',
    image: frontmatter.image,
    datePublished: frontmatter.publishedAt,
    dateModified: frontmatter.updatedAt,
  }

  return (
    <>
      <script
        type='application/ld+json'
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className={styles.container}>
        <Markdown
          className={md['markdown-body']}
          rehypePlugins={[[rehypeExternalLinks, { target: '_blank' }]]}
        >
          {content}
        </Markdown>
      </section>
    </>
  )
}

export default Page
