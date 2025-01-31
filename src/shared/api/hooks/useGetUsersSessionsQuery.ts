import { useQuery } from '@tanstack/react-query'

import { getUsersSession } from '../requests'

export function useGetUsersSessionQuery(settings?: QuerySettings<typeof getUsersSession>) {
  return useQuery({
    queryKey: ['getUsersSession'],
    queryFn: () => getUsersSession({ config: settings?.config }),
    ...settings?.options,
  })
}
