import MDX from '@/base/components/MDX'
import type { MDXSerialized } from '@/types/MDX'
import styles from './styles.module.css'

type SyllabusPropTypes = {
  data: {
    content: MDXSerialized
  }
}

const Syllabus: React.FC<SyllabusPropTypes> = (props) => (
  <div className={styles.wrapper}>
    <h1 className={styles.title}>Syllabus</h1>
    <section>
      <span>
        This is a bibliography of works that I have read or am currently
        reading. They are organized by topic and are not exhaustive. I will
        update this list as I read more books.
      </span>
      <span>
        Citations are provided in IEEE format. If the resource is available
        offline and
      </span>
    </section>
    <MDX mdxSource={props.data.content} />
  </div>
)

export default Syllabus
