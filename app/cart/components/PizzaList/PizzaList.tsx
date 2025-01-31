'use client'

import type { AddProps, RemoveProps } from '@/src/shared/hooks'
import { PizzaCardModal, PizzaInfo } from '@/src/components'

import { Button, Card, CardContent, Separator } from '@/src/shared/components'
import { API_URL } from '@/src/shared/constants'
import { useCartPizzaStorage, useLocale } from '@/src/shared/hooks'
import Image from 'next/image'
import React from 'react'
import { useOrder } from '../OrderModal/context/OrderContext'

export function PizzaList() {
  const storage = useCartPizzaStorage()
  const { value, set } = useOrder()
  const { t } = useLocale()

  const handleDelete = (pizza: RemoveProps) => {
    storage.remove(pizza)
    set({ cartPizzas: storage.get() })
  }

  const handleAdd = (pizza: AddProps) => {
    storage.add(pizza)

    set({ cartPizzas: storage.get() })
  }

  if (!value?.cartPizzas?.length)
    return <h1 className="font-inter text-3xl font-bold text-text">{t('cartEmpty')}</h1>

  return (
    <div className="flex flex-col gap-5 pb-40 sm:pb-0">
      {value?.cartPizzas?.map((cartPizza, index) => (
        <div key={index} className="flex flex-col gap-5">
          {index > 0 && (<Separator className="h-[2px] bg-secondary" />)}
          <Card className="border-none p-0 shadow-none">
            <CardContent>
              <div className="flex items-center justify-center gap-5">
                <Image
                  height={80}
                  width={80}
                  priority
                  src={`${API_URL}/${cartPizza.pizza.img}`}
                  alt={cartPizza.pizza.name}
                />
                <div className="text-inter w-full rows-min grid-flow-rows-3 grid grid-cols-6 gap-3">
                  <h3 className="col-span-6 m-auto w-full font-semibold md:col-span-1 md:row-span-3 md:row-start-1 md:text-left">
                    {cartPizza.pizza.name}
                  </h3>
                  <p className="col-span-6 flex flex-col gap-1 m-auto w-full md:col-span-2 md:col-start-2 md:row-span-3 md:row-start-1 md:text-left">
                    <span>
                      <PizzaInfo pizza={{ doughs: cartPizza.pizza.choosenDough, name: cartPizza.pizza.name, size: cartPizza.pizza.choosenSize, toppings: cartPizza.pizza.choosenToppings }} />
                    </span>
                  </p>
                  <div className="col-span-2 m-auto bg-secondary w-full flex max-w-20 flex-nowrap overflow-hidden rounded-xl text-secondary-secondary-foreground md:col-span-1 md:row-span-3">
                    <Button
                      size="sm"
                      className="w-1/3 rounded-none bg-secondary text-base shadow-none hover:bg-secondary-secondary-dark"
                      onClick={() =>
                        handleDelete({
                          choosenDough: cartPizza.pizza.choosenDough,
                          id: cartPizza.pizza.id,
                          choosenSize: cartPizza.pizza.choosenSize,
                          choosenToppings: cartPizza.pizza.choosenToppings,
                        })}
                    >
                      -
                    </Button>
                    <div className="flex w-1/3 items-center justify-center rounded-none text-base">
                      <p>{cartPizza.count}</p>
                    </div>
                    <Button
                      size="sm"
                      className="w-1/3 rounded-none text-base bg-secondary shadow-none hover:bg-secondary-secondary-dark"
                      onClick={() =>
                        handleAdd({
                          id: cartPizza.pizza.id,
                          choosenDough: cartPizza.pizza.choosenDough,
                          choosenSize: cartPizza.pizza.choosenSize,
                          choosenToppings: cartPizza.pizza.choosenToppings,
                          img: cartPizza.pizza.img,
                          name: cartPizza.pizza.name,
                          dough: cartPizza.pizza.dough,
                          sizes: cartPizza.pizza.sizes,
                          toppings: cartPizza.pizza.toppings,
                        })}
                    >
                      +
                    </Button>
                  </div>
                  <PizzaCardModal
                    type="change"
                    className="col-span-2 m-auto p-0 text-sm underline md:col-span-1 md:row-span-3"
                    pizza={cartPizza.pizza}
                    action={() => set({ cartPizzas: storage.get() })}
                    triggerButton={(
                      <Button
                        size="sm"
                        variant="link"
                        className="hover:text-text text-secondary-secondary-2"
                      >
                        {t('buttonChanged')}
                      </Button>
                    )}
                  />

                  <p className="col-span-2 m-auto md:col-span-1 md:row-span-3">
                    {cartPizza.pizza.price}
                    ₽
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  )
}
