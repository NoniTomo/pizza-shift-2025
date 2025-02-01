'use client'

// import { AuthCheck } from '@/src/components'
import { I18nProvider, UserProvider } from '@/src/shared/context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

const queryClient = new QueryClient()

export interface ProvidersProps {
  children: React.ReactNode
  defaultLocale?: Locale
  defaultUser?: User
}

export function Providers({ children, defaultLocale, defaultUser }: ProvidersProps) {
  return (

    <I18nProvider defaultLocale={defaultLocale}>
      <QueryClientProvider client={queryClient}>

        <UserProvider defaultUser={defaultUser}>
          {children}
        </UserProvider>
      </QueryClientProvider>
    </I18nProvider>
  )
}
