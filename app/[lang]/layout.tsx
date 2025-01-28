import localFont from 'next/font/local'
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
}> &
PageParams

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const lang = (await params).lang

  return (
    <html lang={lang}>
      <body className={`${interSans.variable} antialiased`}>
        <Providers defaultLocale={lang}>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
