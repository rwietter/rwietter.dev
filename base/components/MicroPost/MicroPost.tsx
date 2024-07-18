import styles from './styles.module.css'

type MicroPostPropTypes = React.PropsWithChildren<{
  title: string
}>

const MicroPost: React.FC<MicroPostPropTypes> = (props) => {
  return (
    <section className={styles.micropost}>
      <h1>{props.title}</h1>
      {props.children}
    </section>
  )
}

export default MicroPost
