import dynamic from 'next/dynamic'
import { type PropsWithChildren, Suspense } from 'react'

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
