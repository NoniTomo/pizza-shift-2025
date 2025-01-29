'use client'

import React from 'react'

import { I18nContext } from './I18nContext'

export interface I18nProviderProps {
  children: React.ReactNode
  defaultLocale?: Locale
}

export function I18nProvider({ children, defaultLocale = 'ru' }: I18nProviderProps) {
  const [locale, setLocale] = React.useState<Locale>(defaultLocale)

  const value = React.useMemo(() => ({ value: locale, set: setLocale }), [locale])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
