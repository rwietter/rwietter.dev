import { GoogleAnalytics } from '@next/third-parties/google'
import dynamic from 'next/dynamic'
import Script from 'next/script'
import { IBM_Plex_Mono, Atkinson_Hyperlegible, Inter, Libre_Caslon_Text } from 'next/font/google'


// const Header = dynamic(() => import('@/components/Header'))
const StickyBar = dynamic(() => import('@/components/StickyBar'))

import Providers from './providers'

import styles from './styles.module.css'

import { getDictionary } from '@/shared/i18n/dictionaries'
import type { Langs } from '@/shared/i18n/langs'

import '../../../styles/styles.css'
import '../../../styles/theme.css'

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'pt' }]
}

interface Params {
  lang: Langs
}

const IBM = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--ibm-plex-mono',
  fallback: ['monospace'],
  preload: true,
})

const INTER = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--inter',
  display: 'swap',
  fallback: ['sans-serif'],
  preload: true,
  adjustFontFallback: true,
})

const ATKINSON = Atkinson_Hyperlegible({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--atkinson',
  display: 'swap',
  fallback: ['sans-serif'],
  preload: true,
  adjustFontFallback: true,
})

const GARAMOND = Libre_Caslon_Text({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--eb-garamond',
  display: 'swap',
  fallback: ['serif'],
  preload: true,
  adjustFontFallback: true,
})

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
      <GoogleAnalytics gaId="G-BX714TPPEG" />
      <body className={`${INTER.variable} ${ATKINSON.variable} ${IBM.variable} ${GARAMOND.variable}`}>
        <div className={styles.main}>
          {/* <Header /> */}
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
      <link
        rel='alternate'
        type='application/atom+xml'
        title="rwietter's blog posts | Atom (Static) Feed (English)"
        href={`${SITE_URL}/rss.atom`}
      />
      <link
        rel='alternate'
        type='application/rss+xml'
        title="rwietter's blog posts | XML (Static) Feed (English)"
        href={`${SITE_URL}/rss.xml`}
      />
      <link
        rel='alternate'
        type='application/json'
        title="rwietter's blog posts | JSON (Static) Feed (English)"
        href={`${SITE_URL}/rss.json`}
      />

      <link
        rel="alternate"
        type="application/rss+xml"
        title="rwietter's blog posts | XML (Dynamic) Feed (English)"
        href={`${SITE_URL}/en/blog/rss`}
      />
      <link
        rel="alternate"
        type="application/rss+xml"
        title="rwietter's blog posts | XML (Dynamic) Feed (Portuguese)"
        href={`${SITE_URL}/pt/blog/rss`}
      />
      <meta name='theme-color' content='#000000' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='description' content='Maurício Witter personal website. A place to share thoughts, projects, and ideas. I am a software developer, and I write some ideas about computer science, programming, and software engineering.' />
      <meta name='robots' content='index, follow' />
      <meta name='googlebot' content='index, follow' />
      <link rel='canonical' href={`${SITE_URL}/en`} />
      <meta name='google' content='notranslate' />
      <meta name='referrer' content='no-referrer-when-downgrade' />
      <meta name='author' content='Maurício Witter' />
      <meta name='keywords' content='Maurício Witter, rwietter, rwietter.dev' />
      <meta name='rating' content='general' />
      <meta name='distribution' content='global' />
      <meta name='revisit-after' content='7 days' />
      <meta name='language' content='en' />
      <meta name='generator' content='Next.js' />
      <meta name='twitter:card' content='summary' />
      <meta name='twitter:site' content='@rwietter' />
      <meta name='twitter:creator' content='@rwietter' />
      <meta name='twitter:title' content='Maurício Witter' />
      <meta name='twitter:description' content='Maurício Witter personal website' />
      <meta name='twitter:image' content='/icons/android-chrome-512x512.png' />
      <meta property='og:type' content='website' />
      <meta property='og:site_name' content='Maurício Witter' />
      <meta property='og:title' content='Maurício Witter' />
      <meta property='og:description' content='Maurício Witter personal website' />
      <meta property='og:image' content='/icons/android-chrome-512x512.png' />
      <meta property='og:url' content={SITE_URL} />
      <meta property='og:locale' content='en' />
      <meta property='og:locale:alternate' content='pt_BR' />
      <meta property='og:locale:alternate' content='pt_PT' />
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
