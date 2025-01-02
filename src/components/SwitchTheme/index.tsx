'use client'

import { PiSunLight } from 'react-icons/pi'
import styles from './styles.module.css'

interface Props {
  visible: 'header' | 'sticky'
}

const SwitchTheme: React.FC<Props> = ({ visible }) => {
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div className={styles.theme} onClick={switchTheme} data-visible={visible}>
      <PiSunLight />
    </div>
  )
}

export default SwitchTheme

function switchTheme() {
  const theme =
    document.documentElement.getAttribute('data-theme') === 'light'
      ? 'dark'
      : 'light'

  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('theme', theme)
}

function notifyTheme(theme: string) {
  if (!('Notification' in window)) {
    return
  }

  if (Notification.permission === 'granted') {
    new Notification(`Theme set to ${theme}`)
    return
  }

  if (Notification.permission !== 'denied') {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        new Notification(`Theme set to ${theme}`)
      }
    })
  }
}
