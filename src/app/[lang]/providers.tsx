'use client'

import { useIdleQueue } from '@/hooks/useIdleQueue/useIdleQueue'
import dynamic from 'next/dynamic'
import { useEffect, type PropsWithChildren } from 'react'
import { loadStylesheet } from 'utils/loadStylesheet'

const Kbar = dynamic(() => import('@/components/Kbar/CommandBar'))
const Loading = dynamic(() => import('@/components/Loading/Loading'))

type Props = PropsWithChildren

export default function Providers({ children }: Props) {
  const { addTask } = useIdleQueue()

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    addTask(() => {
      loadStylesheet(
        '/styles/fonts.css',
      )
    })
  }, [])

  return (
    <>
      <Loading />
      <Kbar>{children}</Kbar>
    </>
  )
}
