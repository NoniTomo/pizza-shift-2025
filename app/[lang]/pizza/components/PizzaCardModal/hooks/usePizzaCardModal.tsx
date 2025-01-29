import React from 'react'

export interface usePizzaCardProps {
  pizza: Pizza
}

export function usePizzaCardModal({ pizza }: usePizzaCardProps) {
  const [modal, setModal] = React.useState(false)
  const [size, setSize] = React.useState<PizzaSize>(pizza.sizes[0])
  const [doughs, setDoughs] = React.useState<PizzaDough>(pizza.doughs[0])
  const [toppings, setTopping] = React.useState<PizzaIngredient[]>([])

  const handleDoughs = (value: string) => {
    const doughs = pizza.doughs.find(dough => dough.name === value) as PizzaDough
    setDoughs(doughs)
  }

  const handleSize = (value: string) => {
    const size = pizza.sizes.find(size => size.name === value) as PizzaSize
    setSize(size)
  }

  const handleValueChange = (values: string[]) => {
    const newToppings = values
      .map(value => pizza.toppings.find(topping => topping.name === value))
      .filter((topping): topping is PizzaIngredient => topping !== undefined)

    setTopping(newToppings)
  }

  return {
    state: { size, doughs, toppings, modal },
    functions: { handleDoughs, handleSize, handleValueChange, setModal },
  }
}
