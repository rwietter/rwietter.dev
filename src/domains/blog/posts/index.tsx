import Link from 'next/link'
import { TfiPencil } from 'react-icons/tfi'
import { getLocaleDate } from 'utils/get-locale-date'
import styles from './styles.module.css'

type Post = {
  frontmatter: {
    title: string
    description: string
    date: string
    image: string
    publishedAt: string
  }
  slug: string
  content: string
}

type PostCard = {
  post: Post
}

const ArticleCard = ({ post }: PostCard) => {
  const { localeDate } = getLocaleDate(post.frontmatter.publishedAt, 'pt-BR')

  return (
    <li className={styles.cardContainer}>
      <p className={styles.dateTimeRead}>
        <TfiPencil size={17} />
        {localeDate}
      </p>
      <Link
        href={`/blog/article/${post.slug}`}
        scroll={false}
        shallow={true}
        prefetch={true}
        className={styles.postTitle}
        suppressHydrationWarning
      >
        {post.frontmatter.title}
      </Link>
    </li>
  )
}

export { ArticleCard }
