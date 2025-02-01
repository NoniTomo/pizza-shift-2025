'use client'

import React from 'react'

export interface OrderContextParams {
  value?: Partial<{
    cartPizzas: CartPizza[]
    receiverAddress: Address
    person: Omit<User, 'city'>
  }>
  set: (
    order: Partial<{
      cartPizzas: CartPizza[]
      receiverAddress: Address
      person: Omit<User, 'city'>
    }>
  ) => void
}

export const OrderContext = React.createContext<OrderContextParams>({
  value: undefined,
  set: () => {},
})
