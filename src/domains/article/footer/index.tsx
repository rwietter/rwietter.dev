'use client'

import { SocialIcons } from '@/components/Social'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type FC, memo } from 'react'
import { GoCommentDiscussion } from 'react-icons/go'
import { TbBrandBluesky, TbTags } from 'react-icons/tb'
import styles from './styles.module.css'

interface PropsTypes {
  post: {
    category: string
    author: string
    title: string
  }
}

const LICENSE = 'CC-BY-SA-4.0'

const ArticleFooter: FC<PropsTypes> = ({ post }) => {
  const pathname = usePathname()

  const url = `https://bsky.app/intent/compose?text=I just read "${post.title}" %20 https://rwietter.dev${pathname}%20%23${post.category}`
  const search = `https://bsky.app/search?q=https://rwietter.dev${pathname}`

  return (
    <div className={styles.articleFooterContainer}>
      <div className={styles.separator} />
      <nav className={styles.navHeader}>
        <a href={url} target='_blank' rel='noreferrer'>
          <TbBrandBluesky size={18} />
          &nbsp;Post
        </a>
        <a href={search} target='_blank' rel='noreferrer'>
          <GoCommentDiscussion size={18} />
          &nbsp;Discuss
        </a>
        {post.category && (
          <Link href={`/blog/category/${post.category}`}>
            <TbTags size={18} />
            &nbsp;{[`#${post.category}`]}
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
            Written by <strong>{post.author}</strong>
          </p>
        )}
      </section>
    </div>
  )
}

export default memo(ArticleFooter)
