import { http, HttpResponse } from 'msw'

import { GetPopularProductsResponse } from '../get-popular-products'

export const getPopularProductsMock = http.get<
  never,
  never,
  GetPopularProductsResponse
>('/metrics/popular-products', async () => {
  return HttpResponse.json([
    { product: 'Pizza 01', amount: 10 },
    { product: 'Pizza 02', amount: 20 },
    { product: 'Pizza 03', amount: 30 },
    { product: 'Pizza 04', amount: 40 },
  ])
})
