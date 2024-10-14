import type { Langs } from '@/shared/i18n/langs'
import { type Project, projects } from './data'
import styles from './styles.module.css'

type PropTypes = {
  lang: Langs
  i18n: {
    title: string
  }
}

export const YearProjects: React.FC<PropTypes> = ({ i18n, lang }) => {
  const p = projects[lang]
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{i18n.title}</h1>
      {Object.keys(projects[lang])
        .sort((a, b) => Number(b) - Number(a))
        .map((year) => (
          <div className={styles.projectItemContainer} key={year}>
            <span className={styles.year}>{year}</span>
            <div className={styles.list}>
              {p[year]?.map((project: Project) => (
                <ProjectItemComponent key={project.title} project={project} />
              ))}
            </div>
          </div>
        ))}
    </div>
  )
}

const ProjectItemComponent = ({ project }: { project: Project }) => {
  return (
    <section className={styles.listItem} key={project.title}>
      <a
        className={styles.listItemName}
        href={project.github}
        target='_blank'
        rel='noopener noreferrer'
      >
        <strong>{project.title}</strong>:<span>{project.description}</span>
      </a>
    </section>
  )
}
