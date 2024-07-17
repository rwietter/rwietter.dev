'use client'

import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote'
import dynamic from 'next/dynamic'
import type { FC } from 'react'

// biome-ignore format:
const TextHighlight = dynamic(() => import('@/base/components/TextHighlight/TextHighlight'))
// biome-ignore format:
const Success = dynamic(() => import('@/base/components/Callouts/SuccessCallout'))
// biome-ignore format:
const Warning = dynamic(() => import('@/base/components/Callouts/WarningCallout'))
const Err = dynamic(() => import('@/base/components/Callouts/ErrorCallout'))
const Info = dynamic(() => import('@/base/components/Callouts/InfoCallout'))
// biome-ignore format:
const Messager = dynamic(() => import('@/base/components/Callouts/MessagerCallout'))
const Chunk = dynamic(() => import('@/base/components/Chunk/Chunk'))

interface ArticleData {
  mdxSource: MDXRemoteSerializeResult
}

const components = {
  TextHighlight,
  Success,
  Warning,
  Error: Err,
  Info,
  Messager,
  Chunk,
}

const MDX: FC<ArticleData> = ({ mdxSource }) => {
  return <MDXRemote {...mdxSource} components={components} />
}

export { MDX }
