import type { Post } from '@/types/Post'
import type { FC } from 'react'
import { Til } from '../posts'
import styles from './styles.module.css'

type TilPropTypes = {
  tils: Post[]
}

const TilList: FC<TilPropTypes> = ({ tils }) => (
  <ul className={styles.articlesContainer}>
    {tils?.map((post: Post) => (
      <Til post={post} key={post.slug} />
    ))}
  </ul>
)

export { TilList }
