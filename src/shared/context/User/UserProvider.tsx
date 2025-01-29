'use client'

import React from 'react'

import { UserContext } from './UserContext'

export interface UserProviderProps {
  children: React.ReactNode
  defaultUser?: User
}

export function UserProvider({ children, defaultUser }: UserProviderProps) {
  const [user, setUser] = React.useState<User>(defaultUser!)

  const value = React.useMemo(() => ({ value: user, set: setUser }), [user])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
