'use client'

import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote'
import { type FC, memo } from 'react'
import TextHighlight from 'src/@base/components/TextHighlight/TextHighlight'

interface ArticleData {
  mdxSource: MDXRemoteSerializeResult
}

const components = {
  TextHighlight,
}

const Mark: FC<ArticleData> = ({ mdxSource }) => {
  return <MDXRemote {...mdxSource} components={components} />
}

export default memo(Mark)
