import type { FC } from 'react'
import MdRenderer from './md'
import styles from './styles.module.css'

interface ArticleData {
  content: string
}

const ArticleContent: FC<ArticleData> = async ({ content }) => {
  return (
    <div className={styles.articleContainer}>
      <article className={styles.articleMarkdown}>
        <MdRenderer article={content} />
      </article>
    </div>
  )
}

export default ArticleContent
