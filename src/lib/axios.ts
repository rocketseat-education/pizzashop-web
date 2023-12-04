import axios, { isAxiosError } from 'axios'
import { redirect } from 'react-router-dom'

export const api = axios.create({
  baseURL: 'http://localhost:3333',
  withCredentials: true,
})
