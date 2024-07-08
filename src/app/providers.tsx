'use client'

import { PropsWithChildren, Suspense } from 'react'
import dynamic from 'next/dynamic'

const CommandBar = dynamic(() => import('src/components/Kbar/CommandBar'), {
  ssr: false,
})

import 'languages/i18n'

type Props = PropsWithChildren

export default function Providers({ children }: Props) {
  return (
    <Suspense>
      <CommandBar>{children}</CommandBar>
    </Suspense>
  )
}
