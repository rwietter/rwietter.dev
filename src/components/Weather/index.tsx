import type { Weather } from '@/types/Weather'
import type { FC } from 'react'
import { PiFeatherLight } from 'react-icons/pi'
import styles from './styles.module.css'

interface WeatherPropsTypes {
  weather: Weather[]
}

export const WeatherConditions: FC<WeatherPropsTypes> = ({ weather }) => {
  if (weather === null) return <span />

  const data = weather[0]

  return (
    <>
      {data?.Temperature && (
        <p className={styles.weather}>
          <span className={styles.temperature}>
            <PiFeatherLight size={18} />
            <strong>
              &nbsp;
              {data?.Temperature?.Metric?.Value}
              °C &nbsp;
            </strong>
          </span>
          <span>
            <span>{data?.WeatherText && `( ${data.WeatherText} )`}</span>
            <span> &nbsp; in Constantina.</span>
          </span>
        </p>
      )}
    </>
  )
}
