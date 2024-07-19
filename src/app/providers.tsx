import Loading from '@/components/Loading/Loading'
import dynamic from 'next/dynamic'
import type { PropsWithChildren } from 'react'

const Kbar = dynamic(() => import('src/components/Kbar/CommandBar'))

type Props = PropsWithChildren

export default function Providers({ children }: Props) {
  return (
    <>
      <Loading />
      <Kbar>{children}</Kbar>
    </>
  )
}
