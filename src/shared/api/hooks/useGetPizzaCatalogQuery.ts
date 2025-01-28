import { useQuery } from '@tanstack/react-query'

import { getPizzaCatalog } from '../requests'

export function useGetPizzaCatalogQuery(settings?: QuerySettings<typeof getPizzaCatalog>) {
  return useQuery({
    queryKey: ['getPizzaCatalog'],
    queryFn: () => getPizzaCatalog({ config: settings?.config }),
    ...settings?.options,
  })
}
