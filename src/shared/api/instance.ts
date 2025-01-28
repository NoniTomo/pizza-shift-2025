import axios from 'axios'
import { isSSR } from '../helpers'

// eslint-disable-next-line ts/no-require-imports, unicorn/prefer-node-protocol
const baseUrl = isSSR ? require('process').env.NEXT_PUBLIC_API_URL : 'https://shift-intensive.ru/api'

export const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
})
