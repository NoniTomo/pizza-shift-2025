import { instance } from '@/src/shared/api/instance'

export type PutPizzaOrdersCancelParams = CancelPizzaOrderDto
export type PutPizzaOrdersCancelRequestConfig = RequestConfig<PutPizzaOrdersCancelParams>

export async function putPizzaOrdersCancel({ params, config }: PutPizzaOrdersCancelRequestConfig) {
  return instance.put<BaseResponse>('/pizza/orders/cancel', params, config)
}
