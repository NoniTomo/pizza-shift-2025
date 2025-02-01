import type { PostAuthOtpRequestConfig } from '../requests'

import { useMutation } from '@tanstack/react-query'
import { postAuthOtp } from '../requests'

export function usePostAuthOtpMutation(settings?: MutationSettings<PostAuthOtpRequestConfig, typeof postAuthOtp>) {
  return useMutation({
    mutationKey: ['postAuthOtp'],
    mutationFn: ({ params, config }) =>
      postAuthOtp({ params, config: { ...settings?.config, ...config } }),
    ...settings?.options,
  })
}
