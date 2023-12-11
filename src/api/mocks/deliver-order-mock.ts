import { http, HttpResponse } from 'msw'

import { DeliverOrderParams } from '../deliver-order'

export const deliverOrderMock = http.put<DeliverOrderParams>(
  '/orders/:orderId/deliver',
  async ({ params }) => {
    const { orderId } = params

    if (orderId === 'error-order-id') {
      return new HttpResponse(null, { status: 400 })
    } else {
      return new HttpResponse(null, { status: 204 })
    }
  },
)
