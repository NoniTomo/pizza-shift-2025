import { instance } from '@/src/shared/api/instance'

export interface GetPizzaOrdersIdParams {
  id: string
}

export type GetPizzaOrdersIdRequestConfig = RequestConfig<GetPizzaOrdersIdParams>

export async function getPizzaOrdersId({ params, config }: GetPizzaOrdersIdRequestConfig) {
  return instance.get<PizzaOrderResponse>(`/pizza/orders/${params.id}`, config)
}
