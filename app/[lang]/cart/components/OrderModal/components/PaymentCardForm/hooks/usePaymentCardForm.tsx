import { usePostPizzaPaymentMutation } from '@/src/shared/api'
import { useForm } from 'react-hook-form'
import { useHookFormMask } from 'use-mask-input'
import { useOrder } from '../../../context/OrderContext'
import { useStage } from '../../../context/StageContext'

export function usePaymentCardForm() {
  const orderContext = useOrder()
  const postPizzaPaymentMutation = usePostPizzaPaymentMutation()

  const stage = useStage()
  const form = useForm({
    mode: 'onChange',
    defaultValues: {
      pan: '',
      expireDate: '',
      cvv: '',
    },
  })

  const registerWithMask = useHookFormMask(form.register)
  const onSubmit = async (data: Card) => {
    const response = await postPizzaPaymentMutation.mutateAsync({
      params: {
        pizzas: orderContext.value?.cartPizzas?.map((cartPizza) => {
          return {
            doughs: cartPizza.pizza.doughs,
            id: cartPizza.pizza.id,
            name: cartPizza.pizza.name,
            size: cartPizza.pizza.size,
            toppings: cartPizza.pizza.toppings,
          }
        }),
        debitCard: data,
        person: orderContext.value?.person,
        receiverAddress: orderContext.value?.receiverAddress,
      } as CreatePizzaPaymentDto,
    })
    if (response.data.success)
      stage.set('successView')
  }

  return {
    state: {
      form: { ...form, register: registerWithMask },
      isLoading: postPizzaPaymentMutation.isPending,
    },
    functions: { onSubmit },
  }
}
