import { Main } from '@/app/[lang]/(components)'
import { Card, CardContent } from '@/src/shared/components'

import { ROUTES } from '@/src/shared/constants'
import { useLocale } from '@/src/shared/hooks'
import SuccessIcon from '@/static/images/success.png'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
// import { PizzaInfo } from '@/features/PizzaInfo/PizzaInfo'
import { useOrder } from '../../context/OrderContext'

export function SuccessView() {
  const { t } = useLocale()
  const { value } = useOrder()
  return (
    <Main>
      <div>
        <div className="flex h-full w-full max-w-[600px] flex-col justify-between gap-4 p-4">
          <div className="flex max-w-xl flex-col items-start gap-10">
            <div className="flex w-full flex-col flex-nowrap items-center justify-center gap-10 text-center sm:flex-row sm:justify-start">
              <Image priority src={SuccessIcon} height={70} width={70} alt={t('buttonBack')} />
              <p className="text-xl font-bold">{t('viewSuccesName')}</p>
            </div>
            <Card className="w-full border-none p-5 shadow-none sm:rounded-xl sm:border-2 sm:border-solid sm:shadow-sm">
              <CardContent>
                <div className="flex w-full flex-col gap-2">
                  <p className="text-sm text-gray-400">{t('viewSuccesOrder')}</p>
                  {/* {value.pizzaIds.map(
                (id) =>
                  pizzas[id] && (
                    <PizzaInfo
                      key={id}
                      doughId={pizzas[id].doughId}
                      pizzaId={pizzas[id].pizzaId}
                      sizeId={pizzas[id].sizeId}
                      toppingIds={pizzas[id].toppingIds}
                    />
                  )
              )} */}
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-gray-400">{t('viewSuccesAddress')}</p>
                  <p className="text-base">
                    {value?.receiverAddress?.street}
                    ,
                    {value?.receiverAddress?.house}
                    ,
                    {value?.receiverAddress?.apartment}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-gray-400">{t('viewSuccesOrderAmount')}</p>
                  <p className="text-base">
                    {/* {price.price} */}
                    {' '}
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
        </div>
      </div>
    </Main>
  )
}
