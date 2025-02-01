import { Main } from '@/app/(components)'
import { PizzaInfo } from '@/src/components'

import { Card, CardContent } from '@/src/shared/components'
import { ROUTES } from '@/src/shared/constants'
import { getTotalPrice } from '@/src/shared/helpers'
import { useCartPizzaStorage, useLocale } from '@/src/shared/hooks'
import SuccessIcon from '@/static/images/success.png'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useOrder } from '../../context/OrderContext'

export function SuccessView() {
  const { t } = useLocale()
  const { value } = useOrder()
  const { get, clear } = useCartPizzaStorage()
  const [pizzas] = React.useState(get())
  const [totalPrice] = React.useState(getTotalPrice(get().map(cartPizza => ({ count: cartPizza.count, choosenDough: cartPizza.pizza.choosenDough, choosenSize: cartPizza.pizza.choosenSize, choosenToppings: cartPizza.pizza.choosenToppings }))))

  React.useEffect(() => {
    clear()
  }, [pizzas])

  return (
    <Main>
      <div className="flex h-full w-full max-w-[600px] flex-col justify-between gap-4">
        <div className="flex w-full flex-col flex-nowrap items-center justify-center gap-10 text-center sm:flex-row sm:justify-start">
          <Image priority src={SuccessIcon} height={70} width={70} alt={t('buttonBack')} />
          <p className="text-xl font-bold">{t('viewSuccesName')}</p>
        </div>
        <Card className="w-full py-4 px-1 border-none shadow-none sm:rounded-xl sm:border-2 sm:border-solid sm:shadow-sm">
          <CardContent className="flex flex-col gap-3">
            <div className="flex w-full flex-col gap-1">
              <p className="text-sm text-gray-400">{t('viewSuccesOrder')}</p>
              {value?.cartPizzas?.map(
                (pizza, index) =>
                  (
                    <span key={index} className="flex gap-1">
                      {`${index + 1}.`}
                      <PizzaInfo
                        className="text-text"
                        pizza={{ doughs: pizza.pizza.choosenDough, name: pizza.pizza.name, size: pizza.pizza.choosenSize, toppings: pizza.pizza.choosenToppings }}
                      />
                      {' '}
                      X
                      {pizza.count}
                    </span>
                  ),
              )}
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-gray-400">{t('viewSuccesAddress')}</p>
              <p className="text-base">
                {value?.receiverAddress?.street}
                ,
                {value?.receiverAddress?.house}
                ,
                {value?.receiverAddress?.apartment}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-gray-400">{t('viewSuccesOrderAmount')}</p>
              <p className="text-base">
                {totalPrice}
                ₽
              </p>
            </div>
            <p className="text-sm text-gray-400">{t('viewSuccesInfoSMS')}</p>
          </CardContent>
        </Card>
        <div className="flex w-full flex-col gap-3 sm:flex-row">
          <Link
            href={ROUTES.ORDER}
            className="text-text-dark h-max w-full rounded-2xl border-2 border-solid border-text-light bg-background py-4 text-center text-base shadow-none"
          >
            {t('buttonOrderDetails')}
          </Link>
          <Link
            className="h-max w-full rounded-2xl bg-primary py-4 text-center text-base text-text-light"
            href={ROUTES.PIZZA}
          >
            {t('buttonToTheMain')}
          </Link>
        </div>
      </div>
    </Main>
  )
}
