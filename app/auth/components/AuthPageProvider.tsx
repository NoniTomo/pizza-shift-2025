'use client'

import type { StageProviderProps } from './context/StageContext'
import { AuthProvider } from './context/AuthContext'
import { StageProvider } from './context/StageContext'
import { Stepper } from './Stepper'

export interface ProviderProps {
  children: React.ReactNode
  stage: Omit<StageProviderProps, 'children'>
}

export function AuthPageProvider({ stage }: ProviderProps) {
  return (
    <StageProvider {...stage}>
      <AuthProvider>
        <div className="max-w-[400px] flex flex-col gap-5 p-2">
          <Stepper />
        </div>
      </AuthProvider>
    </StageProvider>
  )
}
