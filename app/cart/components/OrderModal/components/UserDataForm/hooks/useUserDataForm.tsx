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
      firstname: userContext.value?.firstname || orderContext.value?.person?.firstname || '',
      middlename: userContext.value?.middlename || orderContext.value?.person?.middlename || '',
      lastname: userContext.value?.lastname || orderContext.value?.person?.lastname || '',
      phone: userContext.value?.phone || orderContext.value?.person?.phone || '',
      email: userContext.value?.email || orderContext.value?.person?.email || '',
      city: userContext.value?.city ?? '',
    },
  })

  const onSubmit = (data: User) => {
    const { city, ...person } = data
    orderContext.set({ ...(orderContext.value ?? {}), person, receiverAddress: { comment: city, apartment: city, house: city, street: city } })
    set('cardForm')
  }

  return {
    state: { form },
    functions: { onSubmit },
  }
}
