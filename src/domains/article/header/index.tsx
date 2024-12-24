import Link from 'next/link'
import { AiOutlineArrowLeft, AiOutlineCalendar } from 'react-icons/ai'
import { RiTimer2Line } from 'react-icons/ri'

import type { Post } from '@/types/Post'

import { getDate } from 'utils/get-date'
import styles from './styles.module.css'
import { TbTags } from 'react-icons/tb'

interface ArticleHeaderPropTypes extends Post {
  i18n: {
    backToOverview: string
    readingTime: string
    by: string
    on: string
    with: string
  }
}

const ArticleHeader: React.FC<ArticleHeaderPropTypes> = (props) => {
  const publishedAt = getDate(props.frontmatter.publishedAt)

  return (
    <section className={styles.articleHeader}>
      <h1 className={styles.articleTitle}>{props.frontmatter?.title}</h1>
      <p className={styles.articleMeta}>
        {props.i18n.by} <strong>{props.frontmatter?.author}</strong>, {props.i18n.on} {publishedAt}, {props.i18n.with} {props.readingTime} {props.i18n.readingTime}.
      </p>
      <p className={styles.articleDescription}>
        {props.frontmatter?.description}
      </p>
      {props.frontmatter?.category ? (
        <section className={styles.articleTags}>
          {props.frontmatter.category && (
            <Link href={`/blog/category/${props.frontmatter.category}`}>
              {props.frontmatter.category}
            </Link>
          )}
        </section>
      ) : null}
    </section>
  )
}

export default ArticleHeader
