import { makeSeo } from '@/components/SEO/makeSeo'
import ArticleContent from '@/domains/article/content'
import ArticleHeader from '@/domains/article/header'
import styles from '@/domains/article/styles.module.css'
import { getMdxSource } from '@/lib/serializeMdx'
import { getDictionary } from '@/shared/i18n/dictionaries'
import type { Langs } from '@/shared/i18n/langs'
import type { Post, PostFrontMatter } from '@/types/Post'
import matter from 'gray-matter'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import fs from 'node:fs'
import path from 'node:path'
import { getReadingTime } from 'utils/getTimeReading'

const ArticleFooter = dynamic(() => import('@/domains/article/footer'))

type PagePropTypes = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

const Page = async (props: PagePropTypes) => {
  const { slug } = props.params
  const { data } = await getData({ slug })
  const t = await getDictionary('en')

  if (!data) return <p>Page not found</p>

  const { content, frontmatter, mdxSource, readingTime }: Post = data

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
      <section className={styles.articleMarkdownContainer}>
        <ArticleHeader
          content={content}
          readingTime={readingTime}
          frontmatter={frontmatter}
          i18n={t.blogPost.header}
        />
        <ArticleContent mdxSource={mdxSource} />
      </section>
      <ArticleFooter post={frontmatter} i18n={t.blogPost.footer} />
    </>
  )
}

export default Page

async function getData({ slug }: { slug: string }) {
  try {
    const filepath = path.join(
      process.cwd(),
      'public',
      'til',
      `${slug}.mdx`,
    )

    if (!fs.existsSync(filepath)) {
      return { data: null, error: new Error('File not found') }
    }

    const file = fs.readFileSync(filepath, 'utf8')
    const { content, data } = matter(file)
    const { readTime } = getReadingTime(content)
    const mdxSource = await getMdxSource(content)

    return {
      data: {
        frontmatter: data as PostFrontMatter,
        slug: data?.slug,
        content,
        mdxSource,
        readingTime: readTime,
      },
    }
  } catch (error) {
    console.error(`${process.cwd()}/public/til/${slug}.mdx`, error)
    return { data: null, error }
  }
}

export async function generateMetadata({
  params,
}: PagePropTypes): Promise<Metadata> {
  const slug = params.slug
  const { data } = await getData({ slug })

  if (!data) {
    return makeSeo({
      title: 'Page not found',
      description: 'Page not found',
      slug: '/not-found',
      image: '',
      ogText: 'Page not found',
      keywords: 'article, blog, rwietter, web development, programming, tech',
    })
  }

  const { frontmatter }: Post = data

  const seo = makeSeo({
    title: frontmatter.title?.trim(),
    description: frontmatter.description,
    image: frontmatter.image,
    ogText: frontmatter.description,
    keywords: `${frontmatter?.keywords} article, blog, rwietter, web development, programming, tech`,
    author: frontmatter.author,
    slug: `/blog/article/${slug}`,
    abstract: frontmatter.description,
  })

  return seo
}
