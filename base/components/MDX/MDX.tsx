'use client'

import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote'
import dynamic from 'next/dynamic'

// biome-ignore format:
const High = dynamic(() => import('@/base/components/TextHighlight/TextHighlight'))
// biome-ignore format:
const Success = dynamic(() => import('@/base/components/Callouts/SuccessCallout'))
const Warn = dynamic(() => import('@/base/components/Callouts/WarningCallout'))
const Err = dynamic(() => import('@/base/components/Callouts/ErrorCallout'))
const Info = dynamic(() => import('@/base/components/Callouts/InfoCallout'))
// biome-ignore format:
const Message = dynamic(() => import('@/base/components/Callouts/MessagerCallout'))
const Chunk = dynamic(() => import('@/base/components/Chunk/Chunk'))
const Micro = dynamic(() => import('@/base/components/MicroPost/MicroPost'))

interface ArticleData {
  mdxSource: MDXRemoteSerializeResult
}

const components = {
  High,
  Success,
  Warn,
  Err,
  Info,
  Message,
  Chunk,
  Micro,
}

const MDX: React.FC<ArticleData> = ({ mdxSource }) => {
  return <MDXRemote {...mdxSource} components={components} />
}

export { MDX }
