'use client'

import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote'
import dynamic from 'next/dynamic'

// biome-ignore format:
const High = dynamic(() => import('@/base/TextHighlight/TextHighlight'))
// biome-ignore format:
const Success = dynamic(() => import('@/base/Callouts/SuccessCallout'))
const Warn = dynamic(() => import('@/base/Callouts/WarningCallout'))
const Err = dynamic(() => import('@/base/Callouts/ErrorCallout'))
const Info = dynamic(() => import('@/base/Callouts/InfoCallout'))
// biome-ignore format:
const Cite = dynamic(() => import('@/base/Callouts/CiteCallout'))
const Chunk = dynamic(() => import('@/base/Chunk/Chunk'))
const Micro = dynamic(() => import('@/base/MicroPost/MicroPost'))

interface ArticleData {
  mdxSource: MDXRemoteSerializeResult
}

const components = {
  High,
  Success,
  Warn,
  Err,
  Info,
  Cite,
  Chunk,
  Micro,
}

const MDX: React.FC<ArticleData> = ({ mdxSource }) => {
  return <MDXRemote {...mdxSource} components={components} />
}

export { MDX }
