'use client'

import dynamic from 'next/dynamic'
import { type PropsWithChildren } from 'react'

const Kbar = dynamic(() => import('@/components/Kbar/CommandBar'))
const Loading = dynamic(() => import('@/components/Loading/Loading'))

type Props = PropsWithChildren

export default function Providers({ children }: Props) {
  // const { addTask } = useIdleQueue()

  return (
    <>
      <Loading />
      <Kbar>{children}</Kbar>
    </>
  )
}
