import type { PostPizzaPaymentRequestConfig } from '../requests'

import { useMutation } from '@tanstack/react-query'
import { postPizzaPayment } from '../requests'

export function usePostPizzaPaymentMutation(settings?: MutationSettings<PostPizzaPaymentRequestConfig, typeof postPizzaPayment>) {
  return useMutation({
    mutationKey: ['postPizzaPayment'],
    mutationFn: ({ params, config }) =>
      postPizzaPayment({ params, config: { ...settings?.config, ...config } }),
    ...settings?.options,
  })
}
