'use client'
import { PiCommandLight } from 'react-icons/pi'

import { useKBar } from 'kbar'
import styles from './styles.module.css'

const Kbar: React.FC = () => {
  const { query } = useKBar()
  const handleOpenCommandBar = () => query.toggle()

  return (
    <button
      type='button'
      className={styles.menuBarItem}
      role='menuitem'
      title='Open command bar'
      aria-label='Open command bar'
    >
      <PiCommandLight
        size={20}
        onClick={handleOpenCommandBar}
        aria-hidden='true'
        role='button'
      />
    </button>
  )
}

export default Kbar
