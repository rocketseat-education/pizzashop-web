import { http, HttpResponse } from 'msw'

import {
  GetOrderDetailsParams,
  GetOrderDetailsResponse,
} from '../get-order-details'

export const getOrderDetailsMock = http.get<
  GetOrderDetailsParams,
  never,
  GetOrderDetailsResponse
>('/orders/:orderId', async () => {
  return HttpResponse.json({
    id: 'custom-order-id',
    customer: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '47817292893',
    },
    status: 'pending',
    createdAt: new Date().toISOString(),
    orderItems: [
      {
        id: 'order-item-1',
        priceInCents: 3900,
        product: {
          name: 'Pepperoni Pizza',
        },
        quantity: 1,
      },
      {
        id: 'order-item-2',
        priceInCents: 4900,
        product: {
          name: 'Chicken & Barbecue Pizza',
        },
        quantity: 2,
      },
    ],
    totalInCents: 3900 + 4900 * 2,
  })
})
