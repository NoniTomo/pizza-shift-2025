import { getCookie } from 'cookies-next'

export function interceptor(config: any) {
  const token = (typeof window !== 'undefined') ? getCookie('token') : null

  if (token)
    config.headers.Authorization = `Bearer ${token}`

  return config
}
