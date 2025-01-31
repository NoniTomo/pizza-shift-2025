interface User {
  firstname: string
  middlename: string
  lastname: string
  email: string
  city: string
  phone: string
}

interface Card {
  pan: string
  expireDate: string
  cvv: string
}

interface SignInResponse {
  success: boolean
  reason: string
  user: User
  token: string
}

interface UpdateProfileResponse {
  success: boolean
  reason: string
  user: User
}

interface SessionResponse {
  success: boolean
  reason: string
  user: User
}

interface OtpResponse {
  success: boolean
  reason: string
  retryDelay: number
}

type Ingredient =
  | 'PINEAPPLE'
  | 'MOZZARELLA'
  | 'PEPERONI'
  | 'GREEN_PEPPER'
  | 'MUSHROOMS'
  | 'BASIL'
  | 'CHEDDAR'
  | 'PARMESAN'
  | 'FETA'
  | 'HAM'
  | 'PICKLE'
  | 'TOMATO'
  | 'BACON'
  | 'ONION'
  | 'CHILE'
  | 'SHRIMPS'
  | 'CHICKEN_FILLET'
  | 'MEATBALLS'

interface PizzaIngredient {
  name: Ingredient
  cost: number
  img: string
}

type Size = 'SMALL' | 'MEDIUM' | 'LARGE'

interface PizzaSize {
  name: Size
  price: number
}

type Dough = 'THIN' | 'THICK'

interface PizzaDough {
  name: Dough
  price: number
}

interface Pizza {
  id: string
  name: string
  ingredients: PizzaIngredient[]
  toppings: PizzaIngredient[]
  description: string
  sizes: PizzaSize[]
  doughs: PizzaDough[]
  calories: number
  protein: string
  totalFat: string
  carbohydrates: string
  sodium: string
  allergens: string[]
  isVegetarian: boolean
  isGlutenFree: boolean
  isNew: boolean
  isHit: boolean
  img: string
}

interface PizzasResponse {
  success: boolean
  reason: string
  catalog: Pizza[]
}

interface OrderedPizzaIngredient {
  name: Ingredient
  cost: number
}

interface OrderedPizza {
  id: string
  name: string
  toppings: OrderedPizzaIngredient[]
  size: PizzaSize
  doughs: PizzaDough
}

interface Address {
  street: string
  house: string
  apartment: string
  comment: string
}

interface CreatePizzaPaymentDto {
  receiverAddress: Address
  person: Omit<User, 'email' | 'city'>
  debitCard: Card
  pizzas: OrderedPizza[]
}

interface PizzaOrder {
  _id: string
  pizzas: OrderedPizza[]
  person: Omit<User, 'email' | 'city'>
  receiverAddress: Address
  status: 0 | 1 | 2 | 3 | 4 // 0 - заказ принят ..., 3 - заказ готов, 4 - заказ отменен
  cancellable: boolean
}

interface PizzaPaymentResponse {
  success: boolean
  reason: string
  order: PizzaOrder
}

interface PizzaOrdersResponse {
  success: boolean
  reason: string
  orders: PizzaOrder[]
}

interface PizzaOrderResponse {
  success: boolean
  reason: string
  order: PizzaOrder
}

interface CancelPizzaOrderDto {
  orderId: string
}

interface BaseResponse {
  success: boolean
  reason: string
}
