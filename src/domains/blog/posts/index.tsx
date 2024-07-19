import type { Post } from '@/types/Post'
import Link from 'next/link'
import type { FC } from 'react'
import { TfiPencil } from 'react-icons/tfi'
import { getDate } from 'utils/get-date'
import styles from './styles.module.css'

type PostsPropTypes = {
  post: Post
}

const Posts: FC<PostsPropTypes> = ({ post }) => {
  const publishedAt = getDate(post.frontmatter.publishedAt)

  return (
    <li className={styles.cardContainer}>
      <p className={styles.dateTimeRead}>
        <TfiPencil size={17} />
        {publishedAt}
      </p>
      <Link
        href={`/blog/article/${post.slug}`}
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

export { Posts }
