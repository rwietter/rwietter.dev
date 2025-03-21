import type { Post } from '@/types/Post'
import Link from 'next/link'
import type { FC } from 'react'
import { PiArticleNyTimesLight } from 'react-icons/pi'
import { getDate } from 'utils/get-date'
import styles from './styles.module.css'

type AtomPropTypes = {
  post: Post
}

const Atom: FC<AtomPropTypes> = ({ post }) => {
  const publishedAt = getDate(post.frontmatter.publishedAt)

  return (
    <li className={styles.cardContainer}>
      <p className={styles.dateTimeRead}>
        <PiArticleNyTimesLight size={17} />
        {publishedAt}
      </p>
      <Link
        href={`/atoms/${post.slug}`}
        scroll={false}
        shallow={true}
        prefetch={true}
        aria-label={post.frontmatter.title}
        className={styles.postTitle}
        suppressHydrationWarning
      >
        {post.frontmatter.title}
      </Link>
    </li>
  )
}

export { Atom }
