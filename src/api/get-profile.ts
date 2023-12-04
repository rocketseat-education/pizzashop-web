import { api } from '@/lib/axios'

interface GetProfileResponse {
  name: string
  id: string
  email: string
  phone: string | null
  role: 'manager' | 'customer'
  createdAt: Date | null
  updatedAt: Date | null
}

export async function getProfile() {
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const response = await api.get<GetProfileResponse>('/me')

  return response.data
}
