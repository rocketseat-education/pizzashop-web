import { useMutation, useQueryClient } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowRight, Loader2, Search, X } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { approveOrder } from '@/api/approve-order'
import { cancelOrder } from '@/api/cancel-order'
import { deliverOrder } from '@/api/deliver-order'
import { dispatchOrder } from '@/api/dispatch-order'
import { GetOrdersResponse } from '@/api/get-orders'
import { OrderStatus } from '@/components/order-status'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { OrderDetails } from './order-details'

type OrderStatus =
  | 'pending'
  | 'canceled'
  | 'processing'
  | 'delivering'
  | 'delivered'

export interface OrderTableRowProps {
  order: {
    orderId: string
    createdAt: string
    customerName: string
    total: number
    status: OrderStatus
  }
}

export function OrderTableRow({ order }: OrderTableRowProps) {
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false)
  const queryClient = useQueryClient()

  function updateOrderStatusOnCache(orderId: string, status: OrderStatus) {
    const ordersListingCache = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ['orders'],
    })

    console.log(ordersListingCache)

    ordersListingCache.forEach(([cacheKey, cached]) => {
      if (!cached) {
        return
      }

      queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
        ...cached,
        orders: cached.orders.map((order) => {
          if (order.orderId !== orderId) {
            return order
          }

          return {
            ...order,
            status,
          }
        }),
      })
    })

    toast.success('Pedido alterado com sucesso!')
  }

  const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } =
    useMutation({
      mutationFn: approveOrder,
      onSuccess: async (_, { orderId }) => {
        updateOrderStatusOnCache(orderId, 'processing')
      },
    })

  const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } =
    useMutation({
      mutationFn: cancelOrder,
      onSuccess: async (_, { orderId }) => {
        updateOrderStatusOnCache(orderId, 'canceled')
      },
    })

  const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } =
    useMutation({
      mutationFn: dispatchOrder,
      onSuccess: async (_, { orderId }) => {
        updateOrderStatusOnCache(orderId, 'delivering')
      },
    })

  const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } =
    useMutation({
      mutationFn: deliverOrder,
      onSuccess: async (_, { orderId }) => {
        updateOrderStatusOnCache(orderId, 'delivered')
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
          <Button
            variant="outline"
            size="xs"
            disabled={isDispatchingOrder}
            onClick={() => dispatchOrderFn({ orderId: order.orderId })}
          >
            Em entrega
            {isDispatchingOrder ? (
              <Loader2 className="ml-2 h-3 w-3 animate-spin" />
            ) : (
              <ArrowRight className="ml-2 h-3 w-3" />
            )}
          </Button>
        )}

        {order.status === 'delivering' && (
          <Button
            variant="outline"
            size="xs"
            disabled={isDeliveringOrder}
            onClick={() => deliverOrderFn({ orderId: order.orderId })}
          >
            Entregue
            {isDeliveringOrder ? (
              <Loader2 className="ml-2 h-3 w-3 animate-spin" />
            ) : (
              <ArrowRight className="ml-2 h-3 w-3" />
            )}
          </Button>
        )}

        {order.status === 'pending' && (
          <Button
            variant="outline"
            size="xs"
            disabled={isApprovingOrder}
            onClick={() => approveOrderFn({ orderId: order.orderId })}
          >
            Aprovar
            {isApprovingOrder ? (
              <Loader2 className="ml-2 h-3 w-3 animate-spin" />
            ) : (
              <ArrowRight className="ml-2 h-3 w-3" />
            )}
          </Button>
        )}
      </TableCell>

      <TableCell>
        <Button
          onClick={() => cancelOrderFn({ orderId: order.orderId })}
          disabled={
            !['pending', 'processing'].includes(order.status) ||
            isCancelingOrder
          }
          variant="ghost"
          size="xs"
        >
          {isCancelingOrder ? (
            <Loader2 className="mr-2 h-3 w-3 animate-spin" />
          ) : (
            <ArrowRight className="mr-2 h-3 w-3" />
          )}
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}
