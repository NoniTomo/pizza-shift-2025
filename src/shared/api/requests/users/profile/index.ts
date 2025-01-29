import { instance } from '@/src/shared/api/instance'

export interface PatchUsersProfileParams {
  phone: string
  profile: Omit<User, 'phone'>
}

export type PatchUsersProfileRequestConfig = RequestConfig<PatchUsersProfileParams>

export async function patchUsersProfile({ params, config }: PatchUsersProfileRequestConfig) {
  return instance.patch<UpdateProfileResponse>('/users/profile', params, config)
}
