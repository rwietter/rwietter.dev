'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import type React from 'react'
import { PiAsteriskSimpleLight } from 'react-icons/pi'
import styles from './styles.module.css'

const activePath = (pathname: string) => (href: string) => {
  if (pathname.replace(/\/(en|pt)/, '/') === href) return true
  const path = pathname.replace(/\/(en|pt)/, '')
  if (path === href) return true
  if (path.split('/')[1] === href.split('/')[1]) return true
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
            aria-current='page'
            role='menuitem'
            title='Home'
          >
            <Link className={styles.link} href='/'>
              {i18n.home}
            </Link>
            {isActive('/') ? (
              <div className={styles.active}>
                <PiAsteriskSimpleLight />
              </div>
            ) : null}
          </div>
          <div
            className={styles.navItem}
            aria-current='page'
            role='menuitem'
            title='Blog'
          >
            <Link className={styles.link} href='/blog'>
              {i18n.blog}
            </Link>
            {isActive('/blog') ? (
              <div className={styles.active}>
                <PiAsteriskSimpleLight />
              </div>
            ) : null}
          </div>
          <div
            className={styles.navItem}
            aria-current='page'
            role='menuitem'
            title='Projects'
          >
            <Link className={styles.link} href='/projects'>
              {i18n.projects}
            </Link>
            {isActive('/projects') ? (
              <div className={styles.active}>
                <PiAsteriskSimpleLight />
              </div>
            ) : null}
          </div>
        </nav>
        {/* <SwitchTheme visible='header' /> */}
      </header>
    </>
  )
}

export default Header
