'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import styles from './styles.module.css'

const activePath = (pathname: string) => (href: string, entry?: string) => {
  if (pathname === href) return 'active'
  if (entry && pathname.match(entry)) return 'active'
  return ''
}

const Header = () => {
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
              Home
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
              Blog
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
              Projects
            </Link>
          </div>
        </nav>
        {/* <SwitchTheme visible='header' /> */}
      </header>
    </>
  )
}

export default Header
