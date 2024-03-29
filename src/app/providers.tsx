'use client'

import { PropsWithChildren } from 'react'
import CommandBar from 'src/components/Kbar/CommandBar'

import 'languages/i18n'

type Props = PropsWithChildren

export default function Providers({ children }: Props) {
  return (
    <>
      <CommandBar>{children}</CommandBar>
    </>
  )
}
