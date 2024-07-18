import MDX from '@/base/components/MDX'
import type { MDXSerialized } from '@/types/MDX'
import styles from './styles.module.css'

type MicroBlogTypeProps = {
  data: {
    content: MDXSerialized
  }
}

const Microblog: React.FC<MicroBlogTypeProps> = (props) => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Microblog</h1>
      <MDX mdxSource={props.data.content} />
    </div>
  )
}

export default Microblog
