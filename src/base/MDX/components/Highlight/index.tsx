import type { PropsWithChildren } from 'react'
import styles from './styles.module.css'
import { PiQuotesThin } from 'react-icons/pi'

type MessagerPropTypes = PropsWithChildren<{
  color?: string
}>

const Highlight: React.FC<MessagerPropTypes> = ({
  children,
}) => (
  <p className={styles.highlight}>
    {children}
  </p>
)

export default Highlight
