import type { FC, PropsWithChildren } from 'react'

type Props = PropsWithChildren

const BlogLayout: FC<Props> = ({ children }) => {
  return <>{children}</>
}

export default BlogLayout
