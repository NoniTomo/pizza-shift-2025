'use client'

const LOCAL_STORAGE_PIZZA_LIST_NAME = 'cartPizzas'

function compareObjects(first: { [key: string]: any }, second: { [key: string]: any }) {
  return Object.keys({ ...first, ...second }).every(key => first[key] === second[key])
}

export interface RemoveProps {
  pizzaId: string
  toppings: OrderedPizzaIngredient[]
  size: PizzaSize
  doughs: PizzaDough
}

export interface AddProps {
  pizzaId: string
  name: string
  toppings: OrderedPizzaIngredient[]
  size: PizzaSize
  doughs: PizzaDough
  imgSrc: string
  description: string
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

  const add = ({ pizzaId, name, toppings = [], size, doughs, imgSrc, description }: AddProps) => {
    const pizzas = getLocalStorage()

    const sortToppings = [...toppings].sort((topping1, topping2) =>
      topping1.name < topping2.name ? 1 : 0,
    )
    const pizzaIndex = pizzas.findIndex(
      (pizza: CartPizza) =>
        pizza.pizza.id === pizzaId
        && compareObjects(pizza.pizza.doughs, doughs)
        && compareObjects(pizza.pizza.size, size)
        && sortToppings.reduce(
          (compare, topping, index) => compare && compareObjects(pizza.pizza.toppings[index], topping),
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
          id: pizzaId,
          doughs,
          name,
          size,
          toppings,
          description,
          imgSrc,
          price: size.price + doughs.price + toppings.reduce((sum, topping) => sum + topping.cost, 0),
        },
      })
    }

    setLocalStorage(newPizzas)
  }

  const remove = ({ pizzaId, toppings = [], size, doughs }: RemoveProps) => {
    const pizzas = getLocalStorage()

    const sortToppings = [...toppings].sort((topping1, topping2) =>
      topping1.name < topping2.name ? 1 : 0,
    )
    const pizzaIndex = pizzas.findIndex(
      (pizza: CartPizza) =>
        pizza.pizza.id === pizzaId
        && compareObjects(pizza.pizza.doughs, doughs)
        && compareObjects(pizza.pizza.size, size)
        && sortToppings.reduce(
          (compare, topping, index) => compare && compareObjects(pizza.pizza.toppings[index], topping),
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

  const getTotalPrice = (pizzas: CartPizza[]): number =>
    pizzas.reduce((totalPrice, cartPizza) => totalPrice + cartPizza.count * cartPizza.pizza.price, 0)

  return {
    add,
    remove,
    get,
    getTotalPrice,
    clear,
  }
}
