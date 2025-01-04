'use client'

import React, { useEffect } from 'react'

import styles from './appearance.module.css'

const THEMES = ['light', 'dark', 'nord-light', 'slate', 'noveau', 'dune']
const FONTS = ['Atkinson', 'Geist Var', 'IntoneMono Nerd Font']

export const Appearance: React.FC = () => {
  const [theme, setTheme] = React.useState('light')
  const [fontFamily, setFontFamily] = React.useState({
    headersFont: 'Atkinson',
    bodyFont: 'Atkinson',
  })

  const handleSetTheme = (theme: string) => {
    document.documentElement.setAttribute('data-theme', theme)
    setTheme(theme)
    localStorage.setItem('theme', theme)
  }

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme')
    if (currentTheme) {
      handleSetTheme(currentTheme)
    }
  }, [])

  const handleHeadingsFont = (font: string) => {
    document.documentElement.style.setProperty('--headers-font', font)
    localStorage.setItem('headersFont', font)
    setFontFamily((state) => ({ ...state, headersFont: font }))
  }

  const handleBodyFont = (font: string) => {
    document.documentElement.style.setProperty('--body-font', font)
    localStorage.setItem('bodyFont', font)
    setFontFamily((state) => ({ ...state, bodyFont: font }))
  }

  useEffect(() => {
    const headersFont = localStorage.getItem('headersFont')
    const bodyFont = localStorage.getItem('bodyFont')

    if (headersFont) {
      document.documentElement.style.setProperty('--headers-font', headersFont)
      setFontFamily((state) => ({ ...state, headersFont }))
    }

    if (bodyFont) {
      document.documentElement.style.setProperty('--body-font', bodyFont)
      setFontFamily((state) => ({ ...state, bodyFont }))
    }
  }, [])

  return (
    <div className={styles.appearance}>
      <h2>Appearance</h2>
      <div className={styles.section}>
        <p className={styles.section_title}>Theme</p>
        <p className={styles.section_description}>
          Change the appearance of the site to make it easier
        </p>
        <div className={styles.section_options}>
          {
            THEMES.map((t) => (
              <button
                key={t}
                type='button'
                data-active={theme === t}
                onClick={() => handleSetTheme(t)}
              >
                {t}
              </button>
            ))
          }
        </div>
      </div>
      <div className={styles.section}>
        <p className={styles.section_title}>Headings Font Family</p>
        <p className={styles.section_description}>
          Change the font family of the site
        </p>
        <div className={styles.section_options}>
          {
            FONTS.map((f) => (
              <button
                key={f}
                type='button'
                data-active={fontFamily.headersFont === f}
                onClick={() => handleHeadingsFont(f)}
              >
                {f}
              </button>
            ))
          }
        </div>
      </div>

      <div className={styles.section}>
        <p className={styles.section_title}>Body Font Family</p>
        <p className={styles.section_description}>
          Change the font family of the site
        </p>
        <div className={styles.section_options}>
          {
            FONTS.map((f) => (
              <button
                key={f}
                type='button'
                data-active={fontFamily.bodyFont === f}
                onClick={() => handleBodyFont(f)}
              >
                {f}
              </button>
            ))
          }
        </div>
      </div>
    </div>
  )
}
