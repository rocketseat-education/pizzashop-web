import { api } from '@/lib/axios'

interface GetOrdersQuery {
  pageIndex?: number | null
  customerName?: string | null
  orderId?: string | null
}

export interface GetOrdersResponse {
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
    perPage: number
  }
}

export async function getOrders({
  pageIndex,
  customerName,
  orderId,
}: GetOrdersQuery) {
  const response = await api.get<GetOrdersResponse>('/orders', {
    // params: data,
    params: {
      pageIndex,
      customerName,
      orderId,
    },
  })

  return response.data
}
