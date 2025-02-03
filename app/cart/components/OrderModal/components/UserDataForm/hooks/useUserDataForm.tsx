import type { DaDataAddress, DaDataSuggestion } from 'react-dadata'
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
      city: {
        value: userContext.value?.city ?? '',
        unrestricted_value: userContext.value?.city ?? '',
        data: {} as DaDataAddress,
      } as DaDataSuggestion<DaDataAddress>,
      comment: '',
    },
  })

  const onSubmit = (data: { firstname: string, middlename: string, lastname: string, phone: string, email: string, city: DaDataSuggestion<DaDataAddress>, comment: string }) => {
    const { city, comment, ...person } = data
    person.phone = data.phone.split('').filter(char => char !== ' ').join('')

    orderContext.set({ ...(orderContext.value ?? {}), person, receiverAddress: { comment, city: city.data.city ?? '', apartment: city.data.flat ?? '', house: city.data.house ?? '', street: city.data.street ?? '' } })
    set('cardForm')
  }

  const registerWithMask = useHookFormMask(form.register)

  return {
    state: { form: { ...form, register: registerWithMask } },
    functions: { onSubmit },
  }
}
