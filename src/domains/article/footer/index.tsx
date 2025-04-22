'use client'

import { SocialIcons } from '@/components/Social'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type FC, memo } from 'react'
import {
  PiChatsLight,
  PiHashStraightLight,
  PiShareFatLight,
} from 'react-icons/pi'
import styles from './styles.module.css'

interface PropsTypes {
  post: {
    category: string
    author: string
    title: string
  }
  i18n: {
    discuss: string
    writtenBy: string
    share: string
  }
}

const LICENSE = 'CC-BY-SA-4.0'

const ArticleFooter: FC<PropsTypes> = ({ post, i18n }) => {
  const pathname = usePathname()

  const url = `https://bsky.app/intent/compose?text=I just read "${post.title}" %20 https://rwietter.xyz${pathname}%20%23${post.category}`
  const search = `https://bsky.app/search?q=https://rwietter.xyz${pathname}`

  return (
    <div className={styles.articleFooterContainer}>
      <div className={styles.separator} />
      <nav className={styles.navHeader}>
        <a href={url} target='_blank' rel='noreferrer'>
          <PiShareFatLight size={20} />
          &nbsp;{i18n.share}
        </a>
        <a href={search} target='_blank' rel='noreferrer'>
          <PiChatsLight size={20} />
          &nbsp;{i18n.discuss}
        </a>
        {post.category && (
          <Link href={`/blog/category/${post.category}`}>
            <PiHashStraightLight size={20} />
            &nbsp;{[`${post.category}`]}
          </Link>
        )}
      </nav>
      <div className={styles.separator} />
      <section className={styles.socialContainer}>
        <SocialIcons />
        <a
          className={styles.license}
          href='https://github.com/rwietter/rwietter.dev#CC-BY-SA-4.0-2'
          target='_blank'
          rel='noreferrer'
        >
          {LICENSE}
        </a>
        {post.author && (
          <p className={styles.author}>
            {i18n.writtenBy} <strong>{post.author}</strong>
          </p>
        )}
      </section>
    </div>
  )
}

export default memo(ArticleFooter)
