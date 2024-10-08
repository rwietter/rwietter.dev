import { ModalGroup } from '@/components/Modal'
import { useEffect, useState } from 'react'
import styles from './modal.module.css'

export const ModalFont = () => {
  const [modalState, setModalState] = useState({
    headersFont: 'Inter',
    bodyFont: 'Inter',
  })

  const handleUpdateHeadersFont = (font: string) => {
    document.documentElement.style.setProperty('--headers-font', font)
    localStorage.setItem('headersFont', font)
    setModalState((state) => ({ ...state, headersFont: font }))
  }

  const handleUpdateBodyFont = (font: string) => {
    document.documentElement.style.setProperty('--body-font', font)
    localStorage.setItem('bodyFont', font)
    setModalState((state) => ({ ...state, bodyFont: font }))
  }

  useEffect(() => {
    const headersFont = localStorage.getItem('headersFont')
    const bodyFont = localStorage.getItem('bodyFont')

    if (headersFont) {
      document.documentElement.style.setProperty('--headers-font', headersFont)
      setModalState((state) => ({ ...state, headersFont }))
    }

    if (bodyFont) {
      document.documentElement.style.setProperty('--body-font', bodyFont)
      setModalState((state) => ({ ...state, bodyFont }))
    }
  }, [])

  return (
    <ModalGroup title='Font' aria-modal='true' role='dialog'>
      <section className={styles.fonts}>
        <fieldset style={{ all: 'unset' }} title='Headers Font'>
          <label htmlFor='headers-font-select'>Headers Font</label>
          <select
            className={styles.modalItem}
            value={modalState.headersFont}
            id='headers-font-select'
            onChange={(e) => handleUpdateHeadersFont(e.target.value)}
          >
            <option value='Inter'>Inter Sans</option>
            <option value='Noto Serif'>Noto Serif</option>
            <option value='Spectral'>Spectral Serif</option>
            <option value='monospace'>Monospace</option>
          </select>
        </fieldset>

        <fieldset style={{ all: 'unset' }} title='Body Font'>
          <label htmlFor='body-font-select'>Body Font</label>
          <select
            className={styles.modalItem}
            value={modalState.bodyFont}
            id='body-font-select'
            onChange={(e) => handleUpdateBodyFont(e.target.value)}
          >
            <option value='Inter'>Inter Sans</option>
            <option value='Noto Serif'>Noto Serif</option>
            <option value='Spectral'>Spectral Serif</option>
            <option value='monospace'>Monospace</option>
          </select>
        </fieldset>
      </section>
      <div aria-live='polite' className='sr-only'>
        {`Headers font set to ${modalState.headersFont}, body font set to ${modalState.bodyFont}`}
      </div>
    </ModalGroup>
  )
}
