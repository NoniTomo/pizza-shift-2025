import { instance } from '@/src/shared/api/instance'

export type PostPizzaPaymentParams = CreatePizzaPaymentDto

export type PostPizzaPaymentRequestConfig = RequestConfig<PostPizzaPaymentParams>

export async function postPizzaPayment({ params, config }: PostPizzaPaymentRequestConfig) {
  return instance.post<PizzaPaymentResponse>('/pizza/payment', params, config)
}
