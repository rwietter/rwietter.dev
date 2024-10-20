import type { FC, PropsWithChildren } from 'react'

type Props = PropsWithChildren

const Layout: FC<Props> = ({ children }) => {
  return <>{children}</>
}

export default Layout
