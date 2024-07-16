'use client'

import { type PropsWithChildren, useEffect } from 'react'
import { loadStylesheet } from '../../../../utils/loadStylesheet'
import { useIdleQueue } from '../../../hooks/useIdleQueue/useIdleQueue'

type Props = PropsWithChildren

export default function Providers({ children }: Props) {
  const { addTask } = useIdleQueue()

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    addTask(() => {
      loadStylesheet(
        'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css',
      )
    })
  }, [])
  return <>{children}</>
}
