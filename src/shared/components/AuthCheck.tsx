'use client'

import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useGetUsersSessionQuery } from '../api'
import { ROUTES } from '../constants'
import { useUser } from '../context'

export interface AuthCheckProps {
  children: React.ReactNode
}

export function AuthCheck({ children }: AuthCheckProps) {
  const router = useRouter()
  const userContext = useUser()

  const response = useGetUsersSessionQuery()

  React.useEffect(() => {
    if (!response.isPending && response.isSuccess) {
      userContext.set(response.data?.data.user)
    }
    if (!response.isPending && response.isError) {
      deleteCookie('token')
      userContext.set(undefined)
      router.push(ROUTES.PIZZA)
    }
  }, [response.data])

  if (userContext.value) {
    return (
      <>{children}</>
    )
  }

  return (null)
}
