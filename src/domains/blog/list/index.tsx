import type { Post } from '@/types/Post'
import type { FC } from 'react'
import { Posts } from '../posts'
import styles from './styles.module.css'

type BlogPropTypes = {
  posts: Post[]
}

const BlogPosts: FC<BlogPropTypes> = ({ posts }) => (
  <ul className={styles.articlesContainer}>
    {posts?.map((post: Post) => (
      <Posts post={post} key={post.slug} />
    ))}
  </ul>
)

export { BlogPosts }
