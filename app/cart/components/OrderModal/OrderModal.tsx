'use client'

import { DialogContent, DialogTitle, DialogTrigger } from '@/src/shared/components'
import { getTotalPrice } from '@/src/shared/helpers'
import { Dialog } from '@radix-ui/react-dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import React from 'react'
import { FooterCart } from './components/FooterCart/FooterCart'
import { useOrder } from './context/OrderContext'
import { useStage } from './context/StageContext'
import { Stepper } from './Stepper'

export function OrderModal() {
  const { modalState } = useStage()
  const { value } = useOrder()

  if (!value?.cartPizzas?.length)
    return null

  return (
    <>
      <Dialog open={modalState}>
        <DialogTrigger asChild>
          <FooterCart cost={getTotalPrice(value?.cartPizzas?.map((cartPizza) => { return { count: cartPizza.count, choosenDough: cartPizza.pizza.choosenDough, choosenSize: cartPizza.pizza.choosenSize, choosenToppings: cartPizza.pizza.choosenToppings } }) ?? [])} />
        </DialogTrigger>
        <DialogContent className="relative flex h-full max-w-[100vw] flex-col gap-0 bg-background p-0">
          <VisuallyHidden>
            <DialogTitle>Create Order</DialogTitle>
          </VisuallyHidden>
          <Stepper />
        </DialogContent>
      </Dialog>
    </>
  )
}
