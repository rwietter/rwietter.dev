'use client'

import type { Action as KBarAction } from 'kbar'
import { useRouter } from 'next/navigation'

import Bluesky from '@/components/Icons/Bluesky'
import Substack from '@/components/Icons/Substack'
import {
  PiTildeLight,
  PiFolderSimpleStarLight,
  PiArticleMediumLight,
  PiCopySimpleThin,
  PiBookmarksSimpleLight,
  PiAtLight,
  PiArticleNyTimesLight,
  PiHouseSimpleLight,
  PiBooksLight,
  PiGithubLogoLight,
  PiTelegramLogoLight,
  PiAtomLight
} from 'react-icons/pi'

const Actions = () => {
  const router = useRouter()

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
  }

  const actions: KBarAction[] = [
    {
      id: 'Copy',
      name: 'Copy Link',
      shortcut: ['l'],
      keywords: 'copy-link',
      section: 'General',
      perform: copyLink,
      icon: <PiCopySimpleThin size={20} color='var(--text-color)' />,
    },
    {
      id: 'Contact',
      name: 'Contact',
      shortcut: ['e'],
      keywords: 'contact',
      section: 'General',
      perform: () => router.push('/contact'),
      icon: <PiAtLight size={20} color='var(--text-color)' />,
    },
    {
      id: 'Home',
      name: 'Home',
      shortcut: ['h'],
      keywords: 'page-home',
      section: 'Pages',
      perform: () => router.push('/'),
      icon: <PiHouseSimpleLight size={20} color='var(--text-color)' />,
    },
    {
      id: 'Blog',
      name: 'Blog',
      shortcut: ['b'],
      keywords: 'go-blog',
      section: 'Pages',
      perform: () => router.push('/blog'),
      icon: <PiArticleNyTimesLight size={20} color='var(--text-color)' />,
    },
    {
      id: 'Atoms',
      name: 'Atoms',
      shortcut: ['a'],
      keywords: 'atoms',
      section: 'Pages',
      perform: () => router.push('/atoms'),
      icon: <PiAtomLight size={20} color='var(--text-color)' />,
    },
    {
      id: 'syllabus',
      name: 'Syllabus',
      shortcut: ['b'],
      keywords: 'go-syllabus',
      section: 'Pages',
      perform: () => router.push('/syllabus'),
      icon: <PiBooksLight size={20} color='var(--text-color)' />,
    },
    {
      id: 'Awesome',
      name: 'Awesome',
      shortcut: ['w'],
      keywords: 'page-awesome',
      section: 'Pages',
      perform: () => router.push('/awesome'),
      icon: <PiBookmarksSimpleLight size={20} color='var(--text-color)' />,
    },
    {
      id: 'Microblog',
      name: 'Microblog',
      shortcut: ['m'],
      keywords: 'microblog',
      section: 'Pages',
      perform: () => router.push('/microblog'),
      icon: <PiArticleMediumLight size={20} color='var(--text-color)' />,
    },
    {
      id: 'Projects',
      name: 'Projects',
      shortcut: ['p'],
      keywords: 'page-projects',
      section: 'Pages',
      perform: () => router.push('/projects'),
      icon: <PiFolderSimpleStarLight size={20} color='var(--text-color)' />,
    },
    {
      id: 'Today I Learned',
      name: 'Today I Learned',
      shortcut: ['d'],
      keywords: 'Today I Learned',
      section: 'Pages',
      perform: () => router.push('/tildes'),
      icon: <PiTildeLight size={20} color='var(--text-color)' />,
    },
    {
      id: 'GitHub',
      name: 'GitHub',
      shortcut: ['g'],
      keywords: 'github',
      section: 'Social',
      perform: () => window.open('https://github.com/rwietter', '_blank'),
      icon: <PiGithubLogoLight size={20} color='var(--text-color)' />,
    },
    {
      id: 'Substack',
      name: 'Substack',
      shortcut: ['s'],
      keywords: 'substack',
      section: 'Social',
      perform: () => window.open('https://rwietter.substack.com/', '_blank'),
      icon: <Substack size={20} color='var(--text-color)' />,
    },
    {
      id: 'Bluesky',
      name: 'Bluesky',
      shortcut: ['t'],
      keywords: 'Bluesky',
      section: 'Social',
      perform: () =>
        window.open(
          'https://bsky.app/profile/did:plc:l4rdag2x2gkyq5zkgb46pbzl',
          '_blank',
        ),
      icon: <Bluesky size={20} color='var(--text-color)' />,
    },
    {
      id: 'Telegram',
      name: 'Telegram',
      shortcut: ['c'],
      keywords: 'telegram',
      section: 'Social',
      perform: () => window.open('https://t.me/rwietter', '_blank'),
      icon: <PiTelegramLogoLight size={20} color='var(--text-color)' />,
    },
  ]
  return { actions }
}

export default Actions
