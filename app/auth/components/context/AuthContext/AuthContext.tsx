'use client'

import React from 'react'

export interface AuthContextParams {
  value?: { phone: string }
  set: (phone: string) => void
}

export const AuthContext = React.createContext<AuthContextParams>({
  value: undefined,
  set: () => {},
})
