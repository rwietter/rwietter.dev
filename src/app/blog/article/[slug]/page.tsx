import matter from 'gray-matter'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import fs from 'node:fs'
import path from 'node:path'
import { Suspense } from 'react'
import { makeSeo } from 'src/components/SEO/makeSeo'
import ArticleContent from 'src/domains/article/content'
import ArticleHeader from 'src/domains/article/header'
import styles from 'src/domains/article/styles.module.css'
import { Post, PostFrontMatter } from 'src/domains/article/ts'
import { blurImage } from 'utils/blur-image'

const ArticleFooter = dynamic(() => import('src/domains/article/footer'))

type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
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

  const { frontmatter }: Post = data

  const seo = makeSeo({
    title: frontmatter.title.trim(),
    description: frontmatter.description,
    image: frontmatter.image,
    ogText: frontmatter.description,
    keywords: 'article, blog, rwietter, web development, programming, tech',
    author: frontmatter.author,
    slug: `/blog/article/${slug}`,
    abstract: frontmatter.description,
  })

  return seo
}

export const revalidate = 60

async function getData(slug: string) {
  try {
    const file = fs.readFileSync(
      path.join(process.cwd(), 'public', 'posts', `${slug}.mdx`),
      'utf8',
    )

    const { content, data } = matter(file)

    return {
      data: {
        frontmatter: data as PostFrontMatter,
        slug: file.replace('.mdx', ''),
        blurDataURL: await blurImage(data.image),
        content,
      },
    }
  } catch (error) {
    return {
      data: {
        frontmatter: null,
        slug: '',
        blurDataURL: '',
        content: '',
      },
    }
  }
}

const Page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params
  const { data } = await getData(slug)

  if (!data.frontmatter) {
    return
  }

  const { content, frontmatter }: Post = data

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id:': 'https://rwietterc.xyz',
    },
    headline: data.frontmatter.title,
    author: 'Maurício Witter',
    articleBody: content,
    backstory: frontmatter.description,
    license: 'CC-BY-SA-4.0',
    url: `https://rwietterc.xyz/blog/article/${slug}`,
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
      <section className={styles.articleContainer}>
        <div className={styles.articleMarkdownContainer}>
          <ArticleHeader content={content} frontmatter={frontmatter} />
          <div className={styles.imageContainer}>
            <div className={styles.articleImage}>
              <Image
                fill
                quality={50}
                alt={frontmatter.alternativeText}
                loading='lazy'
                fetchPriority='high'
                rel='preload'
                placeholder='blur'
                style={{ objectFit: 'cover' }}
                src={data.blurDataURL.src}
                blurDataURL={data.blurDataURL.blurDataURL}
              />
            </div>
            <p className={styles.imageCredit}>{frontmatter.caption}</p>
          </div>
          <ArticleContent content={content} />
        </div>
        <Suspense fallback={<div>...</div>}>
          <ArticleFooter post={frontmatter} />
        </Suspense>
      </section>
    </>
  )
}

export default Page
