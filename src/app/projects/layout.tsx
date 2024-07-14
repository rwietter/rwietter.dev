import type { FC, PropsWithChildren } from 'react'

type Props = PropsWithChildren

const ProjectsLayout: FC<Props> = ({ children }) => {
  return <div>{children}</div>
}

export default ProjectsLayout
