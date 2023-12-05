import { api } from '@/lib/axios'

interface SignInRequest {
  email: string
}

export async function signIn({ email }: SignInRequest) {
  await api.post('/authenticate', { email })
}
