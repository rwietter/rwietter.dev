import type { MDXSerialized } from '@/types/MDX'
import { serialize } from 'next-mdx-remote/serialize'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeKatex from 'rehype-katex'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkToc from 'remark-toc'

import { transformerNotationDiff } from '@shikijs/transformers'
import { transformerColorizedBrackets } from '@shikijs/colorized-brackets'

const rehypePrettyCodeOptions = {
  highlight: true,
  lineNumbers: true,
  theme: {
    dark: 'github-dark-default',
    light: 'github-light-default',
  },
  transformers: [transformerNotationDiff(), transformerColorizedBrackets()],
}

export async function getMdxSource(article: string): Promise<MDXSerialized> {
  const source = await serialize(article, {
    mdxOptions: {
      rehypePlugins: [
        rehypeKatex,
        rehypeSlug,
        [rehypePrettyCode, { ...rehypePrettyCodeOptions }],
        [rehypeExternalLinks, { target: '_blank' }],
      ],
      remarkPlugins: [
        remarkGfm,
        remarkMath,
        [remarkToc, { heading: 'Contents', tight: true, ordered: false, inline: true }],
      ],
      useDynamicImport: true,
    },
    parseFrontmatter: true,
  })
  return source
}
