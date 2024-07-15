import bundleAnalyzer from '@next/bundle-analyzer'
import pwa from 'next-pwa'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const withPWA = pwa({
  dest: 'public',
})

const nextConfig = {
  reactStrictMode: false,
  productionBrowserSourceMaps: false,
  webpackBuildWorker: true,
  experimental: {
    nextScriptWorkers: true,
  },
  env: {
    REACT_APP_BACKEND_URL: process.env.REACT_APP_BACKEND_URL,
    ACCUWEATHER_CURRENT_CONDITIONS: process.env.ACCUWEATHER_CURRENT_CONDITIONS,
    ACCUWEATHER_API_KEY: process.env.ACCUWEATHER_API_KEY,
    ACCUWEATHER_CITY_ID: process.env.ACCUWEATHER_CITY_ID,
    LASTFM_API_KEY: process.env.LASTFM_API_KEY,
    LASTFM_USERNAME: process.env.LASTFM_USERNAME,
    SITE_URL: process.env.SITE_URL,
  },
  images: {
    domains: [
      'localhost',
      'vitals.vercel-insights.com',
      'i.imgur.com',
      'lastfm.freetls.fastly.net',
      'strapi-cms-rw.herokuapp.com',
      'i.scdn.co',
      'rwietter-strapi-cms.herokuapp.com',
      'res.cloudinary.com',
      'picsum.photos',
    ],
    formats: ['image/webp'],
  },
  // webpack: (
  //   config,
  //   { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  // ) => {
  //   if (cfg.cache && !dev) {
  //     cfg.cache = Object.freeze({
  //       type: 'memory',
  //     })
  //     cfg.cache.maxMemoryGenerations = 0
  //   }
  //   return config
  // },
}

export default withBundleAnalyzer(withPWA(nextConfig))
