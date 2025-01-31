'use client'

import React from 'react'

export interface OrderContextParams {
  value?: Partial<{
    cartPizzas: CartPizza[]
    receiverAddress: Address
    person: Omit<User, 'email' | 'city'>
  }>
  set: (
    order: Partial<{
      cartPizzas: CartPizza[]
      receiverAddress: Address
      person: Omit<User, 'email' | 'city'>
    }>
  ) => void
}

export const OrderContext = React.createContext<OrderContextParams>({
  value: undefined,
  set: () => {},
})
