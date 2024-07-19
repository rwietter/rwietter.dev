import type { FC, PropsWithChildren } from 'react'

import '../../domains/awesome/list/mdx-styles.css'

type Props = PropsWithChildren

const ArticleLayout: FC<Props> = ({ children }) => {
  return <>{children}</>
}

export default ArticleLayout
