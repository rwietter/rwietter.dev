'use client'

import { type PropsWithChildren, useEffect } from 'react'
import { useIdleQueue } from 'src/hooks/useIdleQueue/useIdleQueue'
import { loadStylesheet } from 'utils/loadStylesheet'

// import '../../../../styles/highlight.css'
// import '../../../../styles/prism-theme.css'
// import '../../../../styles/styles.css'
// import "katex/dist/katex.min.css"

type Props = PropsWithChildren

export default function Providers({ children }: Props) {
  const { addTask } = useIdleQueue()

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      addTask(() => {
        loadStylesheet(
          'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css',
        )
        loadStylesheet(
          'https://cdn.jsdelivr.net/gh/rwietter/rwietter.dev@main/styles/katex-override.css',
        )
        loadStylesheet(
          'https://cdn.jsdelivr.net/gh/rwietter/rwietter.dev@main/styles/highlight.css',
        )
        loadStylesheet(
          'https://cdn.jsdelivr.net/gh/rwietter/rwietter.dev@main/styles/prism-theme.css',
        )
      })
    }
  }, [])
  return <>{children}</>
}
