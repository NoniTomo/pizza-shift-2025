import { instance } from '@/src/shared/api/instance'

export type GetPizzaCatalogRequestConfig = RequestConfig

export async function getPizzaCatalog(params?: GetPizzaCatalogRequestConfig) {
  return instance.get<PizzasResponse>('/pizza/catalog', params?.config)
}
