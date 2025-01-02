import type { FC } from 'react'
import { PiSpotifyLogoThin, PiStopThin } from 'react-icons/pi'
import styles from './styles.module.css'

export const NotPlaying: FC = () => (
  <div className={styles.playing}>
    <PiStopThin size={90} color='var(--colors-sub_color)' />
    <div className={styles.playingArtist}>
      <div className={styles.playingSpot}>
        <PiSpotifyLogoThin size={19} color='#1DB954' />
        <span className='artist'>Not listening to anything</span>
      </div>
    </div>
  </div>
)
