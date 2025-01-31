import type { GetPizzaOrdersIdParams } from '../requests'

import { useQuery } from '@tanstack/react-query'
import { getPizzaOrdersId } from '../requests'

export function useGetPizzaOrdersIdQuery(params: GetPizzaOrdersIdParams, settings?: QuerySettings<typeof getPizzaOrdersId>,
) {
  return useQuery({
    queryKey: ['getPizzaOrdersId', params],
    queryFn: () => getPizzaOrdersId({ params, config: settings?.config }),
    ...settings?.options,
  })
}
