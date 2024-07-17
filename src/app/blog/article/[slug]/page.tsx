import { makeSeo } from '@/components/SEO/makeSeo'
import ArticleContent from '@/domains/article/content'
import ArticleHeader from '@/domains/article/header'
import styles from '@/domains/article/styles.module.css'
import type { Post, PostFrontMatter } from '@/types/Post'
import matter from 'gray-matter'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import fs from 'node:fs'
import path from 'node:path'
import { Worker } from 'node:worker_threads'
import { getReadingTime } from 'utils/getTimeReading'

const ArticleFooter = dynamic(() => import('@/domains/article/footer'))

type PagePropTypes = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export const revalidate = 60

const Page = async (props: PagePropTypes) => {
  const { slug } = props.params
  const { data } = await getData(slug)

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
        />
        <ArticleContent mdxSource={mdxSource} />
      </section>
      <ArticleFooter post={frontmatter} />
    </>
  )
}

export default Page

function runWorker(workerPath: string, workerData: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(workerPath, {
      workerData,
    })
    worker.on('message', resolve)
    worker.on('error', (error) => {
      console.error('Worker error:', error)
      reject(error)
    })
    worker.on('messageerror', reject)
    worker.on('exit', (code) => {
      if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`))
    })
  })
}

async function getData(slug: string): Promise<{ data: Post | null }> {
  try {
    const filepath = path.join(process.cwd(), 'public', 'posts', `${slug}.mdx`)

    if (!fs.existsSync(filepath)) {
      return { data: null }
    }

    const fileReaderWorkerPath = path.join(
      process.cwd(),
      'public',
      'workers',
      'fileReaderWorker.js',
    )

    const file = await runWorker(fileReaderWorkerPath, filepath)

    const { content, data } = matter(file)
    const readingTime = getReadingTime(content)

    const mdxSourceWorkerPath = path.join(
      process.cwd(),
      'public',
      'workers',
      'serializeWorker.js',
    )
    const mdxSource = await runWorker(mdxSourceWorkerPath, content)
    // const mdxSource = await getMdxSource(content)

    return {
      data: {
        frontmatter: data as PostFrontMatter,
        slug: data?.slug,
        content,
        mdxSource,
        readingTime: readingTime.readTime,
      },
    }
  } catch (error) {
    console.error(`${process.cwd()}/public/posts/${slug}.mdx`, error)
    return {
      data: null,
    }
  }
}

// async function getMdxSource(article: string) {
//   const source = await serialize(article, {
//     mdxOptions: {
//       rehypePlugins: [
//         rehypeKatex,
//         [
//           rehypePrettyCode,
//           {
//             highlight: true,
//             lineNumbers: true,
//             theme: {
//               dark: 'github-dark-default',
//               light: 'github-light-default',
//             },
//           },
//         ],
//         [rehypeExternalLinks, { target: '_blank' }],
//       ],
//       remarkPlugins: [remarkGfm, remarkMath],
//       useDynamicImport: true,
//     },
//   })
//   return source
// }

export async function generateMetadata({
  params,
}: PagePropTypes): Promise<Metadata> {
  const slug = params.slug
  const { data } = await getData(slug)

  if (!data) {
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
