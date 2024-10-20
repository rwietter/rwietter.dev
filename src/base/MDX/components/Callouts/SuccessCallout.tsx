import type { PropsWithChildren } from 'react'
import { IoCheckmarkDone } from 'react-icons/io5'
import styles from './styles.module.css'

type SuccessPropTypes = PropsWithChildren<{
  title?: string
}>

const SuccessCallout: React.FC<SuccessPropTypes> = ({
  children,
  title = 'Check',
}) => (
  <section className={styles.success}>
    <section className={styles.header}>
      <IoCheckmarkDone size={45} />
      <p>{title}</p>
    </section>
    <section className={styles.children}>{children}</section>
  </section>
)

export default SuccessCallout
