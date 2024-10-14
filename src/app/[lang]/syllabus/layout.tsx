import type { FC, PropsWithChildren } from 'react'

import './styles.css'

type Props = PropsWithChildren

const ArticleLayout: FC<Props> = ({ children }) => {
  return <>{children}</>
}

export default ArticleLayout
