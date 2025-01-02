import type { PropsWithChildren } from 'react'
import styles from './styles.module.css'
import { PiChecksThin } from 'react-icons/pi'

type SuccessPropTypes = PropsWithChildren<{
  title?: string
}>

const SuccessCallout: React.FC<SuccessPropTypes> = ({
  children,
  title = 'Check',
}) => (
  <section className={styles.success}>
    <section className={styles.header}>
      <PiChecksThin size={45} />
      <p>{title}</p>
    </section>
    <section className={styles.children}>{children}</section>
  </section>
)

export default SuccessCallout
