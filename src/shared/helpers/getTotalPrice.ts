export function getTotalPrice(pizzas: { count: number, choosenSize: PizzaSize, choosenDough: PizzaDough, choosenToppings: OrderedPizzaIngredient[] }[]): number {
  return pizzas.reduce((totalPrice, pizza) => totalPrice + pizza.count * getPizzaPrice(pizza), 0)
}

export function getPizzaPrice(pizza: {
  choosenSize: PizzaSize
  choosenDough: PizzaDough
  choosenToppings: OrderedPizzaIngredient[]
}): number {
  return pizza.choosenSize.price + pizza.choosenDough.price + pizza.choosenToppings.reduce((sum, topping) => sum + topping.cost, 0)
}
