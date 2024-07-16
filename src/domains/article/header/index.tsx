'use client'
import Link from 'next/link'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { AiOutlineArrowLeft, AiOutlineCalendar } from 'react-icons/ai'
import { RiTimer2Line } from 'react-icons/ri'
import { getLocaleDate } from 'utils/get-locale-date'

import type { Post } from '@/types/Post'

import styles from './styles.module.css'

interface ArticleHeaderPropTypes extends Post { }

type Langs = {
  [key: string]: string
}

const langs: Langs = {
  en: 'en-US',
  pt: 'pt-BR',
}

const ArticleHeader: React.FC<ArticleHeaderPropTypes> = (props) => {
  const { t, i18n } = useTranslation()

  const { localeDate: publishedAt } = getLocaleDate(
    props.frontmatter.publishedAt,
    langs[i18n.language],
  )

  return (
    <section className={styles.section}>
      <div>
        <div className={styles.infoHeader}>
          <Link href='/blog'>
            <button
              className={styles.backToOverview}
              type='button'
              aria-label='Back to overview'
            >
              <AiOutlineArrowLeft size={19} aria-hidden='true' />
              <p>{t('backToOverview')}</p>
            </button>
          </Link>
          <p className={styles.dateTimeRead}>
            <AiOutlineCalendar size={17} />
            {publishedAt}
            &nbsp;|&nbsp;
            <RiTimer2Line size={17} />
            {props.readingTime}
          </p>
        </div>
      </div>

      <h1 className={styles.articleTitle}>{props.frontmatter?.title}</h1>
      <p className={styles.articleDescription}>
        {props.frontmatter?.description}
      </p>
    </section>
  )
}

export default memo(ArticleHeader)
