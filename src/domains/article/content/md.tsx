'use client'

import Prism from 'prismjs'
import React, { type FC, memo, useEffect } from 'react'
import Markdown from 'react-markdown'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkHighlight from '../remarkHighlight/remarkHighlight'

import md from 'styles/github-markdown.module.css'
import 'utils/highlights'

interface ArticleData {
  article: string
}

const headingId = (children: string) => {
  return children.toLowerCase().replace(/ /g, '-')
}

const headings = [1, 2, 3, 4, 5].map((level) => `h${level}`)

const components = {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ...headings.reduce((acc: any, heading) => {
    acc[heading] = ({ children }: { children: string }) => {
      const id = headingId(children)
      return React.createElement(heading, { id }, children)
    }
    return acc
  }, {}),
}

const MdRenderer: FC<ArticleData> = ({ article }) => {
  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <Markdown
      className={md['markdown-body']}
      components={components}
      remarkPlugins={[remarkGfm, remarkMath, remarkHighlight]}
      rehypePlugins={[rehypeKatex]}
    >
      {article}
    </Markdown>
  )
}

export default memo(MdRenderer)
