import type { Post } from '@/types/Post'
import Link from 'next/link'
import type { FC } from 'react'
import { TfiPencil } from 'react-icons/tfi'
import { getDate } from 'utils/get-date'
import styles from './styles.module.css'

type TilPropTypes = {
  post: Post
}

const Til: FC<TilPropTypes> = ({ post }) => {
  const publishedAt = getDate(post.frontmatter.publishedAt)

  return (
    <li className={styles.cardContainer}>
      <p className={styles.dateTimeRead}>
        <TfiPencil size={17} />
        {publishedAt}
      </p>
      <Link
        href={`/til/${post.slug}`}
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

export { Til }
