import { ArticleCard } from '../posts'
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

type Posts = {
  posts: Post[]
}

const BlogPosts = ({ posts }: Posts) => (
  <ul className={styles.articlesContainer}>
    {posts?.map((post: Post) => (
      <ArticleCard post={post} key={post.slug} />
    ))}
  </ul>
)

export { BlogPosts }
