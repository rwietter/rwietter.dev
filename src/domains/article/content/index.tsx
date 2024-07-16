import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
import dynamic from 'next/dynamic'
import { type FC, Suspense } from 'react'
import styles from './styles.module.css'

const Mark = dynamic(() => import('src/domains/article/content/mark'))

interface ArticleData {
  mdxSource: MDXRemoteSerializeResult
}

const ArticleContent: FC<ArticleData> = async ({ mdxSource }) => {
  return (
    <div className={styles.articleContainer}>
      <article className={styles.articleMarkdown}>
        <Suspense>
          <Mark mdxSource={mdxSource} />
        </Suspense>
      </article>
    </div>
  )
}

export default ArticleContent
