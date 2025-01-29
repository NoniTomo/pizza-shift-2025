import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

export type Tabs = 'active' | 'history'

const DEFAULT_TAB: Tabs = 'active'

export function OrderTabs() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  React.useEffect(() => {
    const tab = searchParams.get('tab')
    if (!tab)
      router.replace(`${pathname}?tab=${DEFAULT_TAB}`)
  }, [])
  return (<></>)
}
