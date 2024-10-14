import type { PropsWithChildren } from 'react'
import styles from './styles.module.css'
import { VscQuote } from 'react-icons/vsc'

type MessagerPropTypes = PropsWithChildren<{
  title?: string
}>

const CiteCallout: React.FC<MessagerPropTypes> = ({
  children,
  title = 'Cite',
}) => (
  <section className={styles.cite}>
    <section className={styles.header}>
      <VscQuote size={45} />
      <p>{title}</p>
    </section>
    <section className={styles.children}>{children}</section>
  </section>
)

export default CiteCallout
