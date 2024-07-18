import type { FC, PropsWithChildren } from 'react'
import Providers from './providers'

import '../../../styles/katex-override.css'
import '../../../styles/microblog-mdx.css'

type Props = PropsWithChildren

const ArticleLayout: FC<Props> = ({ children }) => {
  return <Providers>{children}</Providers>
}

export default ArticleLayout
