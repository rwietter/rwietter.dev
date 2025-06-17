import MDX from '@/base/MDX'
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
      <span className={styles.description}>
        This is a bibliography of works that I have read or am currently
        reading. They are organized by topic and are not exhaustive. I will
        update this list as I read more books and papers. <span> </span>
      </span>
      <span className={styles.description}>
        Citations are provided in IEEE format. If the resource is available
        offline, I will provide a link to the publisher's website.
      </span>
    </section>
    <MDX mdxSource={props.data.content} />
  </div>
)

export default Syllabus
