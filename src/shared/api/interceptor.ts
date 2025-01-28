import { getCookie } from 'cookies-next'

export function interceptor(config: any) {
  const token = getCookie('token')

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}
