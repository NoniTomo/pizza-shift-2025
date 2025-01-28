'use client'

import { I18nProvider, UserProvider } from '@/src/shared/context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

const queryClient = new QueryClient()

export interface ProvidersProps {
  children: React.ReactNode
  defaultLocale?: Locale
}

export function Providers({ children, defaultLocale }: ProvidersProps) {
  return (
    <I18nProvider defaultLocale={defaultLocale}>
      <QueryClientProvider client={queryClient}>
        <UserProvider>{children}</UserProvider>
      </QueryClientProvider>
    </I18nProvider>
  )
}
