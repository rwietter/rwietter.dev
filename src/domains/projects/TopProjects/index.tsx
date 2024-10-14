import type { Langs } from '@/shared/i18n/langs'
import { ProjectItem } from './ProjectItem'
import { projects } from './data'
import styles from './styles.module.css'

type PropTypes = {
  lang: Langs
}

const TopProjects: React.FC<PropTypes> = ({ lang }) => {
  const pinnedProjects = projects[lang]
  return (
    <section className={styles.grid}>
      {pinnedProjects
        .sort((item, bitem) => (item.title < bitem.title ? -1 : 1))
        .map((project) => (
          <ProjectItem key={project.link} project={project} />
        ))}
    </section>
  )
}

export { TopProjects }
