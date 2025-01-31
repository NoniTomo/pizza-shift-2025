import { instance } from '@/src/shared/api/instance'

export type GetPizzaOrdersRequestConfig = RequestConfig

export async function getPizzaOrders(params?: GetPizzaOrdersRequestConfig) {
  return instance.get<PizzaOrdersResponse>('/pizza/orders', params?.config)
}
