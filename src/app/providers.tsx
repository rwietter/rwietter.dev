'use client'

import dynamic from 'next/dynamic'
import { type PropsWithChildren, useEffect } from 'react'

const Kbar = dynamic(() => import('src/components/Kbar/CommandBar'), {
  ssr: false,
  loading: () => <span />,
})

import 'languages/i18n'
import { useIdleQueue } from 'src/hooks/useIdleQueue/useIdleQueue'
import { loadStylesheet } from 'utils/loadStylesheet'

type Props = PropsWithChildren

export default function Providers({ children }: Props) {
  const { addTask } = useIdleQueue()
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    addTask(() => {
      loadStylesheet(
        'https://cdn.jsdelivr.net/gh/rwietter/rwietter.dev@main/styles/fonts.css',
      )
      loadStylesheet(
        'https://cdn.jsdelivr.net/gh/rwietter/rwietter.dev@main/styles/shadow-icon.css',
      )
    })
  }, [])

  return <Kbar>{children}</Kbar>
}
