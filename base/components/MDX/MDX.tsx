'use client'

import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote'
import dynamic from 'next/dynamic'
import { type FC, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

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

interface ArticleData {
  mdxSource: MDXRemoteSerializeResult
}

type ChunkPropTypes = React.PropsWithChildren<{
  index: number
}>

const Chunk: React.FC<ChunkPropTypes> = ({ index, children }) => {
  const [visible, setVisible] = useState(false)
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView) {
      setVisible(true)
    }
  }, [inView])

  return (
    <div ref={ref} data-visible={visible}>
      {visible ? children : null}
    </div>
  )
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
