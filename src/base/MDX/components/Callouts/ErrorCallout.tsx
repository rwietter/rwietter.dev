import type { PropsWithChildren } from 'react'
import styles from './styles.module.css'
import { PiWarningDiamondThin } from 'react-icons/pi'

type ErrorPropTypes = PropsWithChildren<{
  title?: string
}>

const ErrorCallout: React.FC<ErrorPropTypes> = ({
  children,
  title = 'Danger, Error',
}) => (
  <section className={styles.error}>
    <section className={styles.header}>
      <PiWarningDiamondThin size={45} />
      <p>{title}</p>
    </section>
    <section className={styles.children}>{children}</section>
  </section>
)

export default ErrorCallout
