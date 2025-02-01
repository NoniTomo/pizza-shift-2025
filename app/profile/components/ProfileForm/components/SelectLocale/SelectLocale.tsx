import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/shared/components/ui/select'
import { LOCALES, LOCALES_NAMES } from '@/src/shared/constants'
import { useI18n } from '@/src/shared/context'
import { useLocale } from '@/src/shared/hooks'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import React from 'react'

export interface SelectLocaleProps {
  className?: string
}

export function SelectLocale({ className }: SelectLocaleProps) {
  const router = useRouter()
  const localeContext = useI18n()
  const { t } = useLocale()

  const handleLocale = (locale: Locale) => {
    localeContext.set(locale)
    setCookie('locale', locale)
    router.refresh()
  }

  return (
    <Select value={localeContext.value} onValueChange={handleLocale}>
      <SelectTrigger className={`rounded-xl h-max border-2 border-solid border-gray-300 p-3 pr-2 outline-none transition-all focus:m-0 focus:border-[#4C94FF] ${className}`}>
        <SelectValue placeholder={t('language')} />
      </SelectTrigger>
      <SelectContent className="bg-background">
        {
          LOCALES.map(locale => (
            <SelectItem key={locale} value={locale}>{LOCALES_NAMES[locale]}</SelectItem>
          ))
        }
      </SelectContent>
    </Select>
  )
}
