'use client'

import { DialogContent, DialogTitle, DialogTrigger } from '@/src/shared/components'
import { useCartPizzaStorage, useLocale } from '@/src/shared/hooks'
import { Dialog } from '@radix-ui/react-dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import React from 'react'
import { useStage } from '../OrderModal/context/StageContext'
import { FooterCart } from './components/FooterCart/FooterCart'
import { useOrder } from './context/OrderContext'
import { Stepper } from './Stepper'

export function OrderModal() {
  const { modalState } = useStage()
  const { t } = useLocale()
  const { value } = useOrder()
  const { getTotalPrice } = useCartPizzaStorage()

  if (!getTotalPrice(value?.cartPizzas ?? []))
    return <h1 className="font-inter text-3xl font-bold text-text">{t('cartEmpty')}</h1>

  return (
    <>
      <Dialog open={modalState}>
        <DialogTrigger asChild>
          <FooterCart cost={getTotalPrice(value?.cartPizzas ?? [])} />
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
