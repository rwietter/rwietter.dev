import { makeSeo } from '@/components/SEO/makeSeo'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

const YearProjects = dynamic(() =>
  import('src/domains/projects/YearProjects').then((mod) => ({
    default: mod.YearProjects,
  }))
)

const TopProjects = dynamic(() =>
  import('src/domains/projects/TopProjects').then((mod) => ({
    default: mod.TopProjects,
  }))
)

const Page = () => (
  <>
    <script
      type='application/ld+json'
      // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    <TopProjects />
    <YearProjects />
  </>
)

export default Page

export const metadata: Metadata = makeSeo({
  title: 'Projects | Maurício W. | Software Developer',
  description:
    'Here, in this page, you can find some of my favorite projects. I hope you enjoy it. :)',
  image:
    'https://res.cloudinary.com/ddwnioveu/image/upload/v1707422678/large_joshua_sortino_71v_Ab1_FXB_6g_unsplash_46a1453603.jpg',
  slug: '/projects',
  ogText:
    'Here, in this page, you can find some of my favorite projects. I hope you enjoy it. :)',
  abstract: 'Projects were I worked on.',
  keywords: 'projects, portfolio, software, developer',
})

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  url: 'https://rwietter.dev/projects',
  name: 'Projects | Mauricio Witter | rwietter',
  description:
    'Here, in this page, you can find some of my favorite projects. I hope you enjoy it. :)',
}
