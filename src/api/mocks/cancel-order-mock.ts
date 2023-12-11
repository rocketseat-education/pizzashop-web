import { http, HttpResponse } from 'msw'

import { CancelOrderParams } from '../cancel-order'

export const cancelOrderMock = http.put<CancelOrderParams>(
  '/orders/:orderId/cancel',
  async ({ params }) => {
    const { orderId } = params

    if (orderId === 'error-order-id') {
      return new HttpResponse(null, { status: 400 })
    } else {
      return new HttpResponse(null, { status: 204 })
    }
  },
)
