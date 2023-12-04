import { OrderStatus } from '@/components/order-status'
import { TableRow, TableCell } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Check } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { approveOrder } from '@/api/approve-order'
import { GetOrdersResponse } from '@/api/get-orders'

export interface OrderTableRowProps {
  order: {
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
  }
}

export function OrderTableRow({ order }: OrderTableRowProps) {
  const queryClient = useQueryClient()

  const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } =
    useMutation({
      mutationFn: approveOrder,
      onSuccess: async (_, { orderId }) => {
        const ordersCache = queryClient.getQueryData<GetOrdersResponse>([
          'orders',
        ])

        if (ordersCache) {
          queryClient.setQueryData<GetOrdersResponse>(['orders'], {
            ...ordersCache,
            orders: ordersCache.orders.map((order) => {
              if (order.orderId !== orderId) {
                return order
              }

              return {
                ...order,
                status: 'approved',
              }
            }),
          })
        }
      },
    })

  return (
    <TableRow>
      <TableCell className="font-mono text-xs font-medium">
        {order.orderId}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(new Date(order.createdAt), {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>
      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>
      <TableCell className="font-medium">{order.customerName}</TableCell>
      <TableCell>
        <div className="flex flex-col gap-0.5">
          <span className="font-medium">
            {(order.total / 100).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
          <span className="text-xs text-muted-foreground">3 produto(s)</span>
        </div>
      </TableCell>
      <TableCell>
        {order.status === 'pending' && (
          <Button
            onClick={() => approveOrderFn({ orderId: order.orderId })}
            disabled={isApprovingOrder}
            variant="outline"
            size="xs"
          >
            <Check className="mr-2 h-3 w-3" />
            Aprovar
          </Button>
        )}
      </TableCell>
    </TableRow>
  )
}
