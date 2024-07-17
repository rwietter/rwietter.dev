import { ProjectItem } from './ProjectItem'
import { topProjects } from './data'
import styles from './styles.module.css'

const TopProjects: React.FC = () => (
  <section className={styles.grid}>
    {topProjects
      .sort((item, bitem) => (item.title < bitem.title ? -1 : 1))
      .map((project) => (
        <ProjectItem key={project.link} project={project} />
      ))}
  </section>
)

export { TopProjects }
