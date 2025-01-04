import type { FC, PropsWithChildren } from 'react'

type Props = PropsWithChildren

const SettingsLayout: FC<Props> = ({ children }) => {
  return <div>{children}</div>
}

export default SettingsLayout
