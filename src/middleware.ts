import { match } from '@formatjs/intl-localematcher'
import { getCookie } from 'cookies-next'
import Negotiator from 'negotiator'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

const locales = ['en', 'pt']
const defaultLocale = 'en'
const cookieName = 'i18nlang'

// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest): string {
  const nextCookie = getCookie(cookieName, { cookies }) // Get locale from cookie]
  if (request.cookies.has(cookieName)) return request.cookies.get(cookieName)?.value ?? defaultLocale

  const acceptLang = request.headers.get('Accept-Language')  // Get accept language from HTTP headers
  if (!acceptLang) return defaultLocale

  const headers = { 'accept-language': acceptLang.split(',')[1] }   // Get match locale
  const languages = new Negotiator({ headers }).languages()
  return match(languages, locales, defaultLocale)
}

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl

  // Ignore internal paths
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  if (pathnameHasLocale) return

  // Redirect if there is no locale
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  const response = NextResponse.redirect(request.nextUrl)
  // Set locale to cookie
  response.cookies.set(cookieName, locale)
  return response
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};

/*
// Ignore internal paths
function shouldExcludeRoute(request: NextRequest) {
  const path = request.nextUrl.pathname;

  return (
    path.startsWith('/api') || //  exclude all API routes
    path.startsWith('/static') || // exclude static files
    path.includes('.') // exclude all files in the public folder
  );
}
*/
