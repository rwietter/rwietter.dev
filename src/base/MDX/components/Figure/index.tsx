import type React from 'react'

import styles from './styles.module.css'

type FigurePropTypes = {
  source: string
  title?: string
  alt?: string
  caption?: string
  id?: string
  width?: number
  zoomable?: boolean
  lang?: string
}

const Figure: React.FC<FigurePropTypes> = ({
  source,
  caption,
  lang = 'en',
  alt,
  id,
  width = '100%',
  zoomable = true,
}) => {
  const FigName = lang === 'en' ? 'Figure' : 'Figura'
  return (
    <figure
      id={id}
      className={`${styles.figure} ${styles.align} `}
      data-figure-number={id}
      onMouseMove={handleMouseMove}
    >
      <div className={zoomable ? styles.zoomWrapper : ''}>
        <img
          src={source}
          alt={alt}
          width={width}
          className={`${styles.image} ${zoomable ? styles.zoomable : ''}`}
        />
      </div>
      {id && caption ? (
        <figcaption className={styles.caption}>
          {FigName} {id}: {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}

const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  const rect = e.currentTarget.getBoundingClientRect()
  const x = ((e.clientX - rect.left) / rect.width) * 100
  const y = ((e.clientY - rect.top) / rect.height) * 100

  e.currentTarget.style.setProperty('--x', `${x}%`)
  e.currentTarget.style.setProperty('--y', `${y}%`)
}

export default Figure
