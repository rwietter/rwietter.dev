import { makeSeo } from '@/components/SEO/makeSeo'
import { getDictionary } from '@/shared/i18n/dictionaries'
import type { Langs } from '@/shared/i18n/langs'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import type React from 'react'

const YearProjects = dynamic(() =>
  import('src/domains/projects/YearProjects').then((mod) => ({
    default: mod.YearProjects,
  })),
)

const TopProjects = dynamic(() =>
  import('src/domains/projects/TopProjects').then((mod) => ({
    default: mod.TopProjects,
  })),
)

type PageProps = {
  params: {
    lang: Langs
  }
}

const Page: React.FC<PageProps> = async ({ params }) => {
  const lang = params.lang
  const t = await getDictionary(lang)
  return (
    <>
      <script
        type='application/ld+json'
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TopProjects lang={lang} />
      <YearProjects i18n={t.projects.yearProjects} lang={lang} />
    </>
  )
}

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
