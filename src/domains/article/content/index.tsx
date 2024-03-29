import { FC } from 'react'
import MdRenderer from 'src/domains/article/content/md'

import styles from './styles.module.css'

interface ArticleData {
  content: string
}

const ArticleContent: FC<ArticleData> = ({ content }) => (
  <div className={styles.articleContainer}>
    <article className={styles.articleMarkdown}>
      <MdRenderer article={content} />
    </article>
  </div>
)

export default ArticleContent
