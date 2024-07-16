'use client'

import { useTranslation } from 'react-i18next'
import { IoIosTimer } from 'react-icons/io'
import { type LocaleLang, getDate } from 'utils/get-date'
import styles from './styles.module.css'

const CurrentDate = () => {
  const { i18n } = useTranslation()
  const lang = i18n.language as LocaleLang
  const currentDate = getDate(new Date(), lang)

  return (
    <p className={styles.date}>
      <IoIosTimer size={18} />
      <time className={styles.dateTime}>
        <span className={styles.current}>
          {currentDate ? currentDate : <div />}
        </span>
      </time>
    </p>
  )
}

export default CurrentDate
