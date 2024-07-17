import type { FC, ReactNode } from 'react'
import styles from './project.module.css'

interface Project {
  project: {
    title: string
    description: string
    image: string
    github: string
    link: string
    tags: string[]
    icon: ReactNode
  }
}

export const ProjectItem: FC<Project> = ({ project }) => {
  return (
    <a
      className={styles.wrapper}
      href={project.link}
      target='_blank'
      rel='noopener noreferrer'
    >
      <section className={styles.hoverBackground} />
      <div className={styles.container}>
        <span>
          {project.icon}
          <div>
            <h2 className={styles.title}>{project.title}</h2>
            <p className={styles.description}>{project.description}</p>
          </div>
        </span>
      </div>
    </a>
  )
}
