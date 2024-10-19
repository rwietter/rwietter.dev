'use client'

import React, { type PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'

export const Portal: React.FC<PropsWithChildren> = ({ children }) => {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return mounted ? createPortal(children, document.body) : null
}
