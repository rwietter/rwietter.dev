import type { Post } from '@/types/Post'
import type { FC } from 'react'
import { Til } from '../posts'
import styles from './styles.module.css'

type TilListPropTypes = {
  tildes: Post[]
}

const TilList: FC<TilListPropTypes> = ({ tildes }) => (
  <ul className={styles.articlesContainer}>
    {tildes?.map((post: Post) => (
      <Til post={post} key={post.slug} />
    ))}
  </ul>
)

export { TilList }
