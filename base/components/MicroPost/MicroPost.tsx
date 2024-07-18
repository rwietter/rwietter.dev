import styles from './styles.module.css'

type MicroPostPropTypes = React.PropsWithChildren<{
  title: string
  date: string
}>

const MicroPost: React.FC<MicroPostPropTypes> = (props) => (
  <section className={styles.micropost}>
    <span className={styles.date}>{formatDate(props.date)}</span>
    <h2>{props.title}</h2>
    {props.children}
  </section>
)

export default MicroPost

function formatDate(date: string) {
  const [year, month, day] = date.split('-').map(Number)
  const dateObj = new Date(Date.UTC(year, month - 1, day + 1))

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }

  return new Intl.DateTimeFormat('en-US', options).format(dateObj)
}
