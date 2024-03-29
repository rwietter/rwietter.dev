'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { FiCoffee, FiTwitter } from 'react-icons/fi'
import { GoCommentDiscussion } from 'react-icons/go'
import { SidebarSocialIcons } from 'src/components/StickyBar/Social'
import styles from './styles.module.css'

interface ArticleFooterProps {
  post: {
    category: string
    author: string
  }
}

const ArticleFooter: FC<ArticleFooterProps> = ({ post }) => {
  const pathname = usePathname()
  const { t } = useTranslation()

  const tweetUrl = `http://twitter.com/share?text=${t(
    'article.justRead',
  )} "${name}"&url=https://rwietterc.xyz${pathname}&hashtags=${post.category}`

  const linkToSearchOnTwietter = `https://twitter.com/search?q=https://rwietterc.xyz${pathname}`

  return (
    <div className={styles.articleFooterContainer}>
      <div className={styles.separator} />
      <nav className={styles.navHeader}>
        <a href={tweetUrl} target='_blank' rel='noreferrer'>
          <FiTwitter size={14} />
          &nbsp;{t('article.shareOnTwitter')}
        </a>
        <a href={linkToSearchOnTwietter} target='_blank' rel='noreferrer'>
          <GoCommentDiscussion size={14} />
          &nbsp;{t('article.joinTheDiscussion')}
        </a>
        {post.category && (
          <Link href={`/blog/category/${post.category}`}>
            <FiCoffee size={14} />
            &nbsp;{t('article.moreIn')} &nbsp;
            <strong>{post.category}</strong>
          </Link>
        )}
      </nav>
      <div className={styles.separator} />
      <section className={styles.socialContainer}>
        <SidebarSocialIcons />
        <a
          className={styles.license}
          href='https://github.com/rwietter/rwietter.xyz#CC-BY-SA-4.0-2'
          target='_blank'
          rel='noreferrer'
        >
          CC-BY-SA-4.0
        </a>
        {post.author && (
          <p className={styles.author}>
            {t('article.writtenBy')} <strong>{post.author}</strong>
          </p>
        )}
      </section>
    </div>
  )
}

export default memo(ArticleFooter)
