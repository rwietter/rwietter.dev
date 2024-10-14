"use client"

import dynamic from 'next/dynamic'
import { type PropsWithChildren, useEffect } from 'react'

const Kbar = dynamic(() => import('@/components/Kbar/CommandBar'))
const Loading = dynamic(() => import('@/components/Loading/Loading'))

type Props = PropsWithChildren

export default function Providers({ children }: Props) {
  useEffect(() => {
    const headersFont = localStorage.getItem("headersFont");
    const bodyFont = localStorage.getItem("bodyFont");

    document.documentElement.style.setProperty("--headers-font", headersFont || "Inter");
    document.documentElement.style.setProperty("--body-font", bodyFont || "Inter");
  }, []);
  return (
    <>
      <Loading />
      <Kbar>{children}</Kbar>
    </>
  )
}
