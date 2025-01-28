import { instance } from '@/src/shared/api/instance'

export type PutPizzaOrdersCancelRequestConfig = RequestConfig<CancelPizzaOrderDto>

export async function putPizzaOrdersCancel({ params, config }: PutPizzaOrdersCancelRequestConfig) {
  return instance.put<BaseResponse>('/pizza/orders/cancel', params, config)
}
