import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { NextResponse } from 'next/server'
import { ROUTES } from './src/shared/constants'

const LOCALES = ['en', 'ru']
const DEFAULT_PATH = ROUTES.PIZZA // '/[LOCALES]/pizza'

function getLocale(request) {
  const languages = (request.headers.has('accept-language')) ? new Negotiator({ headers: { 'accept-language': request.headers.get('accept-language') } }).languages() : []
  const defaultLocale = ['ru']

  const lg = match(languages, ['en', 'ru'], defaultLocale)

  return lg
}

export function middleware(request) {
  const { pathname } = request.nextUrl

  const pathnameHasLocale = LOCALES.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  if (pathnameHasLocale)
    return

  const locale = getLocale(request)

  if (LOCALES.some(locale => pathname === `/${locale}`)) {
    request.nextUrl.pathname = `/${locale}/${DEFAULT_PATH}`
    return NextResponse.redirect(request.nextUrl)
  }

  request.nextUrl.pathname = `/${locale}/${pathname !== '/' ? pathname : DEFAULT_PATH}`

  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    '/((?!_next).*)',
  ],
}
