'use client'

import React from 'react'

import { AuthContext } from './AuthContext'

export interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [auth, setAuth] = React.useState<{ phone: string }>()

  const value = React.useMemo(() => ({ value: auth, set: (phone: string) => setAuth({ phone }) }), [auth])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
