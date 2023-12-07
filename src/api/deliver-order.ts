import { api } from '@/lib/axios'

interface DeliverOrderRequest {
  orderId: string
}

export async function deliverOrder({ orderId }: DeliverOrderRequest) {
  await api.patch(`/orders/${orderId}/deliver`)
}
