import Link from 'next/link'

import type React from 'react'
import styles from './styles.module.css'


const Header: React.FC = () => (
  <header className={styles.header}>
    <Link href="/" className={styles.link}>
      RWIETTER
    </Link>

    <Link href="/blog" className={styles.link}>
      BLOG
    </Link>
  </header>
)

export default Header
