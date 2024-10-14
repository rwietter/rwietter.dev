'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import type React from 'react'
import styles from './styles.module.css'

const activePath = (pathname: string) => (href: string, entry?: string) => {
  if (pathname === href) return 'active'
  if (entry && pathname.match(entry)) return 'active'
  return ''
}

type HeaderPropTypes = {
  i18n: {
    home: string
    blog: string
    projects: string
  }
}

const Header: React.FC<HeaderPropTypes> = ({ i18n }) => {
  const isActive = activePath(usePathname())

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav} aria-label='navigation' role='menubar'>
          <div
            className={styles.navItem}
            data-active={isActive('/')}
            aria-current='page'
            role='menuitem'
            title='Home'
          >
            <Link className={styles.link} href='/'>
              {i18n.home}
            </Link>
          </div>
          <div
            className={styles.navItem}
            data-active={isActive('/blog', '/blog/article/')}
            aria-current='page'
            role='menuitem'
            title='Blog'
          >
            <Link className={styles.link} href='/blog'>
              {i18n.blog}
            </Link>
          </div>
          <div
            className={styles.navItem}
            data-active={isActive('/projects')}
            aria-current='page'
            role='menuitem'
            title='Projects'
          >
            <Link className={styles.link} href='/projects'>
              {i18n.projects}
            </Link>
          </div>
        </nav>
        {/* <SwitchTheme visible='header' /> */}
      </header>
    </>
  )
}

export default Header
