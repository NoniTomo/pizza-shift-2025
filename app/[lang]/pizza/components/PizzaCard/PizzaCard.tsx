'use client'

import {
  Button,
  Card,
  CardContent,
  CardFooter,
} from '@/src/shared/components'
import { API_URL } from '@/src/shared/constants'
import { useLocale } from '@/src/shared/hooks'

import Image from 'next/image'
import React from 'react'
import { PizzaCardModal } from '../PizzaCardModal/PizzaCardModal'

export interface PizzaCardProps {
  pizza: Pizza
  className?: string
}

export function PizzaCard({ pizza, className = '' }: PizzaCardProps) {
  const { t } = useLocale()

  return (
    <Card className={`flex flex-col h-full justify-between gap-2 border-none shadow-none ${className}`}>
      <CardContent className="p-2 grid grid-cols-5 auto-cols-min rounded-xl hover:bg-text-light sm:p-0 sm:hover:bg-transparent sm:flex sm:flex-col items-center gap-2 font-inter">
        <Image className="col-span-2" priority src={`${API_URL}${pizza.img}`} alt={pizza.name} height={240} width={240} />
        <div className="flex flex-col gap-2 col-span-3">
          <h3 className="text-balance text-left text-base sm:text-xl font-bold">{pizza.name}</h3>
          <p className="text-balance text-left text-sm sm:text-base">{pizza.description}</p>
          <span className=" block sm:hidden text-left text-base sm:text-xl font-bold">
            {t('costPizza', { cost: String(pizza.sizes[0].price) })}
          </span>
        </div>
      </CardContent>
      <CardFooter className="hidden sm:block sm:flex-col p-0 gap-1">
        <span className="hidden sm:block w-full text-left text-xl font-bold">
          {t('costPizza', { cost: String(pizza.sizes[0].price) })}
        </span>
        <PizzaCardModal
          className="w-full"
          pizza={pizza}
          triggerButton={(
            <Button className="h-max w-full rounded-2xl bg-primary py-4 text-base text-text-light">
              {t('buttonSelected')}
            </Button>
          )}
        />
      </CardFooter>
    </Card>
  )
}
