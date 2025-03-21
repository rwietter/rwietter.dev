'use client'

import { fetcherLastFm } from '@/services/fetcherLastFm'
import type { LastFmTrackProps, TrackProps } from '@/types/Track'
import Image from 'next/image'
import { type FC, useEffect, useState } from 'react'
import { PiMusicNoteSimpleThin, PiPauseThin, PiStopThin } from 'react-icons/pi'
import styles from './styles.module.css'

export const LastFMTrack: FC<LastFmTrackProps> = () => {
  const [track, setTrack] = useState<TrackProps | null>(null)

  async function getTrack() {
    const lastFm = await fetcherLastFm()
    const track = lastFm?.recenttracks?.track[0]
    setTrack(track)
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    getTrack()
  }, [])

  if (!track) return <span />

  const isPlaying = track['@attr']?.nowplaying === 'true'
  const imageUrl = track.image[3]['#text']

  return (
    <div className={styles.playing}>
      {imageUrl ? (
        <Image
          fetchPriority='low'
          quality={60}
          alt={track.name}
          src={imageUrl}
          width={90}
          height={90}
        />
      ) : (
        <span />
      )}
      <section className={styles.playingArtist}>
        <section className={styles.playingSpot}>
          <PiMusicNoteSimpleThin size={19} color='var(--main-color)' />
          <span className={styles.artist}>{track.artist['#text']}</span>
        </section>

        <p className={styles.play}>
          <a href={track.url} target='_blank' rel='noreferrer'>
            {isPlaying ? <PiPauseThin size={19} /> : <PiStopThin size={19} />}
            <strong className={styles.song}>{track.name}</strong>
          </a>
        </p>
      </section>
    </div>
  )
}
