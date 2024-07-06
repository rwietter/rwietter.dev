import type { FC, PropsWithChildren } from 'react'

import 'katex/dist/katex.min.css'
import '../../../../styles/dracula-prism.css'

type Props = PropsWithChildren

const ArticleLayout: FC<Props> = ({ children }) => {
  return <div className='fade-in-layout'>{children}</div>
}

export default ArticleLayout
