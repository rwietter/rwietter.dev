import { KbarInit } from '@/components/Kbar/KbarInit'
import { makeSeo } from '@/components/SEO/makeSeo'
import AuthorContent from '@/domains/home/author-content'
import AuthorHeader from '@/domains/home/author-header'
import type { Metadata } from 'next'

const Page = () => (
  <>
    <script
      type='application/ld+json'
      // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    <AuthorHeader />
    <AuthorContent />
    <KbarInit />
  </>
)

export default Page

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  url: 'https://rwietter.dev/',
  name: 'Mauricio Witter | Software Developer',
  description:
    'This blog is about my journey as a Software Developer. Here do you find my thoughts, ideas, and experiences. I hope you enjoy it.',
}

export const metadata: Metadata = makeSeo({
  title: 'Mauricio Witter | Software Developer',
  description:
    'This blog is about my journey as a Software Developer. Here do you find my thoughts, ideas, and experiences. I hope you enjoy it.',
  image:
    'https://res.cloudinary.com/ddwnioveu/image/upload/v1707422678/large_joshua_sortino_71v_Ab1_FXB_6g_unsplash_46a1453603.jpg',
  slug: '/',
  ogText:
    'This blog is about my journey as a Software Developer. Here do you find my thoughts, ideas, and experiences. I hope you enjoy it.',
  abstract: 'My journey as a Software Developer.',
  keywords: 'software, developer, blog, journey',
})
