import type { ReactNode } from 'react'

export type ColorName = 'bluesky' | 'linkedIn' | 'github' | 'substack' | 'ORCID'

export type SocialLink = {
  icon: ReactNode
  url: string
  name: string
  color: ColorName
}
