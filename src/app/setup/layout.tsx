import type { FC, PropsWithChildren } from 'react'

type Props = PropsWithChildren

const SetupLayout: FC<Props> = ({ children }) => {
  return <div>{children}</div>
}

export default SetupLayout
