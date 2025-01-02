import type { SocialLink } from '@/types/Social'
import { PiGithubLogo, PiLinkedinLogo } from 'react-icons/pi'
import Substack from '@/components/Icons/Substack'
import Bluesky from '@/components/Icons/Bluesky'
import Orcid from '@/components/Icons/Orcid'

export type SocialLinks = SocialLink[]

export const links: SocialLinks = [
  {
    icon: <PiLinkedinLogo size={27} />,
    url: 'https://www.linkedin.com/in/euiciowr/',
    name: 'LinkedIn',
    color: 'linkedIn',
  },
  {
    icon: <Substack size={22} />,
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
    icon: <Bluesky size={27} />,
    url: 'https://bsky.app/profile/did:plc:l4rdag2x2gkyq5zkgb46pbzl',
    name: 'Bluesky',
    color: 'bluesky',
  },
  {
    icon: <Orcid size={27} />,
    url: 'https://orcid.org/0009-0003-5333-2885',
    name: 'ORCID',
    color: 'ORCID',
  },
]
