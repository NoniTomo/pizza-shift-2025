import { instance } from '@/src/shared/api/instance'

export interface PostUsersSignin {
  phone: string
  code: number
}

export type PostUsersSigninRequestConfig = RequestConfig<PostUsersSignin>

export async function postUsersSignin({ params, config }: PostUsersSigninRequestConfig) {
  return instance.post<SignInResponse>('/users/signin', params, config)
}
