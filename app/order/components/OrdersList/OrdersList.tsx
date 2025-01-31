'use client'

import { ModalCancel, OrderCard } from '@/src/components'
import { Button, Separator, Skeleton } from '@/src/shared/components'
import { ROUTES } from '@/src/shared/constants'
import { useLocale } from '@/src/shared/hooks'
import Link from 'next/link'
import { MobileCancelModal } from './components/MobileCancelModal/MobileCancelModal'
import { useOrdersList } from './hooks/useOrdersList'

export function OrdersList() {
  const { state, functions } = useOrdersList()
  const { t } = useLocale()

  if (state.isLoading) {
    return Array.from(Array.from({ length: 3 }), (_, index) => <Skeleton key={index} className="w-full h-[150px] rounded-2xl" />,
    )
  }

  if (state.activeTab === 'active') {
    return (
      <ul className="flex flex-col gap-3">
        {!state.isNotActiveOrder
        && state.activeOrdersList.map(order => (
          <li key={order._id}>
            {state.displayMobileMessage
            && (
              <MobileCancelModal
                closeHandler={() => functions.setDisplayMobileMessage(false)}
                order={order}
              />
            )}
            <OrderCard variant="active" order={order}>
              <ModalCancel
                buttonBottom={{
                  text: t('buttonNotCancel'),
                  action: () => functions.setOpen(false),
                }}
                buttonTop={{
                  text: t('buttonCancel'),
                  action: async () => await functions.handleCancelOrder(order._id),
                }}
                text={t('cancelOrderModalQuestion')}
                open={state.open}
                setOpen={functions.setOpen}
              >
                <Button className="h-max w-full rounded-2xl bg-primary py-4 sm:col-start-2">
                  {t('buttonCancelTheOrder')}
                </Button>
              </ModalCancel>
            </OrderCard>
          </li>
        ))}
        {state.isNotActiveOrder
        && (
          <div className="flex flex-col gap-3">
            <h3 className="font-inter text-xl font-bold ">{t('userIsNotOrders')}</h3>
            <Link href={ROUTES.PIZZA} className="h-max text-center bg-primary w-max px-10 rounded-2xl py-4 sm:col-start-2">
              {t('buttonToPizzas')}
            </Link>
          </div>
        )}
      </ul>
    )
  }

  if (state.activeTab === 'history') {
    return (
      <ul className="flex flex-col gap-3">
        {state.activeTab === 'history' && (
          <>
            {!state.isNotHistoryOrder
            && state.historyOrdersList.map((order, index) => (
              <li key={order._id} className="flex flex-col gap-3">
                {index > 0 && (<Separator className="h-[2px] bg-secondary" />)}
                <OrderCard
                  variant="history"
                  order={order}
                >
                  <Link
                    className="font-inter text-base bg-background font-bold hover:underline shadow-none border-none"
                    href={ROUTES.ORDER_ID(order._id)}
                  >
                    {t('buttonMoreDetails')}
                  </Link>
                </OrderCard>
              </li>
            ))}
            {state.isNotHistoryOrder && (
              <div className="flex flex-col gap-3">
                <h3 className="font-inter text-xl font-bold ">{t('userIsNotOrders')}</h3>
                <Link href={ROUTES.PIZZA} className="h-max text-center w-max px-10 rounded-2xl bg-primary py-4 text-base -light sm:col-start-2">
                  {t('buttonToPizzas')}
                </Link>
              </div>
            )}
          </>
        )}
      </ul>
    )
  }
}
