import type { CategoryPost } from '@/types/Category'
import type { FC } from 'react'
import { Category } from '../category'
import styles from './styles.module.css'

type BlogPropTypes = {
  posts: CategoryPost[]
}

const Categories: FC<BlogPropTypes> = ({ posts }) => (
  <ul className={styles.articlesContainer}>
    {posts?.map((post: CategoryPost) => (
      <Category categoryPost={post} key={post.slug} />
    ))}
  </ul>
)

export { Categories }
