import { http, HttpResponse } from 'msw'

import { GetProfileResponse } from '../get-profile'

export const getProfileMock = http.get<never, never, GetProfileResponse>(
  '/me',
  async () => {
    return HttpResponse.json({
      id: 'custom-user-id',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '47828376473',
      role: 'manager',
      createdAt: new Date(),
      updatedAt: null,
    })
  },
)
