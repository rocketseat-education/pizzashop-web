import { useMutation, useQueryClient } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowRight, Check, Search, X } from 'lucide-react'
import { useState } from 'react'

import { approveOrder } from '@/api/approve-order'
import { GetOrdersResponse } from '@/api/get-orders'
import { OrderStatus } from '@/components/order-status'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { OrderDetails } from './order-details'

export interface OrderTableRowProps {
  order: {
    orderId: string
    createdAt: string
    customerName: string
    total: number
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
  }
}

export function OrderTableRow({ order }: OrderTableRowProps) {
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false)
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
                status: 'processing',
              }
            }),
          })
        }
      },
    })

  return (
    <TableRow>
      <TableCell>
        <Dialog onOpenChange={setIsOrderDetailsOpen} open={isOrderDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>

          <OrderDetails open={isOrderDetailsOpen} orderId={order.orderId} />
        </Dialog>
      </TableCell>

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
        {order.status === 'processing' && (
          <Button className="w-full" variant="outline" size="xs">
            Em entrega
            <ArrowRight className="ml-2 h-3 w-3" />
          </Button>
        )}

        {order.status === 'delivering' && (
          <Button className="w-full" variant="outline" size="xs">
            Entregue
            <ArrowRight className="ml-2 h-3 w-3" />
          </Button>
        )}

        {order.status === 'pending' && (
          <Button className="w-full" variant="outline" size="xs">
            Aprovar
            <ArrowRight className="ml-2 h-3 w-3" />
          </Button>
        )}
      </TableCell>

      <TableCell>
        <Button
          onClick={() => approveOrderFn({ orderId: order.orderId })}
          disabled={!['pending', 'processing'].includes(order.status)}
          variant="ghost"
          size="xs"
        >
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}
