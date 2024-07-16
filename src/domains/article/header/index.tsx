'use client'
import { wrap } from 'comlink'
import Link from 'next/link'
import { memo, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AiOutlineArrowLeft, AiOutlineCalendar } from 'react-icons/ai'
import { RiTimer2Line } from 'react-icons/ri'
// import { getReadingTime } from 'utils/getTimeReading'

import type { Post } from '@/types/Post'

import { getLocaleDate } from 'utils/get-locale-date'
import styles from './styles.module.css'

interface ArticleHeaderPropTypes extends Post { }

type Langs = {
  [key: string]: string
}

const langs: Langs = {
  en: 'en-US',
  pt: 'pt-BR',
}

type WorkerAPI = {
  getReadingTime: (content: string) => { readTime: string }
}

const ArticleHeader: React.FC<ArticleHeaderPropTypes> = (props) => {
  const workerRef = useRef<Worker>()
  const [readTime, setReadTime] = useState<string | null>(null)
  // const { readTime } = getReadingTime(props.content)
  const { t, i18n } = useTranslation()

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (typeof Worker !== 'undefined') {
      workerRef.current = new Worker(new URL('../../../../public/workers/readingTime.js', import.meta.url));
      const api = wrap<WorkerAPI>(workerRef.current)

      const getReadingTime = async () => {
        const readingTime = await api.getReadingTime(props.content)
        setReadTime(readingTime.readTime)
      }

      getReadingTime()

      return () => {
        workerRef.current?.terminate()
      }
    }
  }, [])

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
            {readTime ? (
              <>
                &nbsp;|&nbsp;
                <RiTimer2Line size={17} />
                {readTime}
              </>
            ) : <span />}
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
