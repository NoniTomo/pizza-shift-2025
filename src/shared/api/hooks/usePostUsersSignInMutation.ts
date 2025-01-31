import type { PostUsersSigninRequestConfig } from '../requests'

import { useMutation } from '@tanstack/react-query'
import { postUsersSignin } from '../requests'

export function usePostUsersSignInMutation(settings?: MutationSettings<PostUsersSigninRequestConfig, typeof postUsersSignin>) {
  return useMutation({
    mutationKey: ['postUsersSignIn'],
    mutationFn: ({ params, config }) =>
      postUsersSignin({ params, config: { ...settings?.config, ...config } }),
    ...settings?.options,
  })
}
