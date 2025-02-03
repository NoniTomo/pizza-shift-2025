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
    const person = orderContext.value?.person
    const address = orderContext.value?.receiverAddress
    const debitCard: Card = { ...data, expireDate: data.expireDate.split('').filter(char => char !== '/').join(''), pan: data.pan.split('').filter(char => char !== ' ').join('') }

    if (person && address) {
      const pizzas = orderContext.value?.cartPizzas?.flatMap(cartPizza =>
        Array.from({ length: cartPizza.count }, () => ({ doughs: cartPizza.pizza.choosenDough, id: cartPizza.pizza.id, name: cartPizza.pizza.name, size: cartPizza.pizza.choosenSize, toppings: cartPizza.pizza.choosenToppings })),
      ) || []

      const response = await postPizzaPaymentMutation.mutateAsync({
        params: {
          pizzas,
          debitCard,
          person,
          receiverAddress: address,
        } as CreatePizzaPaymentDto,
      })
      if (response.data.success)
        stage.set('successView')
    }
  }

  return {
    state: {
      form: { ...form, register: registerWithMask },
      isLoading: postPizzaPaymentMutation.isPending,
    },
    functions: { onSubmit },
  }
}
