import MDX from '@/base/MDX'
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
      <MDX mdxSource={props.data.content} />
    </div>
  )
}

export default Microblog
