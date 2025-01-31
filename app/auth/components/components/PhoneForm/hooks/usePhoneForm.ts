import { useForm } from 'react-hook-form'
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
    authContext.set(data.phone)
    set('otpForm')
  }

  return {
    state: { form },
    functions: { onSubmit },
  }
}
