'use client'

import { setCookie } from 'cookies-next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import {
  PiArticleNyTimesLight,
  PiTranslateLight,
  PiHouseSimpleLight,
  PiGearLight,
  PiInfoLight,
} from 'react-icons/pi'
import styles from './styles.module.css'

export interface ModalRef {
  open: () => void
  close: () => void
  toggle: () => void
}

const SwitchTheme = dynamic(() => import('@/components/SwitchTheme'))
const Kbar = dynamic(() => import('@/components/StickyBar/Kbar'))
const ScrollUp = dynamic(() => import('@/components/StickyBar/ScrollUp'))

const StickyBar = () => {
  const pathname = usePathname()

  const handleToggleLanguage = () => {
    const lang = pathname.startsWith('/en') ? 'pt' : 'en'
    const path = pathname.replace(/^\/(en|pt)/, `/${lang}`)
    setCookie('i18nlang', lang, {
      path: '/',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 dias
      httpOnly: false,
    })
    window.location.href = path
  }

  return (
    <>
      <footer className={styles.manuBar}>
        <section className={styles.menuBarContainer} role='menubar'>
          <Link
            className={styles.menuBarLink}
            href='/'
            title='blog'
            role='menuitem'
          >
            <button
              type='button'
              className={styles.menuBarItem}
              aria-label='Blog'
              title='Blog'
            >
              <PiHouseSimpleLight size={20} aria-hidden='true' />
            </button>
          </Link>

          <Kbar />

          <button
            type='button'
            className={styles.menuBarItem}
            title='Toggle language'
            role='menuitem'
            aria-label='Change language'
            onClick={handleToggleLanguage}
          >
            <PiTranslateLight size={20} aria-hidden='true' />
          </button>

          <button
            type='button'
            className={styles.menuBarItem}
            title='Toggle Dark Mode'
            role='menuitem'
            aria-label='Toggle change theme'
          >
            <SwitchTheme visible='sticky' />
          </button>

          <ScrollUp />

          <Link
            className={styles.menuBarLink}
            href='/about'
            title='About'
            role='menuitem'
          >
            <button
              type='button'
              className={styles.menuBarItem}
              aria-label='About'
            >
              <PiInfoLight size={20} aria-hidden='true' />
            </button>
          </Link>
        </section>
      </footer>
    </>
  )
}

export default StickyBar
