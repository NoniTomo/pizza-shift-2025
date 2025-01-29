import { usePatchUsersProfileMutation } from '@/src/shared/api'
import { ROUTES } from '@/src/shared/constants'
import { useUser } from '@/src/shared/context'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'

export function useProfileForm() {
  const { value, set } = useUser()
  const [openModal, setOpenModal] = React.useState(false)
  const router = useRouter()

  const patchUsersProfileMutation = usePatchUsersProfileMutation()

  const form = useForm({
    mode: 'onChange',
    defaultValues: {
      firstname: value?.firstname ?? '',
      middlename: value?.middlename ?? '',
      lastname: value?.lastname ?? '',
      phone: value?.phone ?? '',
      email: value?.email ?? '',
      city: value?.city ?? '',
    },
  })

  const onSubmit = (data: User) => {
    const { phone, ...profile } = data
    patchUsersProfileMutation.mutateAsync({
      params: {
        profile,
        phone,
      },
    })
  }

  const onLeave = () => {
    deleteCookie('token')
    set(undefined)
    router.push(ROUTES.PIZZA)
  }

  return {
    state: { form, openModal, isLoading: patchUsersProfileMutation.isPending },
    functions: { onSubmit, onLeave, setOpenModal },
  }
}
