import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
import dynamic from 'next/dynamic'
import type { FC } from 'react'
import styles from './styles.module.css'

const Mark = dynamic(() => import('src/domains/article/content/mark'), {
  loading: () => <span />,
  ssr: true,
})

interface ArticleData {
  mdxSource: MDXRemoteSerializeResult
}

const ArticleContent: FC<ArticleData> = async ({ mdxSource }) => {
  return (
    <div className={styles.articleContainer}>
      <article className={styles.articleMarkdown}>
        <Mark mdxSource={mdxSource} />
      </article>
    </div>
  )
}

export default ArticleContent
