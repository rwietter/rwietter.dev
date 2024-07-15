import type { FC, PropsWithChildren } from 'react'
import Providers from './providers'

type Props = PropsWithChildren

const ArticleLayout: FC<Props> = ({ children }) => {
  return <Providers>{children}</Providers>
}

export default ArticleLayout
