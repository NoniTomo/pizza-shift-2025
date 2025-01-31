import React from 'react'

export interface usePizzaCardProps {
  pizza: {
    id: string
    name: string
    img: string
    sizes: PizzaSize[]
    dough: PizzaDough[]
    toppings: PizzaIngredient[]
    choosenDough: PizzaDough
    choosenSize: PizzaSize
    choosenToppings: PizzaIngredient[]
    price: number
  }
}

export function usePizzaCardModal(props: usePizzaCardProps) {
  const [modal, setModal] = React.useState(false)
  const [size, setSize] = React.useState<PizzaSize>(props.pizza.choosenSize)
  const [doughs, setDoughs] = React.useState<PizzaDough>(props.pizza.choosenDough)
  const [toppings, setTopping] = React.useState<PizzaIngredient[]>(props.pizza.choosenToppings)

  const handleDoughs = (value: string) => {
    const doughs = props.pizza.dough.find(dough => dough.name === value) as PizzaDough
    setDoughs(doughs)
  }

  const handleSize = (value: string) => {
    const size = props.pizza.sizes.find(size => size.name === value) as PizzaSize
    setSize(size)
  }

  const handleValueChange = (values: string[]) => {
    const newToppings = values
      .map(value => props.pizza.toppings.find(topping => topping.name === value))
      .filter((topping): topping is PizzaIngredient => topping !== undefined)

    setTopping(newToppings)
  }

  return {
    state: { size, doughs, toppings, modal },
    functions: { handleDoughs, handleSize, handleValueChange, setModal },
  }
}
