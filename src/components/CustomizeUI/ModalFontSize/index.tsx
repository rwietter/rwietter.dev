import { ModalGroup } from '@/components/Modal'
import React, { useEffect, useState } from 'react'
import styles from './modal.module.css'
import { PiArrowsClockwiseThin } from 'react-icons/pi'

const RESET_FONT_SIZE = 1

const FontSizeSlider = () => {
  const [fontSize, setFontSize] = useState(1)
  const fontRef = React.useRef<HTMLInputElement>(null)

  const handleFontSize = () => {
    setFontSize(Number(fontRef.current?.value))
    document.documentElement.style.setProperty(
      '--user-font-size',
      `${fontRef.current?.value}rem`,
    )
    localStorage.setItem('fontSize', `${fontRef.current?.value}`)
  }

  const reset = () => {
    setFontSize(RESET_FONT_SIZE)
    document.documentElement.style.removeProperty('--user-font-size')
    localStorage.removeItem('fontSize')
  }

  useEffect(() => {
    const fontSize = localStorage.getItem('fontSize')
    if (fontSize) {
      setFontSize(Number(fontSize))
    }
  }, [])

  return (
    <div className={styles.wrapper}>
      <ModalGroup title='Font Size' aria-modal='true' role='dialog'>
        <section className={styles.fonts}>
          <label htmlFor='font-size-slider' className='sr-only'>
            Adjust font Size
          </label>
          <input
            className={styles.range}
            type='range'
            ref={fontRef}
            min='1'
            onChange={handleFontSize}
            onClick={handleFontSize}
            max='3'
            step={0.1}
            value={`${fontSize}`}
          />
          <span className={styles.feedback}>{fontSize}</span>
          <button
            className={styles.reset}
            type='button'
            aria-label='Reset font size'
            title='Reset font size'
            onClick={reset}
          >
            <PiArrowsClockwiseThin size={20} />
          </button>
        </section>
        <div aria-live='polite' className='sr-only'>
          {`Font size is set to ${fontSize}`}
        </div>
      </ModalGroup>
    </div>
  )
}

export default FontSizeSlider
