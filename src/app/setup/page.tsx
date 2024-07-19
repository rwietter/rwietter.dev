import { makeSeo } from '@/components/SEO/makeSeo'
import Setup from '@/domains/setup'
import type { Metadata } from 'next'

import styles from 'src/domains/setup/styles.module.css'

export const metadata: Metadata = makeSeo({
  title: 'Setup | Maurício Witter',
  description:
    'Operational System and Software Development Setup for Development and Productivity.',
  image:
    'https://res.cloudinary.com/ddwnioveu/image/upload/v1707422678/large_joshua_sortino_71v_Ab1_FXB_6g_unsplash_46a1453603.jpg',
  slug: '/setup',
  ogText:
    'Operational System and Software Development Setup for Development and Productivity.',
  abstract:
    'Operational System and Software Development Setup for Development and Productivity.',
  keywords: 'setup, software, development, productivity',
})

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  url: 'https://rwietter.dev/setup',
  name: 'Setup | Mauricio Witter | rwietter',
  description:
    'Operational System and Software Development Setup for Development and Productivity.',
}

const Page = () => (
  <>
    <script
      type='application/ld+json'
      // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    <div className={styles.main}>
      <section className={styles.content}>
        <Setup />
      </section>
    </div>
  </>
)

export default Page
