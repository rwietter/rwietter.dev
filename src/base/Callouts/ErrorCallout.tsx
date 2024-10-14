import type { PropsWithChildren } from 'react'
import styles from './styles.module.css'
import { MdOutlineDangerous } from 'react-icons/md'

type ErrorPropTypes = PropsWithChildren<{
  title?: string
}>

const ErrorCallout: React.FC<ErrorPropTypes> = ({
  children,
  title = 'Danger, Error',
}) => (
  <section className={styles.error}>
    <section className={styles.header}>
      <MdOutlineDangerous size={45} />
      <p>{title}</p>
    </section>
    <section className={styles.children}>{children}</section>
  </section>
)

export default ErrorCallout
