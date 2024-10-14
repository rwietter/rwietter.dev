import { match } from '@formatjs/intl-localematcher'
import { getCookie } from 'cookies-next'
import Negotiator from 'negotiator'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

const locales = ['en', 'pt']
const defaultLocale = 'pt'
const cookieName = 'i18nlang'

// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest): string {
  // Get locale from cookie]
  const nextCookie = getCookie(cookieName, { cookies })
  if (request.cookies.has(cookieName))
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    return request.cookies.get(cookieName)!.value
  // Get accept language from HTTP headers
  const acceptLang = request.headers.get('Accept-Language')
  if (!acceptLang) return defaultLocale
  // Get match locale
  const headers = { 'accept-language': acceptLang }
  const languages = new Negotiator({ headers }).languages()
  return match(languages, locales, defaultLocale)
}

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/_next')) return NextResponse.next()

  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  if (pathnameHasLocale) return

  // Redirect if there is no locale
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  console.log(request.nextUrl.pathname)
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  const response = NextResponse.redirect(request.nextUrl)
  // Set locale to cookie
  response.cookies.set(cookieName, locale)
  return response
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
}
