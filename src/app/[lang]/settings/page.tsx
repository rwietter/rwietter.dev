import type { Langs } from '@/shared/i18n/langs'
import type React from 'react'

import styles from './styles.module.css'
import { Appearance } from './appearance'

type PagePropTypes = {
  params: {
    lang: Langs
  }
}

const Page: React.FC<PagePropTypes> = async ({ params }) => {
  return (
    <>
      <h1 className={styles.title}>Settings</h1>
      <div className={styles.settings}>
        <Appearance />
      </div>
    </>
  )
}

export default Page
