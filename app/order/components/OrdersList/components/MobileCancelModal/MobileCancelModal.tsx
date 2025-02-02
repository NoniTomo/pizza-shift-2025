import { Main } from '@/app/(components)'
import { HeaderClient } from '@/app/(components)/Header/HeaderClient'
import { PizzaInfo } from '@/src/components'
import { Button, Card, CardContent } from '@/src/shared/components'
import { ROUTES } from '@/src/shared/constants'
import { getTotalPrice } from '@/src/shared/helpers'
import { useLocale } from '@/src/shared/hooks'
import CancelIcon from '@/static/icons/cancel.svg'
import WarningImg from '@/static/images/warning.png'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export interface MobileCancelModalProps {
  order: PizzaOrder
  closeHandler: () => void
}

export function MobileCancelModal({ order, closeHandler }: MobileCancelModalProps) {
  const { t } = useLocale()
  const createGroupKey = (pizza: OrderedPizza): string => {
    return `${pizza.id}-${pizza.name}-${pizza.size}-${pizza.doughs}-${pizza.toppings.join(',')}`
  }

  const groupedOrders = order.pizzas.reduce((acc, pizza) => {
    const key = createGroupKey(pizza)

    if (!acc[key]) {
      acc[key] = {
        pizza,
        count: 1,
      }
    }
    else {
      acc[key].count += 1
    }

    return acc
  }, {} as Record<string, { pizza: OrderedPizza, count: number }>)

  return (
    <div className="sm:hidden fixed z-50 top-0 bottom-0 bg-background">
      <HeaderClient>
        <div className="flex w-full justify-end">
          <Button
            className="border-none shadow-none bg-background hover:bg-background"
            onClick={() => closeHandler()}
          >
            <Image
              className="hover:grey-dark-filter"
              priority
              src={CancelIcon}
              height={32}
              width={32}
              alt={t('buttonBack')}
            />
          </Button>
        </div>
      </HeaderClient>
      <Main>
        <div className="flex h-full w-full max-w-[600px] flex-col justify-between gap-4">
          <div className="flex w-full flex-col flex-nowrap items-center justify-center gap-10 text-center sm:flex-row sm:justify-start">
            <Image priority src={WarningImg} height={70} width={70} alt={t('buttonBack')} />
            <p className="text-xl font-bold">{t('viewCancelOrder')}</p>
          </div>
          <Card className="w-full py-4 px-1 border-none shadow-none sm:rounded-xl sm:border-2 sm:border-solid sm:shadow-sm">
            <CardContent className="flex flex-col gap-3">
              <div className="flex w-full flex-col gap-1">
                <p className="text-sm text-secondary-secondary-2">{t('viewSuccesOrder')}</p>
                {Object.keys(groupedOrders).map(
                  (key, index) =>
                    (
                      <p key={key}>
                        {' '}
                        <span>
                          {`${index + 1}.`}
                          <PizzaInfo
                            className="text-foreground"
                            pizza={{ doughs: groupedOrders[key].pizza.doughs, name: groupedOrders[key].pizza.name, size: groupedOrders[key].pizza.size, toppings: groupedOrders[key].pizza.toppings }}
                          />
                        </span>
                        <span>
                          {' '}
                          x
                          {groupedOrders[key].count}
                        </span>
                      </p>
                    ),
                )}
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-400">{t('viewSuccesAddress')}</p>
                <p className="text-base">
                  {order.receiverAddress.street}
                  ,
                  {order.receiverAddress.house}
                  ,
                  {order.receiverAddress.apartment}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm text-gray-400">{t('viewSuccesOrderAmount')}</p>
                <p className="text-base">
                  {getTotalPrice(order.pizzas.map((pizza) => { return { count: 1, choosenDough: pizza.doughs, choosenSize: pizza.size, choosenToppings: pizza.toppings } }))}
                  ₽
                </p>
              </div>
              <p className="text-sm text-gray-400">{t('viewSuccesInfoSMS')}</p>
            </CardContent>
          </Card>
          <div className="flex w-full flex-col gap-3 sm:flex-row">
            <Link
              className="h-max w-full rounded-2xl bg-primary py-4 text-center text-base text-primary-foreground hover:bg-secondary-primary-dark"
              href={ROUTES.PIZZA}
            >
              {t('buttonToTheMain')}
            </Link>
          </div>
        </div>
      </Main>
    </div>
  )
}
