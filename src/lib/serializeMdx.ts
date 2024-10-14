import type { MDXSerialized } from '@/types/MDX'
import { serialize } from 'next-mdx-remote/serialize'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeKatex from 'rehype-katex'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

export async function getMdxSource(article: string): Promise<MDXSerialized> {
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
    parseFrontmatter: true,
  })
  return source
}
