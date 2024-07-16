'use client'

import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote'
import type { FC } from 'react'

type MdxPropTypes = {
  mdxSource: MDXRemoteSerializeResult
}

const Mdx: FC<MdxPropTypes> = ({ mdxSource }) => {
  return (
    <article>
      <MDXRemote {...mdxSource} />
    </article>
  )
}

export default Mdx
