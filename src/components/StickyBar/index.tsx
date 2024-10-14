'use client'

import Modal from '@/components/Modal'
import { setCookie } from 'cookies-next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { FiList } from 'react-icons/fi'
import { IoLanguage } from 'react-icons/io5'
import { VscHome, VscSettings } from 'react-icons/vsc'
import styles from './styles.module.css'

export interface ModalRef {
  open: () => void
  close: () => void
  toggle: () => void
}

const SwitchTheme = dynamic(() => import('@/components/SwitchTheme'))
const Kbar = dynamic(() => import('@/components/StickyBar/Kbar'))
const ScrollUp = dynamic(() => import('@/components/StickyBar/ScrollUp'))

const ModalTheme = dynamic(() =>
  import('@/components/StickyBar/ModalTheme').then((mod) => mod.ModalTheme),
)
const ModalFont = dynamic(() =>
  import('@/components/StickyBar/ModalFont').then((mod) => mod.ModalFont),
)

const StickyBar = () => {
  const modalRef = React.useRef<ModalRef>(null)
  const pathname = usePathname()
  const router = useRouter()

  const handleToggleModal = () => {
    if (modalRef.current) {
      modalRef.current.toggle()
    }
  }

  const handleToggleLanguage = () => {
    const lang = pathname.startsWith('/en') ? 'pt' : 'en'
    const path = pathname.replace(/^\/(en|pt)/, `/${lang}`)
    setCookie('i18nlang', lang)
    router.push(path)
  }

  return (
    <>
      <footer className={styles.manuBar}>
        <div className={styles.menuBarGroup} role='menubar'>
          <Link
            className={styles.menuBarLink}
            href='/'
            title='go to home page'
            role='menuitem'
          >
            <button
              type='button'
              className={styles.menuBarItem}
              aria-label='Go to home'
              title='Go to home'
            >
              <VscHome size={20} aria-hidden='true' />
            </button>
          </Link>
          <Link
            className={styles.menuBarLink}
            href='/blog'
            title='Go to blog'
            role='menuitem'
          >
            <button
              type='button'
              className={styles.menuBarItem}
              aria-label='Go to blog'
            >
              <FiList size={20} aria-hidden='true' />
            </button>
          </Link>
          <Kbar />

          <div className={styles.menuBarLink}>
            <button
              type='button'
              onClick={handleToggleModal}
              className={styles.menuBarItem}
              aria-label='Go to blog'
            >
              <VscSettings
                role='button'
                size={20}
                style={{ cursor: 'pointer' }}
              />
            </button>
          </div>
          <button
            type='button'
            className={styles.menuBarItem}
            title='Toggle language'
            role='menuitem'
            aria-label='Change language'
            onClick={handleToggleLanguage}
          >
            <IoLanguage size={20} aria-hidden='true' />
          </button>
        </div>

        <div className={styles.menuBarGroup} role='menubar'>
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
        </div>
      </footer>

      <Modal ref={modalRef} title='Settings'>
        <ModalTheme />
        <ModalFont />
      </Modal>
    </>
  )
}

export default StickyBar
