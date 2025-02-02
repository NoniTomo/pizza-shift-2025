'use client'

import { useGetUsersSessionsMutation, usePostAuthOtpMutation, usePostUsersSignInMutation } from '@/src/shared/api'
import { ROUTES } from '@/src/shared/constants'
import { useUser } from '@/src/shared/context'
import { useTimer } from '@/src/shared/hooks/useTimer'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useHookFormMask } from 'use-mask-input'
import { useAuth } from '../../../context/AuthContext'

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
    const phone = data.phone.split('').filter(char => char !== ' ').join('')
    const response = await postPostUsersSignInMutation.mutateAsync({ params: { code: Number(data.otp), phone } })
    if (response.data.success) {
      setCookie('token', response.data.token)
      const userResponse = await getUsersSessionsMutation.mutateAsync({})
      if (userResponse.data.success) {
        userContext.set(userResponse.data.user)
        router.push(ROUTES.PIZZA)
        router.refresh()
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

  const registerWithMask = useHookFormMask(form.register)

  return {
    state: { form: { ...form, register: registerWithMask }, seconds, isEnding },
    functions: { onSubmit, handleGetOtp },
  }
}
