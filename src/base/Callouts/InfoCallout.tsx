import type { PropsWithChildren } from 'react'
import { GrInfo } from 'react-icons/gr'
import styles from './styles.module.css'

type InfoPropTypes = PropsWithChildren<{
  title?: string
}>

const InfoCallout: React.FC<InfoPropTypes> = ({
  children,
  title = 'Tip, Hint',
}) => (
  <section className={styles.info}>
    <section className={styles.header}>
      <GrInfo size={45} />
      <p>{title}</p>
    </section>
    <section className={styles.children}>{children}</section>
  </section>
)

export default InfoCallout
