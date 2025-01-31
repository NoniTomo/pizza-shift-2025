import axios from 'axios'
import { API_URL } from '../constants'

export const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
})
