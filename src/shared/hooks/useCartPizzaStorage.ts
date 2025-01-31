'use client'

const LOCAL_STORAGE_PIZZA_LIST_NAME = 'cartPizzas'

function compareObjects(first: { [key: string]: any }, second: { [key: string]: any }) {
  return Object.keys({ ...first, ...second }).every(key => first[key] === second[key])
}

export interface RemoveProps {
  id: string
  choosenToppings: PizzaIngredient[]
  choosenSize: PizzaSize
  choosenDough: PizzaDough
}

export interface AddProps {
  id: string
  name: string
  img: string
  sizes: PizzaSize[]
  dough: PizzaDough[]
  toppings: PizzaIngredient[]
  choosenDough: PizzaDough
  choosenSize: PizzaSize
  choosenToppings: PizzaIngredient[]
}

export function useCartPizzaStorage() {
  const getLocalStorage = (): CartPizza[] =>
    typeof localStorage !== 'undefined'
      ? (JSON.parse(localStorage.getItem(LOCAL_STORAGE_PIZZA_LIST_NAME) ?? '[]') as CartPizza[])
      : []
  const setLocalStorage = (newPizzas: CartPizza[]) =>
    typeof localStorage !== 'undefined'
      ? localStorage.setItem(LOCAL_STORAGE_PIZZA_LIST_NAME, JSON.stringify(newPizzas))
      : []

  const add = (props: AddProps) => {
    const pizzas = getLocalStorage()

    const sortToppings = [...props.choosenToppings].sort((topping1, topping2) =>
      topping1.name < topping2.name ? 1 : 0,
    )
    const pizzaIndex = pizzas.findIndex(
      (pizza: CartPizza) =>
        pizza.pizza.id === props.id
        && compareObjects(pizza.pizza.choosenDough, props.choosenDough)
        && compareObjects(pizza.pizza.choosenSize, props.choosenSize)
        && sortToppings.reduce(
          (compare, topping, index) => compare && compareObjects(pizza.pizza.choosenToppings[index], topping),
          true,
        ),
    )

    const newPizzas = [...pizzas]
    if (pizzaIndex !== -1) {
      newPizzas.splice(pizzaIndex, 1, {
        ...pizzas[pizzaIndex],
        count: pizzas[pizzaIndex].count + 1,
      })
    }
    else {
      newPizzas.push({
        count: 1,
        pizza: {
          ...props,
          price: props.choosenSize.price + props.choosenDough.price + props.choosenToppings.reduce((sum, topping) => sum + topping.cost, 0),
        },
      })
    }

    setLocalStorage(newPizzas)
  }

  const remove = (props: RemoveProps) => {
    const pizzas = getLocalStorage()

    const sortToppings = [...props.choosenToppings].sort((topping1, topping2) =>
      topping1.name < topping2.name ? 1 : 0,
    )
    const pizzaIndex = pizzas.findIndex(
      (pizza: CartPizza) =>
        pizza.pizza.id === props.id
        && compareObjects(pizza.pizza.choosenDough, props.choosenDough)
        && compareObjects(pizza.pizza.choosenSize, props.choosenSize)
        && sortToppings.reduce(
          (compare, topping, index) => compare && compareObjects(pizza.pizza.choosenToppings[index], topping),
          true,
        ),
    )

    const newPizzas = [...pizzas]
    if (pizzaIndex !== -1) {
      if (pizzas[pizzaIndex].count > 1) {
        newPizzas[pizzaIndex].count--
      }
      else {
        newPizzas.splice(pizzaIndex, 1)
      }
    }

    setLocalStorage(newPizzas)
  }

  const clear = () => localStorage.setItem(LOCAL_STORAGE_PIZZA_LIST_NAME, JSON.stringify([]))
  const get = (): CartPizza[] => getLocalStorage()

  return {
    add,
    remove,
    get,
    clear,
  }
}
