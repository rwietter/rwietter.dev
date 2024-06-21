'use client'

import { useKBar } from 'kbar'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { AiOutlineArrowUp } from 'react-icons/ai'
import { BsCommand, BsShadows } from 'react-icons/bs'
import { FiList } from 'react-icons/fi'
import { IoLanguageOutline } from 'react-icons/io5'
import { VscHome } from 'react-icons/vsc'
import styles from './styles.module.css'

import { useEffect } from 'react'
import SwitchTheme from 'src/components/SwitchTheme'

const StickyBar = () => {
  const { query } = useKBar()
  const { i18n } = useTranslation()

  const handleToTop = () => {
    const position =
      document.body.scrollTop || document.documentElement.scrollTop
    let scrollAnimation = undefined
    if (position) {
      window.scrollBy(0, -Math.max(1, Math.floor(position / 10)))
      scrollAnimation = setTimeout(handleToTop, 30)
    } else clearTimeout(scrollAnimation)
  }

  const handleOpenCommandBar = () => query.toggle()

  const handleUserChangeShadows = () => {
    const shadows = document.getElementById('dynamic-shadows')
    if (shadows) {
      if (shadows.classList.contains('shadows')) {
        shadows.classList.remove('shadows')
        localStorage.setItem('shadows', 'false')
        return
      }
      shadows.classList.add('shadows')
      localStorage.setItem('shadows', 'true')
    }
  }

  const userLoadShadowsState = () => {
    const shadows = document.getElementById('dynamic-shadows')
    if (shadows) {
      if (localStorage.getItem('shadows') === 'true') {
        shadows.classList.add('shadows')
      }
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    userLoadShadowsState()
  }, [])

  return (
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
        <button
          type='button'
          className={styles.menuBarItem}
          role='menuitem'
          title='Open command bar'
          aria-label='Open command bar'
        >
          <BsCommand
            size={20}
            onClick={handleOpenCommandBar}
            aria-hidden='true'
            role='button'
          />
        </button>
      </div>

      <div className={styles.menuBarGroup} role='menubar'>
        <button
          className={styles.menuBarItem}
          type='button'
          aria-label='Enable/Disable Shadows'
          title='Enable/Disable Shadows'
          role='menuitem'
          onClick={handleUserChangeShadows}
        >
          <BsShadows size={18} />
        </button>
        <button
          type='button'
          className={styles.menuBarItem}
          aria-label='Switch language'
          title='Switch language'
          role='menuitem'
          onClick={() =>
            i18n.changeLanguage(i18n.language === 'en' ? 'pt' : 'en')
          }
        >
          <IoLanguageOutline size={20} />
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
        <button
          type='button'
          className={styles.menuBarItem}
          aria-label='Navigate to top'
          title='Navigate to top'
          role='menuitem'
        >
          <AiOutlineArrowUp onClick={handleToTop} size={20} />
        </button>
      </div>
    </footer>
  )
}

export { StickyBar }
