import { useGetPizzaOrdersQuery } from '@/src/shared/api/hooks/useGetPizzaOrdersQuery'
import { usePutPizzaOrdersCancelMutation } from '@/src/shared/api/hooks/usePutPizzaOrdersCancelMutation'
import { useMediaQuery } from '@siberiacancode/reactuse'
import { useSearchParams } from 'next/navigation'
import React from 'react'

export function useOrdersList() {
  const searchParams = useSearchParams()
  const isMobile = useMediaQuery('(max-width: 640px)')

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
    else await getPizzaOrdersQuery.refetch()
    setOpen(false)
  }

  const closeDisplayMobileMessage = async () => {
    setDisplayMobileMessage(false)
    await getPizzaOrdersQuery.refetch()
  }

  const historyOrdersList = orders.filter(order => order.status === 4 || order.status === 3) ?? []
  const activeOrdersList = orders.filter(order => order.status < 3) ?? []

  React.useEffect(() => {
    if (getPizzaOrdersQuery.data?.data)
      setOrders(getPizzaOrdersQuery.data?.data.orders)
  }, [getPizzaOrdersQuery.data?.data])

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
    functions: { handleCancelOrder, setOrders, setDisplayMobileMessage, setOpen, closeDisplayMobileMessage },
  }
}
