'use client'

import {
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarProvider,
  KBarSearch,
} from 'kbar'
import type { ReactNode } from 'react'
import Actions from './Actions'
import { RenderResults } from './RenderResults'
import styles from './styles.module.css'

type Props = {
  children: ReactNode
}

const Kbar = ({ children }: Props) => {
  return (
    <KBarProvider
      actions={Actions().actions}
      options={{
        toggleShortcut: 'Control+Space',
        enableHistory: true,
        animations: {
          enterMs: 500,
          exitMs: 500,
        }
      }}
    >
      <KBarPortal>
        <KBarPositioner className={styles.positioner}>
          <KBarAnimator className={styles.animator}>
            <KBarSearch
              className={styles.search}
              autoFocus={false}
              placeholder='Type a command or search…'
            />
            <RenderResults />
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      {children}
    </KBarProvider>
  )
}

export { Kbar }
