import dynamic from 'next/dynamic'
import Link from 'next/link'
import { FiList } from 'react-icons/fi'
import { VscHome } from 'react-icons/vsc'
import styles from './styles.module.css'

const SwitchTheme = dynamic(() => import('@/components/SwitchTheme'))
const Kbar = dynamic(() => import('@/components/StickyBar/Kbar'))
const ScrollUp = dynamic(() => import('@/components/StickyBar/ScrollUp'))

const StickyBar = () => {
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
        <Kbar />
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
  )
}

export default StickyBar
