import { http, HttpResponse } from 'msw'

interface SignInRequest {
  email: string
}

export const signInMock = http.post<never, SignInRequest>(
  '/authenticate',
  async ({ request }) => {
    const { email } = await request.json()

    if (email === 'john.doe@example.com') {
      return new HttpResponse(null, {
        headers: {
          'Set-Cookie': 'auth=sample-jwt-token',
        },
      })
    } else {
      return new HttpResponse(null, { status: 401 })
    }
  },
)
