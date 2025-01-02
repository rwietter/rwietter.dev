import type { PropsWithChildren } from 'react'
import styles from './styles.module.css'
import { PiInfoThin } from 'react-icons/pi'

type InfoPropTypes = PropsWithChildren<{
  title?: string
}>

const InfoCallout: React.FC<InfoPropTypes> = ({
  children,
  title = 'Tip, Hint',
}) => (
  <section className={styles.info}>
    <section className={styles.header}>
      <PiInfoThin size={45} />
      <p>{title}</p>
    </section>
    <section className={styles.children}>{children}</section>
  </section>
)

export default InfoCallout
