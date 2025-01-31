import { useUser } from '@/src/shared/context'
import { useForm } from 'react-hook-form'
import { useOrder } from '../../../context/OrderContext'
import { useStage } from '../../../context/StageContext'

export function useUserDataForm() {
  const userContext = useUser()
  const orderContext = useOrder()
  const { set } = useStage()
  const form = useForm({
    mode: 'onChange',
    defaultValues: {
      firstname: userContext.value?.firstname ?? '',
      middlename: userContext.value?.middlename ?? '',
      lastname: userContext.value?.lastname ?? '',
      phone: userContext.value?.phone ?? '',
      email: userContext.value?.email ?? '',
      city: userContext.value?.city ?? '',
    },
  })

  const onSubmit = (data: Omit<User, 'email'>) => {
    const { city, ...person } = data
    orderContext.set({ ...(orderContext.value ?? {}), person, receiverAddress: { comment: city, apartment: city, house: city, street: city } })
    set('cardForm')
  }

  return {
    state: { form },
    functions: { onSubmit },
  }
}
