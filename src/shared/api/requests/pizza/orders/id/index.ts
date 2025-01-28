import { instance } from '@/src/shared/api/instance'

interface GetPizzaOrdersIdParams {
  id: number
}

export type GetPizzaOrdersIdRequestConfig = RequestConfig<GetPizzaOrdersIdParams>

export async function getPizzaOrdersId({ params, config }: GetPizzaOrdersIdRequestConfig) {
  return instance.get<PizzaOrderResponse>(`/pizza/orders/${params.id}`, config)
}
