import { getUsersSession, type GetUsersSessionRequestConfig } from '../requests'

import { useMutation } from '@tanstack/react-query'

export function useGetUsersSessionsMutation(settings?: MutationSettings<GetUsersSessionRequestConfig, typeof getUsersSession>) {
  return useMutation({
    mutationKey: ['getUsersSession'],
    mutationFn: (params) =>
      getUsersSession({ config: { ...settings?.config, ...params?.config } }),
    ...settings?.options,
  })
}
