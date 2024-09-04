import type { SocialLink } from '@/types/Social'
import { LiaOrcid } from 'react-icons/lia'
import { PiGithubLogo, PiLinkedinLogo } from 'react-icons/pi'
import { SiSubstack } from 'react-icons/si'
import { TbBrandBluesky } from 'react-icons/tb'

export type SocialLinks = SocialLink[]

export const links: SocialLinks = [
  {
    icon: <PiLinkedinLogo size={27} />,
    url: 'https://www.linkedin.com/in/euiciowr/',
    name: 'LinkedIn',
    color: 'linkedIn',
  },
  {
    icon: <SiSubstack size={22} />,
    url: 'https://rwietter.substack.com/',
    name: 'Substack',
    color: 'substack',
  },
  {
    icon: <PiGithubLogo size={27} />,
    url: 'https://github.com/rwietter',
    name: 'GitHub',
    color: 'github',
  },
  {
    icon: <TbBrandBluesky size={27} />,
    url: 'https://bsky.app/profile/did:plc:l4rdag2x2gkyq5zkgb46pbzl',
    name: 'Bluesky',
    color: 'bluesky',
  },
  {
    icon: <LiaOrcid size={27} />,
    url: 'https://orcid.org/0009-0003-5333-2885',
    name: 'ORCID',
    color: 'ORCID',
  },
]
