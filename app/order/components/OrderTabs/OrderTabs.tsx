'use client'

import { Tabs, TabsList, TabsTrigger } from '@/src/shared/components'
import { useLocale } from '@/src/shared/hooks'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const DEFAULT_TAB: OrdersTabs = 'active'
const TABS_ORDERS = ['active', 'history'] as OrdersTabs[]

export function OrderTabs() {
  const { t } = useLocale()
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const activeTab = searchParams.get('tab') ?? DEFAULT_TAB as OrdersTabs

  React.useEffect(() => {
    const tab = searchParams.get('tab')
    if (!tab)
      router.replace(`${pathname}?tab=${DEFAULT_TAB}`)
  }, [])

  const handleTabClick = (value: string) => router.replace(`${pathname}?tab=${value}`)

  return (
    <div className="h-max">
      <Tabs value={activeTab} onValueChange={handleTabClick}>
        <TabsList className="h-max rounded-2xl bg-text-light w-full">
          {TABS_ORDERS.map(tab => (
            <TabsTrigger
              key={tab}
              className="h-max py-2 w-full rounded-2xl text-lg lg:text-xl"
              value={tab}
            >
              {t(tab)}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  )
}
