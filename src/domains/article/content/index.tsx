import dynamic from 'next/dynamic'
import type { FC } from 'react'
import styles from './styles.module.css'

const Mark = dynamic(() => import('src/domains/article/content/mark'), {
  loading: () => <span />,
  ssr: false,
})

interface ArticleData {
  content: string
}

const ArticleContent: FC<ArticleData> = async ({ content }) => {
  return (
    <div className={styles.articleContainer}>
      <article className={styles.articleMarkdown}>
        <Mark article={content} />
      </article>
    </div>
  )
}

export default ArticleContent
