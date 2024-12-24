import bundleAnalyzer from '@next/bundle-analyzer'
import pwa from 'next-pwa'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const withPWA = pwa({
  dest: 'public',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  productionBrowserSourceMaps: false,
  transpilePackages: ['next-mdx-remote'],
  experimental: {
    nextScriptWorkers: true,
    workerThreads: false,
    optimizeCss: true,
    swcMinify: true,
    parallelServerCompiles: false,
    cssChunking: 'strict',
  },
  env: {
    REACT_APP_BACKEND_URL: process.env.REACT_APP_BACKEND_URL,
    ACCUWEATHER_CURRENT_CONDITIONS: process.env.ACCUWEATHER_CURRENT_CONDITIONS,
    ACCUWEATHER_API_KEY: process.env.ACCUWEATHER_API_KEY,
    ACCUWEATHER_CITY_ID: process.env.ACCUWEATHER_CITY_ID,
    LASTFM_API_KEY: process.env.LASTFM_API_KEY,
    LASTFM_USERNAME: process.env.LASTFM_USERNAME,
    PUBLIC_SITE_URL: process.env.PUBLIC_SITE_URL,
    ENV: process.env.ENV,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'i.imgur.com',
      },
      {
        hostname: 'localhost',
      },
      {
        hostname: 'vitals.vercel-insights.com',
      },
      {
        hostname: 'lastfm.freetls.fastly.net',
      },
      {
        hostname: 'i.scdn.co',
      },
      {
        hostname: 'res.cloudinary.com',
      },
      {
        hostname: 'picsum.photos',
      },
    ],
    formats: ['image/webp'],
  },
}

export default withBundleAnalyzer(withPWA(nextConfig))
