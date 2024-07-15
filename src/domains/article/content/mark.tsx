'use client'

import Prism from 'prismjs'
import { type FC, memo, useEffect } from 'react'
import Markdown from 'react-markdown'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkHighlight from '../remarkHighlight/remarkHighlight'

import md from 'styles/github-markdown.module.css'
import 'utils/highlights'
import { components } from './headingId'

interface ArticleData {
  article: string
}

const Mark: FC<ArticleData> = ({ article }) => {
  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <Markdown
      className={md['markdown-body']}
      components={components}
      remarkPlugins={[remarkHighlight, remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex, [rehypeExternalLinks, { target: '_blank' }]]}
    >
      {article}
    </Markdown>
  )
}

export default memo(Mark)
