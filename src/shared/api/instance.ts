import axios from 'axios'

// eslint-disable-next-line ts/no-require-imports
const baseUrl = require('node:process').env.NEXT_PUBLIC_API_URL || 'https://default-api-url.com' // Параметр окружения или дефолтный URL

export const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
})
