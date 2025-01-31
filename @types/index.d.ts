interface OrderPageParams {
  params: Promise<{ id: string }>
}

type Locale = 'en' | 'ru'

type PageProps = Readonly<{
  children: React.ReactNode
}> &
PageParams

interface CartPizza {
  count: number
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

type OrdersTabs = 'active' | 'history'
