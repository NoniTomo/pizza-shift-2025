'use client'

import React from 'react'

import { OrderContext } from './OrderContext'

export interface OrderProviderProps {
  children: React.ReactNode
  defaultOrder?: Partial<{
    cartPizzas: CartPizza[]
    receiverAddress: Address
    person: Omit<User, 'city'>
  }>
}

export function OrderProvider({ children, defaultOrder }: OrderProviderProps) {
  const [order, setOrder] = React.useState(defaultOrder)

  const value = React.useMemo(() => ({ value: order, set: setOrder }), [order])

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}
