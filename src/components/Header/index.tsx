'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import React, { useEffect } from 'react'
import { BiMoon } from 'react-icons/bi'
import { FiSettings } from 'react-icons/fi'
import { GiDesert, GiRose } from 'react-icons/gi'
import { MdSunny } from 'react-icons/md'
import SwitchTheme from 'src/components/SwitchTheme'
import Modal, { ModalGroup } from '../Modal'
import styles from './styles.module.css'

export interface ModalRef {
  open: () => void
  close: () => void
  toggle: () => void
}

const activePath = (pathname: string) => (href: string, entry?: string) => {
  if (pathname === href) return 'active'
  if (entry && pathname.match(entry)) return 'active'
  return ''
}

const defaultModalState = {
  activityTheme: 'light',
}

const Header = () => {
  const isActive = activePath(usePathname())
  const modalRef = React.useRef<ModalRef>(null)

  const handleToggleModal = () => {
    if (modalRef.current) {
      modalRef.current.toggle()
    }
  }

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
              /home
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
              /blog
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
              /projects
            </Link>
          </div>
        </nav>
        <section style={{ display: 'flex', alignItems: 'center' }}>
          <SwitchTheme visible='header' />
          <FiSettings
            role='button'
            onClick={handleToggleModal}
            style={{ cursor: 'pointer' }}
          />
        </section>
      </header>
      <Modal ref={modalRef} title='Settings'>
        <ModalThemeSection />
      </Modal>
    </>
  )
}

export default Header

const propsIfThemeIsActive =
  (activityTheme: string) =>
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  (theme: string): any => ({
    background:
      activityTheme === theme ? 'var(--neutral)' : 'var(--bg-alt-color)',
    transition: 'var(--transition-primary)',
  })

const ModalThemeSection = () => {
  const [modalState, setModalState] = React.useState(defaultModalState)

  const handleSetTheme = (theme: string) => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
    setModalState({ activityTheme: theme })
  }

  const themeProps = propsIfThemeIsActive(modalState.activityTheme)

  useEffect(() => {
    const theme = localStorage.getItem('theme')
    if (theme) setModalState({ activityTheme: theme })
  }, [])

  return (
    <ModalGroup title='Theme'>
      <div
        className={styles.modalItem}
        style={{ ...themeProps('light') }}
        role='button'
        onKeyUp={() => {}}
        onClick={() => handleSetTheme('light')}
      >
        <MdSunny
          size={22}
          style={{
            cursor: 'pointer',
            alignSelf: 'center',
          }}
        />
      </div>

      <div
        className={styles.modalItem}
        style={{ ...themeProps('dark') }}
        role='button'
        onKeyUp={() => {}}
        onClick={() => handleSetTheme('dark')}
      >
        <BiMoon size={22} style={{ cursor: 'pointer' }} />
      </div>

      <div
        className={styles.modalItem}
        style={{ ...themeProps('desert') }}
        role='button'
        onKeyUp={() => {}}
        onClick={() => handleSetTheme('desert')}
      >
        <GiDesert size={22} style={{ cursor: 'pointer' }} />
      </div>

      <div
        className={styles.modalItem}
        style={{ ...themeProps('nord-light') }}
        role='button'
        onKeyUp={() => {}}
        onClick={() => handleSetTheme('nord-light')}
      >
        <GiRose size={22} style={{ cursor: 'pointer' }} />
      </div>
    </ModalGroup>
  )
}
