import { http, HttpResponse } from 'msw'

import { RegisterRestaurantRequest } from '../register-restaurant'

export const registerRestaurantMock = http.post<
  never,
  RegisterRestaurantRequest
>('/restaurants', async ({ request }) => {
  const { restaurantName } = await request.json()

  if (restaurantName === 'Pizza Shop') {
    return new HttpResponse(null, { status: 201 })
  } else {
    return new HttpResponse(null, { status: 400 })
  }
})
