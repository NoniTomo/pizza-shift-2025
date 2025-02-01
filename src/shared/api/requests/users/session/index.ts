import { instance } from '@/src/shared/api/instance'

export type GetUsersSessionRequestConfig = RequestConfig

export async function getUsersSession(params?: GetUsersSessionRequestConfig) {
  return instance.get<SessionResponse>('/users/session', params?.config)
}
