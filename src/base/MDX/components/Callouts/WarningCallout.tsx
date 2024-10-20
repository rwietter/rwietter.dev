import type { PropsWithChildren } from 'react'
import { TiWarningOutline } from 'react-icons/ti'
import styles from './styles.module.css'

type WarningPropTypes = PropsWithChildren<{
  title?: string
}>

const WarningCallout: React.FC<WarningPropTypes> = ({
  children,
  title = 'Warning, Attention',
}) => (
  <section className={styles.warning}>
    <section className={styles.header}>
      <TiWarningOutline size={45} />
      <p>{title}</p>
    </section>
    <section className={styles.children}>{children}</section>
  </section>
)

export default WarningCallout
