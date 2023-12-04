import { api } from '@/lib/axios'

// interface GetOrdersQuery {
//   customerName?: string | null
//   orderNumber?: string | null
//   pageIndex?: number | null
// }

interface GetOrdersResponse {
  orders: {
    orderId: string
    createdAt: string
    customerName: string
    total: number
    status:
      | 'pending'
      | 'approved'
      | 'canceled'
      | 'processing'
      | 'delivering'
      | 'delivered'
  }[]
  meta: {
    pageIndex: number
    totalCount: number
  }
}

export async function getOrders() {
  const response = await api.get<GetOrdersResponse>('/orders', {
    // params: data,
    params: {
      pageIndex: 0,
    },
  })

  return response.data
}
