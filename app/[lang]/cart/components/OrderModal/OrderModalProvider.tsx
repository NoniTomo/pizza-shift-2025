'use client'

import type { StageProviderProps } from './context/StageContext'
import { useCartPizzaStorage } from '@/src/shared/hooks'
import { OrderProvider } from './context/OrderContext'
import { StageProvider } from './context/StageContext'

export interface ProviderProps {
  children: React.ReactNode
  stage: Omit<StageProviderProps, 'children'>
}

export function OrderModalProvider({ children, stage }: ProviderProps) {
  const { get } = useCartPizzaStorage()
  return (
    <StageProvider {...stage}>
      <OrderProvider
        defaultOrder={{
          cartPizzas: get(),
        }}
      >
        {children}
      </OrderProvider>
    </StageProvider>
  )
}
