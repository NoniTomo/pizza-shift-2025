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

export function OrderCard({ order, variant, children }: OrderCardProps) {
  const { t } = useLocale()

  return (
    <>
      <Card className={`w-full py-4 cursor-pointer px-1 ${variant === 'history' ? 'border-none shadow-none' : 'rounded-3xl border-2 border-solid shadow-sm'}`}>
        <CardContent className="flex flex-col gap-3">
          <div>
            <p className="text-sm text-gray-400">{t('viewOrderStatus')}</p>
            <div className="flex items-center gap-3">
              <div className={`h-3 w-3 rounded-full ${order.status === 3 && 'bg-green-500'} ${order.status < 3 && 'bg-yellow-500'} ${order.status === 4 && 'bg-red-500'}`}></div>
              <div>{t(`orderStatus${order.status}`)}</div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm text-gray-400">{t('viewOrderAddress')}</p>
            <p className="text-base">
              {order.receiverAddress?.street}
              ,
              {order.receiverAddress?.house}
              ,
              {order.receiverAddress?.apartment}
            </p>
          </div>
          <div className="flex w-full flex-col gap-1">
            <p className="text-sm text-gray-400">{t('viewOrderInOrder')}</p>
            {order.pizzas.map(
              (pizza, index) =>
                (
                  <span key={index} className="flex gap-1">
                    {`${index + 1}.`}
                    <PizzaInfo
                      className="text-text"
                      pizza={{
                        doughs: pizza.doughs,
                        size: pizza.size,
                        toppings: pizza.toppings,
                        name: pizza.name,
                      }}
                    />
                  </span>
                ),
            )}
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm text-gray-400">{t('viewOrderOrderAmount')}</p>
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
