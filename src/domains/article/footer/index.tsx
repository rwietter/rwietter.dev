'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type FC, memo } from 'react'
import { FiCoffee, FiTwitter } from 'react-icons/fi'
import { GoCommentDiscussion } from 'react-icons/go'
import { SidebarSocialIcons } from 'src/components/StickyBar/Social'
import styles from './styles.module.css'

interface ArticleFooterPropsTypes {
  post: {
    category: string
    author: string
    title: string
  }
}

const ArticleFooter: FC<ArticleFooterPropsTypes> = ({ post }) => {
  const pathname = usePathname()

  const tweetUrl = `http://twitter.com/share?text=I just read "${
    post.title
  }"&url=https://rwietter.dev${pathname}&hashtags=${post.category}`

  const linkToSearchOnTwietter = `https://twitter.com/search?q=https://rwietter.dev${pathname}`

  return (
    <div className={styles.articleFooterContainer}>
      <div className={styles.separator} />
      <nav className={styles.navHeader}>
        <a href={tweetUrl} target='_blank' rel='noreferrer'>
          <FiTwitter size={14} />
          &nbsp;Tweet this article
        </a>
        <a href={linkToSearchOnTwietter} target='_blank' rel='noreferrer'>
          <GoCommentDiscussion size={14} />
          &nbsp;Discuss on Twitter
        </a>
        {post.category && (
          <Link href={`/blog/category/${post.category}`}>
            <FiCoffee size={14} />
            &nbsp;Learn more about &nbsp;
            <strong>{post.category}</strong>
          </Link>
        )}
      </nav>
      <div className={styles.separator} />
      <section className={styles.socialContainer}>
        <SidebarSocialIcons />
        <a
          className={styles.license}
          href='https://github.com/rwietter/rwietter.dev#CC-BY-SA-4.0-2'
          target='_blank'
          rel='noreferrer'
        >
          CC-BY-SA-4.0
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
