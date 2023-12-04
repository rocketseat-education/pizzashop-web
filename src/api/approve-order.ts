import { api } from '@/lib/axios'

interface ApproveOrderRequest {
  orderId: string
}

export async function approveOrder({ orderId }: ApproveOrderRequest) {
  await api.patch(`/orders/${orderId}/approve`)
}
