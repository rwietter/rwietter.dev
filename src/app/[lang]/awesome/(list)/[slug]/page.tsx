import matter from 'gray-matter'
import type { Metadata } from 'next'
import { serialize } from 'next-mdx-remote/serialize'
import fs from 'node:fs'
import path from 'node:path'
import rehypeExternalLinks from 'rehype-external-links'

import MDX from '@/base/MDX'
import { makeSeo } from '@/components/SEO/makeSeo'
import styles from '@/domains/awesome/list/styles.module.css'
import { WorkerThread } from '@/lib/worker'
import { workerPath } from 'utils/workerPath'

type PageProps = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

const Page = async (props: PageProps) => {
  const { slug } = props.params
  const { data } = await getData(slug)

  if (!data.frontmatter) {
    return
  }

  const { content, frontmatter } = data

  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [[rehypeExternalLinks, { target: '_blank' }]],
    },
  })

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
      <article className={`${styles.container} awesome`}>
        <MDX mdxSource={mdxSource} />
      </article>
    </>
  )
}

export default Page

export async function generateStaticParams() {
  const data = await generatePaths()

  return data?.awesome.map((list) => ({
    slug: list.slug,
  }))
}

const generatePaths = async () => {
  try {
    const files = fs.readdirSync(path.join(process.cwd(), 'public', 'awesome'))
    const paths = files.map((file) => ({
      slug: file.replace(/\.md$/, ''),
    }))

    return {
      awesome: paths,
    }
  } catch (error) {
    return {
      error: error as Error,
      awesome: [],
    }
  }
}

async function getData(slug: string) {
  const worker = new WorkerThread()
  try {
    const filepath = path.join(
      process.cwd(),
      'public',
      'awesome',
      `${slug}.mdx`,
    )

    if (!fs.existsSync(filepath)) {
      return { data: { error: new Error('File not found') } }
    }

    const file = await worker.runWorker(
      workerPath('fileReaderWorker.js'),
      filepath,
    )

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
    console.error('[awesome/(list)/[slug]/page.tsx]', error)
    worker.terminate()
    return {
      data: {
        error,
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
