'use client'

import TextHighlight from 'base/components/TextHighlight/TextHighlight'
import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote'
import type { FC } from 'react'

interface ArticleData {
  mdxSource: MDXRemoteSerializeResult
}

const components = {
  TextHighlight,
}

const MDX: FC<ArticleData> = ({ mdxSource }) => {
  return <MDXRemote {...mdxSource} components={components} />
}

export { MDX }
