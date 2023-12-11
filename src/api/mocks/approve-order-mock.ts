import { http, HttpResponse } from 'msw'

import { ApproveOrderParams } from '../approve-order'

export const approveOrderMock = http.put<ApproveOrderParams>(
  '/orders/:orderId/approve',
  async ({ params }) => {
    const { orderId } = params

    if (orderId === 'error-order-id') {
      return new HttpResponse(null, { status: 400 })
    } else {
      return new HttpResponse(null, { status: 204 })
    }
  },
)
