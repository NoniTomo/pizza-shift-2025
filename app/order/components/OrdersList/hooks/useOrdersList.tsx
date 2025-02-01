import { useGetPizzaOrdersQuery } from '@/src/shared/api/hooks/useGetPizzaOrdersQuery'
import { usePutPizzaOrdersCancelMutation } from '@/src/shared/api/hooks/usePutPizzaOrdersCancelMutation'
import { useMediaQuery } from '@siberiacancode/reactuse'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const HISTORY_TAB: OrdersTabs = 'history'

export function useOrdersList() {
  const searchParams = useSearchParams()
  const isMobile = useMediaQuery('(max-width: 640px)')
  const router = useRouter()
  const pathname = usePathname()

  const activeTab = searchParams.get('tab') as OrdersTabs
  const [orders, setOrders] = React.useState<PizzaOrder[]>([])

  const getPizzaOrdersQuery = useGetPizzaOrdersQuery()
  const putPizzaOrdersCancelMutation = usePutPizzaOrdersCancelMutation()

  const [open, setOpen] = React.useState(false)
  const [displayMobileMessage, setDisplayMobileMessage] = React.useState(false)

  const handleCancelOrder = async (orderId: string) => {
    await putPizzaOrdersCancelMutation.mutateAsync({
      params: { orderId },
    })
    if (isMobile)
      setDisplayMobileMessage(true)
    setOpen(false)
    router.replace(`${pathname}?tab=${HISTORY_TAB}`)
  }

  const historyOrdersList = orders.filter(order => order.status === 4 || order.status === 3) ?? []
  const activeOrdersList = orders.filter(order => order.status < 3) ?? []

  React.useEffect(() => {
    if (getPizzaOrdersQuery.data?.data)
      setOrders(getPizzaOrdersQuery.data?.data.orders)
  }, [putPizzaOrdersCancelMutation.isSuccess, getPizzaOrdersQuery.data?.data])

  return {
    state: {
      open,
      displayMobileMessage,
      activeTab,
      activeOrdersList,
      historyOrdersList,
      isLoading: getPizzaOrdersQuery.isPending,
      isNotActiveOrder: !getPizzaOrdersQuery.isPending && activeOrdersList.length === 0,
      isNotHistoryOrder: !getPizzaOrdersQuery.isPending && historyOrdersList.length === 0,
    },
    functions: { handleCancelOrder, setOrders, setDisplayMobileMessage, setOpen },
  }
}
