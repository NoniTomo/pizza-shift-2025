import { instance } from './instance'
import { interceptor } from './interceptor'

/* instance.interceptors.response.use((data) => {
  if (isSSR) return parse(stringify(data))
  return data
}) */
instance.interceptors.request.use(interceptor)

export * from './hooks'
export * from './requests'
