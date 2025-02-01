'use client'

import { Button } from '@/src/shared/components'
import { DEFAULT_DOUGHS_LIST, DEFAULT_SIZES_LIST, DEFAULT_TOPPINGS_LIST, ROUTES } from '@/src/shared/constants'
import { useCartPizzaStorage, useLocale } from '@/src/shared/hooks'
import { useRouter } from 'next/navigation'

export interface ButtonReorderProps {
  order: PizzaOrder
}

export function ButtonReorder({ order }: ButtonReorderProps) {
  const pizzaStorage = useCartPizzaStorage()
  const { t } = useLocale()
  const router = useRouter()

  const handleReorder = () => {
    order.pizzas.map(orderedPizza => pizzaStorage.add({
      id: orderedPizza.id,
      choosenDough: orderedPizza.doughs,
      choosenSize: orderedPizza.size,
      choosenToppings: orderedPizza.toppings.map(topping => ({
        ...topping,
        img: '',
      })),
      img: '',
      name: orderedPizza.name,
      dough: DEFAULT_DOUGHS_LIST,
      sizes: DEFAULT_SIZES_LIST,
      toppings: DEFAULT_TOPPINGS_LIST,

    }))
    router.push(ROUTES.CART)
  }

  return (
    <Button onClick={() => handleReorder()} className="h-max w-full rounded-2xl bg-primary py-4 text-base text-text-light sm:col-start-2 text-primary-foreground hover:bg-secondary-primary-dark">
      {t('buttonReorder')}
    </Button>
  )
}
