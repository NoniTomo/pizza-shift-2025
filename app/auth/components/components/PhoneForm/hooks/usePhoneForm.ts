import { useForm } from 'react-hook-form'
import { useHookFormMask } from 'use-mask-input'
import { useAuth } from '../../../context/AuthContext'
import { useStage } from '../../../context/StageContext'

export function usePhoneForm() {
  const authContext = useAuth()
  const { set } = useStage()

  const form = useForm({
    mode: 'onChange',
    defaultValues: {
      phone: authContext.value?.phone ?? '',
    },
  })

  const onSubmit = (data: { phone: string }) => {
    const phone = data.phone.split('').filter(char => char !== ' ').join('')
    authContext.set(phone)
    set('otpForm')
  }

  const registerWithMask = useHookFormMask(form.register)

  return {
    state: { form: { ...form, register: registerWithMask } },
    functions: { onSubmit },
  }
}
