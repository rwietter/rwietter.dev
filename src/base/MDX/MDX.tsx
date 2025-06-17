'use client'

import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote'
import dynamic from 'next/dynamic'
import { headings } from './components/Heading'

// biome-ignore format:
const Success = dynamic(() => import('@/base/MDX/components/Callouts/SuccessCallout'))
const Warn = dynamic(
  () => import('@/base/MDX/components/Callouts/WarningCallout'),
)
const Err = dynamic(() => import('@/base/MDX/components/Callouts/ErrorCallout'))
const Info = dynamic(() => import('@/base/MDX/components/Callouts/InfoCallout'))
// biome-ignore format:
const Cite = dynamic(() => import('@/base/MDX/components/Callouts/CiteCallout'))
const Chunk = dynamic(() => import('@/base/MDX/components/Chunk'))
const Micro = dynamic(() => import('@/base/MDX/components/MicroPost'))
const Figure = dynamic(() => import('@/base/MDX/components/Figure'))

interface ArticleData {
  mdxSource: MDXRemoteSerializeResult
}

const components = {
  Success,
  Warn,
  Err,
  Info,
  Cite,
  Chunk,
  Micro,
  Figure,
  ...headings,
}

const MDX: React.FC<ArticleData> = ({ mdxSource }) => {
  return <MDXRemote {...mdxSource} components={components} />
}

export { MDX }
