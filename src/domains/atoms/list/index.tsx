import type { Post } from '@/types/Post'
import type { FC } from 'react'
import { Atom } from '../posts'
import styles from './styles.module.css'

type AtomsListPropTypes = {
  atoms: Post[]
}

const AtomsList: FC<AtomsListPropTypes> = ({ atoms }) => (
  <ul className={styles.articlesContainer}>
    {atoms?.map((post: Post) => (
      <Atom post={post} key={post.slug} />
    ))}
  </ul>
)

export { AtomsList }
