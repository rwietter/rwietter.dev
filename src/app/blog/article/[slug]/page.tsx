import matter from 'gray-matter'
import type { Metadata } from 'next'
import { serialize } from 'next-mdx-remote/serialize'
import dynamic from 'next/dynamic'
import Script from 'next/script'
import fs from 'node:fs'
import path from 'node:path'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeKatex from 'rehype-katex'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { makeSeo } from 'src/components/SEO/makeSeo'
import ArticleContent from 'src/domains/article/content'
import ArticleHeader from 'src/domains/article/header'
import styles from 'src/domains/article/styles.module.css'
import type { Post, PostFrontMatter } from 'src/domains/article/ts'

const ArticleFooter = dynamic(() => import('src/domains/article/footer'))

type PageProps = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
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

export const revalidate = 60

async function getMdxSource(article: string) {
  const source = await serialize(article, {
    mdxOptions: {
      rehypePlugins: [
        rehypeKatex,
        [
          rehypePrettyCode,
          {
            highlight: true,
            lineNumbers: true,
            theme: {
              dark: 'github-dark-default',
              light: 'github-light-default',
            },
          },
        ],
        [rehypeExternalLinks, { target: '_blank' }],
      ],
      remarkPlugins: [remarkGfm, remarkMath],
      useDynamicImport: true,
    },
  })
  return source
}

async function getData(slug: string) {
  try {
    const extensions = ['.mdx', '.md']

    let file = ''
    for (const extension of extensions) {
      const filepath = path.join(
        process.cwd(),
        'public',
        'posts',
        `${slug}${extension}`,
      )
      if (fs.existsSync(filepath)) {
        file = fs.readFileSync(filepath, 'utf8')
        break
      }
    }

    const { content, data } = matter(file)
    const mdxSource = await getMdxSource(content)

    return {
      data: {
        frontmatter: data as PostFrontMatter,
        slug: data?.slug,
        content,
        mdxSource
      },
    }
  } catch (error) {
    return {
      data: {
        frontmatter: null,
        slug: '',
        content: '',
        mdxSource: null
      },
    }
  }
}

const Page = async (props: PageProps) => {
  const { slug } = props.params
  const { data } = await getData(slug)

  if (!data.frontmatter) {
    return
  }

  const { content, frontmatter, mdxSource }: Post = data

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
      <Script
        type='application/ld+json'
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        strategy='worker'
        defer
      />
      <section className={styles.articleMarkdownContainer}>
        <ArticleHeader content={content} frontmatter={frontmatter} />
        <ArticleContent mdxSource={mdxSource} />
      </section>
      <ArticleFooter post={frontmatter} />
    </>
  )
}

export default Page