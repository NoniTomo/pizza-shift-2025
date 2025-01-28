import { instance } from '@/src/shared/api/instance'

export type GetSessionRequestConfig = RequestConfig

export async function getSession(params: GetSessionRequestConfig) {
  return instance.get<SessionResponse>('/activities/info', params?.config)
}
