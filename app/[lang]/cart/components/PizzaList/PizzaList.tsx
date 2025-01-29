'use client'

import type { AddProps, RemoveProps } from '@/src/shared/hooks'
import { Button, Card, CardContent, PizzaInfo, Separator } from '@/src/shared/components'

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

  return (
    <div className="flex flex-col gap-5 pb-40 sm:pb-0">
      {value?.cartPizzas?.map((cartPizza, index) => (
        <div key={index} className="flex flex-col gap-5">
          <Card className="border-none p-0 shadow-none">
            <CardContent>
              <div className="flex items-center justify-center gap-5">
                <Image
                  height={80}
                  width={80}
                  priority
                  src={`${API_URL}/${cartPizza.pizza.imgSrc}`}
                  alt={cartPizza.pizza.name}
                />
                <div className="text-inter rows-min grid-flow-rows-3 grid grid-cols-6 gap-3">
                  <h3 className="col-span-6 m-auto w-full font-semibold md:col-span-1 md:row-span-3 md:row-start-1 md:text-left">
                    {cartPizza.pizza.name}
                  </h3>
                  <p className="col-span-6 flex flex-col gap-1 m-auto w-full md:col-span-2 md:col-start-2 md:row-span-3 md:row-start-1 md:text-left">
                    <span>
                      {cartPizza.pizza.description}
                      {' '}
                    </span>
                    <span><PizzaInfo pizza={cartPizza} /></span>
                  </p>
                  <div className="col-span-2 m-auto flex w-full max-w-20 flex-nowrap overflow-hidden rounded-xl text-black md:col-span-1 md:row-span-3">
                    <Button
                      size="sm"
                      className="w-1/3 rounded-none bg-text-light text-base shadow-none hover:bg-secondary"
                      onClick={() =>
                        handleDelete({
                          doughs: cartPizza.pizza.doughs,
                          pizzaId: cartPizza.pizza.id,
                          size: cartPizza.pizza.size,
                          toppings: cartPizza.pizza.toppings,
                        })}
                    >
                      -
                    </Button>
                    <div className="flex w-1/3 items-center justify-center rounded-none bg-text-light text-base">
                      <p>{cartPizza.count}</p>
                    </div>
                    <Button
                      size="sm"
                      className="w-1/3 rounded-none bg-text-light text-base shadow-none hover:bg-secondary"
                      onClick={() =>
                        handleAdd({
                          doughs: cartPizza.pizza.doughs,
                          pizzaId: cartPizza.pizza.id,
                          size: cartPizza.pizza.size,
                          toppings: cartPizza.pizza.toppings,
                          description: cartPizza.pizza.description,
                          imgSrc: cartPizza.pizza.imgSrc,
                          name: cartPizza.pizza.name,
                        })}
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    size="sm"
                    className="col-span-2 m-auto p-0 text-sm text-secondary underline hover:text-text md:col-span-1 md:row-span-3"
                    variant="link"
                  >
                    {t('buttonChanged')}
                  </Button>
                  <p className="col-span-2 m-auto md:col-span-1 md:row-span-3">
                    {cartPizza.pizza.price}
                    ₽
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          {index !== (value.cartPizzas ?? []).length - 1 && (
            <Separator className="h-[2px] bg-text-light" />
          )}
        </div>
      ))}
    </div>
  )
}
