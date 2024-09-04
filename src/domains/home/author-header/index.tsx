import { SocialIcons } from '@/components/Social'
import { author } from './author'
import styles from './styles.module.css'

const AuthorHeader = () => {
  return (
    <section className={styles.container}>
      <h1 className={styles.name}>{author.name}</h1>
      <span className={styles.username}>@{author.username}</span>
      <h2 className={styles.biography}>{author.biography}</h2>
      <div className={styles.socialContainer}>
        <SocialIcons />
      </div>
    </section>
  )
}

export default AuthorHeader
