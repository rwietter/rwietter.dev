import type { FC, PropsWithChildren } from 'react'

type Props = PropsWithChildren

const Layout: FC<Props> = ({ children }) => {
  return <div>{children}</div>
}

export default Layout
