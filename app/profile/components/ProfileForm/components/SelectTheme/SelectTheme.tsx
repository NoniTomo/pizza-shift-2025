import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/shared/components/ui/select'
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

  return (
    <Select value={theme} onValueChange={theme => setTheme(theme)}>
      <SelectTrigger className={`rounded-xl h-max border-2 border-solid border-gray-300 p-3 pr-2 outline-none transition-all focus:m-0 focus:border-[#4C94FF] ${className}`}>
        <SelectValue placeholder={t('language')} />
      </SelectTrigger>
      <SelectContent className="bg-background">
        <SelectItem value="light">
          <div className="flex flex-row gap-3">
            <Sun className="h-[1.2rem] w-[1.2rem]" />
            <span>{t('lightTheme')}</span>
          </div>
        </SelectItem>
        <SelectItem value="dark">
          <div className="flex flex-row gap-3">
            <Moon className="h-[1.2rem] w-[1.2rem]" />
            <span>{t('darkTheme')}</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
