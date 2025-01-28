'use client'

import React from 'react'

export interface I18nContextParams {
  value: Locale
  set: (locale: Locale) => void
}

export const I18nContext = React.createContext<I18nContextParams>({
  value: 'ru',
  set: () => {},
})
