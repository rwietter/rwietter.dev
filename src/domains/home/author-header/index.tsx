import { SocialIcons } from '@/components/Social'
import { author } from './author'
import styles from './styles.module.css'

type AuthorHeaderPropTypes = {
  bio: string
}

const AuthorHeader: React.FC<AuthorHeaderPropTypes> = ({ bio }) => {
  return (
    <section className={styles.container}>
      <h1 className={styles.name}>{author.name}</h1>
      <span className={styles.username}>@{author.username}</span>
      <h2 className={styles.biography}>{bio}</h2>
      <div className={styles.socialContainer}>
        <SocialIcons />
      </div>
    </section>
  )
}

export default AuthorHeader
