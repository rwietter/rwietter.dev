import dynamic from 'next/dynamic'
import Script from 'next/script'

const Header = dynamic(() => import('@/components/Header'))
const StickyBar = dynamic(() => import('@/components/StickyBar'))

import Providers from './providers'

import styles from './styles.module.css'

import { getDictionary } from '@/shared/i18n/dictionaries'
import type { Langs } from '@/shared/i18n/langs'

import '../../../styles/fonts.css'
import '../../../styles/styles.css'
import '../../../styles/theme.css'

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'pt' }]
}

interface Params {
  lang: Langs
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Params
}>) {
  const t = await getDictionary(params.lang)
  return (
    <html lang={params.lang}>
      <head>
        <DocumentStuff />
      </head>
      <body>
        <div className={styles.main}>
          <Header />
          <Providers>
            <main className={styles.layout}>{children}</main>
            <StickyBar />
          </Providers>
        </div>
      </body>
    </html>
  )
}

function DocumentStuff() {
  const SITE_URL = process.env.PUBLIC_SITE_URL
  return (
    <>
      <Script id='theme-script'>
        {`
          (function() {
            const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const savedTheme = localStorage.getItem('theme');
            document.documentElement.setAttribute("data-theme", savedTheme || (userPrefersDark ? 'dark' : 'light'));
          })();
        `}
      </Script>
      <Script>
        {`
          (function() {
            const headersFont = localStorage.getItem('headersFont')
            const bodyFont = localStorage.getItem('bodyFont')
            const fontSize = localStorage.getItem('fontSize')

            document.documentElement.style.setProperty(
              '--headers-font',
              headersFont || 'Geist Var',
            )
            document.documentElement.style.setProperty(
              '--body-font',
              bodyFont || 'Geist Var',
            )

            const size = fontSize ? fontSize + 'rem' : '1rem'

            document.documentElement.style.setProperty(
              '--fluid-type-min',
              size,
            )
          })();
        `}
      </Script>
      <Script
        src='https://cloud.umami.is/script.js'
        data-website-id='99c64e87-1dbd-4e1c-b45b-ada2e802dcc1'
        strategy='afterInteractive'
      />
      <link rel='preconnect' href='https://fonts.googleapis.com' />
      <meta name='application-name' content='Maurício Witter' />
      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta name='apple-mobile-web-app-status-bar-style' content='default' />
      <meta name='apple-mobile-web-app-title' content='Maurício Witter' />
      <meta name='format-detection' content='telephone=no' />
      <meta name='mobile-web-app-capable' content='yes' />
      <link rel="alternate" type="application/atom+xml" title="RSS Atom Feed" href={`${SITE_URL}/rss.atom`} />
      <link rel="alternate" type="application/rss+xml" title="RSS XML Feed" href={`${SITE_URL}/rss.xml`} />
      <link rel="alternate" type="application/json" title="RSS JSON Feed" href={`${SITE_URL}/rss.json`} />
      <meta name='theme-color' content='#000000' />
      {/* <link
        rel='alternate'
        type='application/rss+xml'
        title='XML RSS feed'
        href='/rss.xml'
      />
      <link
        rel='alternate'
        type='application/atom+xml'
        title='Atom RSS feed'
        href='/rss.atom'
      />
      <link
        rel='alternate'
        type='application/json'
        title='JSON RSS feed'
        href='/rss.json'
      /> */}
      <meta
        name='google-site-verification'
        content='oQ_XpS8_c5DYamhVCpljtPUmV-CX7D8zVxHbTd_ExNc'
      />
      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href='/icons/mstile-150x150.png'
      />
      <link rel='manifest' href='/manifest.json' />
      <link rel='icon' href='/icons/android-chrome-512x512.png' />
      <link rel='icon' sizes='57x57' href='/icons/apple-touch-icon-57x57.png' />
      <link
        rel='icon'
        sizes='114x114'
        href='/icons/apple-touch-icon-114x114.png'
      />
      <link rel='icon' sizes='72x72' href='/icons/apple-touch-icon-72x72.png' />
      <link
        rel='icon'
        sizes='144x144'
        href='/icons/apple-touch-icon-144x144.png'
      />
      <link rel='icon' sizes='60x60' href='/icons/apple-touch-icon-60x60.png' />
      <link
        rel='icon'
        sizes='120x120'
        href='/icons/apple-touch-icon-120x120.png'
      />
      <link rel='icon' sizes='76x76' href='/icons/apple-touch-icon-76x76.png' />
      <link
        rel='icon'
        sizes='152x152'
        href='/icons/apple-touch-icon-152x152.png'
      />
      <link
        rel='icon'
        type='image/png'
        href='/icons/favicon-196x196.png'
        sizes='196x196'
      />
      <link
        rel='icon'
        type='image/png'
        href='/icons/favicon-96x96.png'
        sizes='96x96'
      />
      <link
        rel='icon'
        type='image/png'
        href='/icons/favicon-32x32.png'
        sizes='32x32'
      />
      <link
        rel='icon'
        type='image/png'
        href='/icons/favicon-16x16.png'
        sizes='16x16'
      />
      <link
        rel='icon'
        type='image/png'
        href='/icons/favicon-128.png'
        sizes='128x128'
      />
      <meta name='msapplication-TileColor' content='#FFFFFF' />
      <meta
        name='msapplication-TileImage'
        content='/icons/mstile-144x144.png'
      />
      <meta
        name='msapplication-square70x70logo'
        content='/icons/mstile-70x70.png'
      />
      <meta
        name='msapplication-square150x150logo'
        content='/icons/mstile-150x150.png'
      />
      <meta
        name='msapplication-wide310x150logo'
        content='/icons/mstile-310x150.png'
      />
      <meta
        name='msapplication-square310x310logo'
        content='/icons/mstile-310x310.png'
      />
    </>
  )
}
