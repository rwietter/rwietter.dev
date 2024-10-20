import type React from 'react'
import { PiHashStraightLight } from 'react-icons/pi'

import styles from './styles.module.css'

type HeadingProps = {
  id?: string
  children?: React.ReactNode
}

const heading = (As: 'h1' | `h2` | `h3` | `h4` | `h5` | `h6`) => {
  const Heading = ({ id, children }: HeadingProps) => (
    <a href={`#${id}`} className={styles.link}>
      <PiHashStraightLight className={styles.hash} size={30} />
      <As id={id} className={styles.heading}>
        {children}
      </As>
    </a>
  )
  Heading.displayName = As
  return Heading
}

export const headings = {
  h1: heading('h1'),
  h2: heading('h2'),
  h3: heading('h3'),
  h4: heading('h4'),
  h5: heading('h5'),
  h6: heading('h6'),
}
