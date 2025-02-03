import { Skeleton } from '@/src/shared/components'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/src/shared/components/ui/select'
import { useLocale } from '@/src/shared/hooks'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import React from 'react'

export interface SelectThemeProps {
  className?: string
}

export function SelectTheme({ className }: SelectThemeProps) {
  const { theme, setTheme } = useTheme()
  const { t } = useLocale()

  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <Skeleton className="rounded-xl h-12 w-full border-solid border-2 border-secondary" />
  }

  return (
    <Select value={theme} onValueChange={theme => setTheme(theme)}>
      <SelectTrigger className={`rounded-xl h-max border-solid border-2 border-secondary p-3 pr-2 outline-none transition-all focus:m-0 focus:border-[#4C94FF] ${className}`}>
        <SelectValue defaultValue="light" placeholder={t('theme')} />
      </SelectTrigger>
      <SelectContent className="bg-background">
        <SelectGroup>
          <SelectLabel>{t('theme')}</SelectLabel>
          <SelectItem value="light">
            <div className="flex flex-row gap-3">
              <Sun className="h-[1.2rem] w-[1.2rem]" />
              <span>{t('theme.light')}</span>
            </div>
          </SelectItem>
          <SelectItem value="dark">
            <div className="flex flex-row gap-3">
              <Moon className="h-[1.2rem] w-[1.2rem]" />
              <span>{t('theme.dark')}</span>
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
