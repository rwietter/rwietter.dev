import Link from 'next/link'
import { AiOutlineArrowLeft, AiOutlineCalendar } from 'react-icons/ai'
import { RiTimer2Line } from 'react-icons/ri'

import type { Post } from '@/types/Post'

import { getDate } from 'utils/get-date'
import styles from './styles.module.css'

interface ArticleHeaderPropTypes extends Post {}

const ArticleHeader: React.FC<ArticleHeaderPropTypes> = (props) => {
  const publishedAt = getDate(props.frontmatter.publishedAt)

  return (
    <section className={styles.section}>
      <div>
        <section className={styles.infoHeader}>
          <Link href='/blog'>
            <button className={styles.backToOverview} type='button'>
              <AiOutlineArrowLeft size={19} />
              <p>Back to overview</p>
            </button>
          </Link>
          <p className={styles.dateTimeRead}>
            <AiOutlineCalendar size={17} />
            {publishedAt}
            {props.readingTime}
          </p>
          <p className={styles.dateTimeRead}>
            <RiTimer2Line size={17} />
            {props.readingTime}
          </p>
        </section>
      </div>

      <h1 className={styles.articleTitle}>{props.frontmatter?.title}</h1>
      <p className={styles.articleDescription}>
        {props.frontmatter?.description}
      </p>
    </section>
  )
}

export default ArticleHeader
