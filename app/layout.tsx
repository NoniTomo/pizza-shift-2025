import { ThemeProvider } from '@/src/shared/context'
import localFont from 'next/font/local'
import { cookies } from 'next/headers'
import { Footer } from './(components)/Footer/Footer'
import { Providers } from './providers'
import './globals.css'

const interSans = localFont({
  src: './fonts/Inter_24pt-Regular.ttf',
  variable: '--font-inter',
  weight: '200',
})

export type RootLayoutProps = Readonly<{
  children: React.ReactNode
}>

export default async function RootLayout({ children }: RootLayoutProps) {
  const cookieStore = await cookies()
  const userRaw = cookieStore.get('user')?.value
  const locale = cookieStore.get('locale')?.value as Locale
  const user = userRaw ? JSON.parse(userRaw) as User : undefined

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${interSans.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers defaultLocale={locale} defaultUser={user}>
            {children}
          </Providers>
        </ThemeProvider>
        <Footer locale={locale} user={user} />
      </body>
    </html>
  )
}
