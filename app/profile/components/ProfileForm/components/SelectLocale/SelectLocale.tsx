import { Skeleton } from '@/src/shared/components'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/src/shared/components/ui/select'
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

  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <Skeleton className="rounded-xl h-12 w-full border-solid border-2 border-secondary" />
  }

  const handleLocale = (locale: Locale) => {
    localeContext.set(locale)
    setCookie('locale', locale)
    router.refresh()
  }

  return (
    <Select value={localeContext.value} onValueChange={handleLocale}>
      <SelectTrigger className={`rounded-xl h-max border-solid border-2 border-secondary p-3 pr-2 outline-none transition-all focus:m-0 focus:border-[#4C94FF] ${className}`}>
        <SelectValue placeholder={t('language')} />
      </SelectTrigger>
      <SelectContent className="bg-background">
        <SelectGroup>
          <SelectLabel>{t('theme')}</SelectLabel>
          {
            LOCALES.map(locale => (
              <SelectItem key={locale} value={locale}>{LOCALES_NAMES[locale]}</SelectItem>
            ))
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
