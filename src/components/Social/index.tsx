import type { SocialLink } from '@/types/Social'
import Link from 'next/link'
import { links } from './social-links'
import styles from './styles.module.css'

const SocialIcons = () => (
  <div className={`${styles.socialContainer} social`}>
    {links.map((link: SocialLink) => (
      <Link
        className={styles.link}
        key={link.url}
        href={link.url}
        target='_blank'
        rel='noreferrer'
        title={link.name}
        aria-label={link.name}
      >
        {link.icon}
      </Link>
    ))}
  </div>
)

export { SocialIcons }
