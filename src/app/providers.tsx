'use client'
import dynamic from 'next/dynamic'
import type { PropsWithChildren } from 'react'

const Kbar = dynamic(() => import('src/components/Kbar/CommandBar'))

import 'languages/i18n'

type Props = PropsWithChildren

export default function Providers({ children }: Props) {
  return <Kbar>{children}</Kbar>
}
