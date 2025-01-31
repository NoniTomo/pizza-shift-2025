import { usePatchUsersProfileMutation } from '@/src/shared/api'
import { useUser } from '@/src/shared/context'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'

export function useProfileForm() {
  const userContext = useUser()
  const [openModal, setOpenModal] = React.useState(false)
  const router = useRouter()

  const patchUsersProfileMutation = usePatchUsersProfileMutation()
  const { firstname, middlename, lastname, phone, email, city } = userContext.value ?? {}

  const form = useForm({
    mode: 'onChange',
    defaultValues: {
      firstname: firstname ?? '',
      middlename: middlename ?? '',
      lastname: lastname ?? '',
      phone: phone ?? '',
      email: email ?? '',
      city: city ?? '',
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
    userContext.set(data)
  }

  const onLeave = async () => {
    deleteCookie('token')
    deleteCookie('user')
    userContext.set(undefined)
    router.refresh()
  }

  return {
    state: { form, openModal, isLoading: patchUsersProfileMutation.isPending },
    functions: { onSubmit, onLeave, setOpenModal },
  }
}
