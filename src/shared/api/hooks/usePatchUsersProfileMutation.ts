import type { PatchUsersProfileRequestConfig } from '../requests'

import { useMutation } from '@tanstack/react-query'
import { patchUsersProfile } from '../requests'

export function usePatchUsersProfileMutation(settings?: MutationSettings<PatchUsersProfileRequestConfig, typeof patchUsersProfile>) {
  return useMutation({
    mutationKey: ['patchUsersProfile'],
    mutationFn: ({ params, config }) =>
      patchUsersProfile({ params, config: { ...settings?.config, ...config } }),
    ...settings?.options,
  })
}
