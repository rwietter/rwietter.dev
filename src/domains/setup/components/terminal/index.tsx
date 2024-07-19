'use client'

import type { FC } from 'react'

import styles from './styles.module.css'

interface TerminalProps {
  text: string
}

const Terminal: FC<TerminalProps> = ({ text }) => (
  <code className={styles.terminal}>
    <button
      type='button'
      title='copy code'
      onClick={() => copyToClipboard(text)}
    >
      <CopyIcon />
    </button>
    <code className={styles.code}>{text}</code>
  </code>
)

export { Terminal }

function copyToClipboard(clipboardText: string) {
  navigator.clipboard.writeText(clipboardText)
  notify()
}

function notify() {
  if (!('Notification' in window)) {
    alert('This browser does not support desktop notification')
    return
  }

  switch (Notification.permission) {
    case 'granted':
      new Notification('Succesfully copied!')
      break
    case 'denied':
      alert(
        'You have denied the notification. Please, allow it in your browser settings',
      )
      break
    default:
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification(
            'Welcome to the party! Now you can to receive notifications',
          )
        }
      })
  }
}

const CopyIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='14'
    height='14'
    viewBox='0 0 24 24'
    aria-label='Copy to clipboard'
    fill='none'
    role='img'
    color='var(--colors-text)'
  >
    <path
      d='M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9L16 9C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16L9 15Z'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M16.9999 9C16.9975 6.04291 16.9528 4.51121 16.092 3.46243C15.9258 3.25989 15.7401 3.07418 15.5376 2.90796C14.4312 2 12.7875 2 9.5 2C6.21252 2 4.56878 2 3.46243 2.90796C3.25989 3.07417 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2 9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07417 15.7401 3.25989 15.9258 3.46243 16.092C4.51121 16.9528 6.04291 16.9975 9 16.9999'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)
