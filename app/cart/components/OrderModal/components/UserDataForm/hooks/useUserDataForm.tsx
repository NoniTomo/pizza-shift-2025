import { useUser } from '@/src/shared/context'
import { useForm } from 'react-hook-form'
import { useHookFormMask } from 'use-mask-input'
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
    person.phone = data.phone.split('').filter(char => char !== ' ').join('')
    orderContext.set({ ...(orderContext.value ?? {}), person, receiverAddress: { comment: city, apartment: city, house: city, street: city } })
    set('cardForm')
  }

  const registerWithMask = useHookFormMask(form.register)

  return {
    state: { form: { ...form, register: registerWithMask } },
    functions: { onSubmit },
  }
}
