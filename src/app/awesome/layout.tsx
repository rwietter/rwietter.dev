import type { FC, PropsWithChildren } from 'react'

type Props = PropsWithChildren

const ArticleLayout: FC<Props> = ({ children }) => {
  return <div>{children}</div>
}

export default ArticleLayout
