import type { PropsWithChildren } from 'react'
import styles from './styles.module.css'
import { PiQuotesThin } from 'react-icons/pi'

type MessagerPropTypes = PropsWithChildren<{
  title?: string
}>

const CiteCallout: React.FC<MessagerPropTypes> = ({
  children,
  title = 'Cite',
}) => (
  <section className={styles.cite}>
    <section className={styles.header}>
      <PiQuotesThin size={45} />
      <p>{title}</p>
    </section>
    <section className={styles.children}>{children}</section>
  </section>
)

export default CiteCallout
