'use client'

import { PizzaInfo } from '@/src/components'
import { Card, CardContent } from '@/src/shared/components'
import { getTotalPrice } from '@/src/shared/helpers'
import { useLocale } from '@/src/shared/hooks'
import React from 'react'

export interface OrderCardProps {
  order: PizzaOrder
  variant: 'history' | 'active'
  children: React.ReactNode
}

function createGroupKey(pizza: OrderedPizza): string {
  return `${pizza.id}-${pizza.name}-${pizza.size}-${pizza.doughs}-${pizza.toppings.join(',')}`
}

export function OrderCard({ order, variant, children }: OrderCardProps) {
  const { t } = useLocale()

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
    <>
      <Card className={`w-full py-4 cursor-pointer px-1 ${variant === 'history' ? 'border-none shadow-none' : 'rounded-3xl border-2 border-solid border-secondary shadow-sm'}`}>
        <CardContent className="flex flex-col gap-3 px-4 py-0">
          <div>
            <p className="text-sm text-secondary-secondary-2">{t('viewOrderStatus')}</p>
            <div className="flex items-center gap-3">
              <div className={`h-3 w-3 rounded-full ${order.status === 3 && 'bg-green-500'} ${order.status < 3 && 'bg-yellow-500'} ${order.status === 4 && 'bg-red-500'}`}></div>
              <div>{t(`orderStatus${order.status}`)}</div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm text-secondary-secondary-2">{t('viewOrderAddress')}</p>
            <p className="text-base">
              {order.receiverAddress?.street}
            </p>
          </div>
          <div className="flex w-full flex-col gap-1">
            <p className="text-sm text-secondary-secondary-2">{t('viewOrderInOrder')}</p>
            {Object.keys(groupedOrders).map(
              (key, index) =>
                (
                  <p key={key}>
                    <span>
                      {`${index + 1}.`}
                      <PizzaInfo
                        className="text-foreground"
                        pizza={{
                          doughs: groupedOrders[key].pizza.doughs,
                          size: groupedOrders[key].pizza.size,
                          toppings: groupedOrders[key].pizza.toppings,
                          name: groupedOrders[key].pizza.name,
                        }}
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
            <p className="text-sm text-secondary-secondary-2 ">{t('viewOrderOrderAmount')}</p>
            <p className="text-base">
              {getTotalPrice(order.pizzas.map((pizza) => { return { count: 1, choosenDough: pizza.doughs, choosenSize: pizza.size, choosenToppings: pizza.toppings } }))}
              ₽
            </p>
          </div>

          {children}

        </CardContent>
      </Card>
    </>
  )
}
