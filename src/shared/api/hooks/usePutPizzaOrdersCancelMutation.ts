import type { PutPizzaOrdersCancelRequestConfig } from '../requests'

import { useMutation } from '@tanstack/react-query'
import { putPizzaOrdersCancel } from '../requests'

export function usePutPizzaOrdersCancelMutation(settings?: MutationSettings<PutPizzaOrdersCancelRequestConfig, typeof putPizzaOrdersCancel>) {
  return useMutation({
    mutationKey: ['putPizzaOrdersCancel'],
    mutationFn: ({ params, config }) =>
      putPizzaOrdersCancel({ params, config: { ...settings?.config, ...config } }),
    ...settings?.options,
  })
}
