import { type ProjectItem, projects } from './data'
import styles from './styles.module.css'

type Project = {
  title: string
  description: string
  github: string
}

export const YearProjects = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>More projects</h1>
      {Object.keys(projects)
        .sort((a, b) => Number(b) - Number(a))
        .map((year) => (
          <div className={styles.projectItemContainer} key={year}>
            <span className={styles.year}>{year}</span>
            <div className={styles.list}>
              {projects[year].map((project: ProjectItem) => (
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
