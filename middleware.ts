import type { NextRequest } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { NextResponse } from 'next/server'
import { getUsersSession } from './src/shared/api/requests'
import { PROTECTED_ROUTES, ROUTES } from './src/shared/constants'
import { LOCALES } from './src/shared/constants/locales'

function getLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get('accept-language')
  const languages = (acceptLanguage) ? new Negotiator({ headers: { 'accept-language': acceptLanguage } }).languages() : []
  const defaultLocale = 'ru'

  const lg = match(languages, LOCALES, defaultLocale)

  return lg
}

export async function middleware(request: NextRequest) {
  const fetchDest = request.headers.get('sec-fetch-dest') || ''

  if (fetchDest === 'style' || fetchDest === 'image') {
    return NextResponse.next()
  }

  const cookies = request.cookies

  const token = cookies.get('token')?.value
  const localeClient = cookies.get('locale')?.value

  const response = NextResponse.next()

  const locale = localeClient || getLocale(request)
  response.cookies.set('locale', locale)

  if (token) {
    const responseSession = await getUsersSession({ config: { headers: { Authorization: `Bearer ${token}` } } })

    if (responseSession?.data.success)
      response.cookies.set('user', JSON.stringify(responseSession.data.user))
    response.cookies.set('token', token)

    return response
  }
  else if (PROTECTED_ROUTES.includes(request.nextUrl.pathname) || request.nextUrl.pathname.includes(ROUTES.ORDER)) {
    const responseRedirect = NextResponse.redirect(new URL(ROUTES.PIZZA, request.url))
    responseRedirect.cookies.set('locale', locale)
    return responseRedirect
  }

  return response
}
