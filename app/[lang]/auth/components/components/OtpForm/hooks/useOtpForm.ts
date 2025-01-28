'use client'

import { useGetUsersSessionsMutation, usePostAuthOtpMutation, usePostUsersSignInMutation } from '@/src/shared/api'
import { ROUTES } from '@/src/shared/constants'
import { useUser } from '@/src/shared/context'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../../context/AuthContext'
import useTimer from './useTimer'

export function useOtpForm() {
  const authContext = useAuth()
  const userContext = useUser()
  const { seconds, isEnding, start } = useTimer()
  const router = useRouter()

  const postAuthOtpMutation = usePostAuthOtpMutation()
  const postPostUsersSignInMutation = usePostUsersSignInMutation()
  const getUsersSessionsMutation = useGetUsersSessionsMutation()

  const form = useForm({
    mode: 'onChange',
    defaultValues: {
      phone: authContext.value?.phone ?? '',
      otp: '',
    },
  })

  const onSubmit = async (data: { phone: string, otp: string }) => {
    const response = await postPostUsersSignInMutation.mutateAsync({ params: { code: Number(data.otp), phone: data.phone } })
    if (response.data.success) {
      setCookie('token', response.data.token)
      const userResponse = await getUsersSessionsMutation.mutateAsync({})
      if (userResponse.data.success) {
        userContext.set(userResponse.data.user)
        router.push(ROUTES.PIZZA)
      }
    }
  }

  const handleGetOtp = async () => {
    const response = await postAuthOtpMutation.mutateAsync({ params: { phone: authContext.value?.phone ?? '' } })
    if (response.data.success)
      start(Math.ceil(response.data.retryDelay / 1000))
  }

  React.useEffect(() => {
    handleGetOtp()
  }, [])

  return {
    state: { form, seconds, isEnding },
    functions: { onSubmit, handleGetOtp },
  }
}
