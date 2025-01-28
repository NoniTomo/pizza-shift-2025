import { instance } from '@/src/shared/api/instance'

export interface PostTokenOtpParams {
  phone: string
}

export type PostAuthOtpRequestConfig = RequestConfig<PostTokenOtpParams>

export async function postAuthOtp({ params, config }: PostAuthOtpRequestConfig) {
  return instance.post<OtpResponse>('/auth/otp', params, config)
}
