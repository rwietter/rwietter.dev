'use client'

import { getDate } from 'utils/get-date'
import styles from './styles.module.css'
import { PiClockAfternoonLight } from 'react-icons/pi'

const CurrentDate = () => {
  const currentDate = getDate()

  return (
    <div className={styles.date}>
      <PiClockAfternoonLight size={18} />
      <time className={styles.dateTime}>
        <span className={styles.current}>
          {currentDate ? currentDate : <div />}
        </span>
      </time>
    </div>
  )
}

export default CurrentDate
