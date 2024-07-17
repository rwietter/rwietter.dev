'use client'

import MDX from '@/base/components/MDX'
import type { FC } from 'react'
import type { MDXSerialized } from 'types/MDX'
import styles from './styles.module.css'

type ArticlePropTypes = {
  mdxSource: MDXSerialized
}

const ArticleContent: FC<ArticlePropTypes> = ({ mdxSource }) => {
  return (
    <div className={styles.articleContainer}>
      <article className={styles.articleMarkdown}>
        <MDX mdxSource={mdxSource} />
      </article>
    </div>
  )
}

export default ArticleContent
