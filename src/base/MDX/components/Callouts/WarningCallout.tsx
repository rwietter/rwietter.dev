import type { PropsWithChildren } from 'react'
import styles from './styles.module.css'
import { PiWarningThin } from 'react-icons/pi'

type WarningPropTypes = PropsWithChildren<{
  title?: string
}>

const WarningCallout: React.FC<WarningPropTypes> = ({
  children,
  title = 'Warning, Attention',
}) => (
  <section className={styles.warning}>
    <section className={styles.header}>
      <PiWarningThin size={45} />
      <p>{title}</p>
    </section>
    <section className={styles.children}>{children}</section>
  </section>
)

export default WarningCallout
