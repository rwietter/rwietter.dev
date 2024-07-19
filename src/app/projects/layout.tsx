import type { FC, PropsWithChildren } from 'react'

type Props = PropsWithChildren

const ProjectsLayout: FC<Props> = ({ children }) => {
  return <>{children}</>
}

export default ProjectsLayout
