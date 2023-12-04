import { Helmet } from 'react-helmet-async'
import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { Button } from '@/components/ui/button'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useQuery } from '@tanstack/react-query'
import { getOrders } from '@/api/get-orders'
import { OrderStatus } from '@/components/order-status'
import { Check } from 'lucide-react'

export function Orders() {
  const { data: result, isLoading: isLoadingOrders } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
  })

  return (
    <>
      <Helmet title="Pedidos" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <DateRangePicker />
            <Input placeholder="Nº do pedido" className="w-auto" />
            <Input placeholder="Nome do cliente" className="w-[320px]" />
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status do pedido" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="accepted">Aceito</SelectItem>
                <SelectItem value="preparing">Em preparo</SelectItem>
                <SelectItem value="delivering">Em entrega</SelectItem>
                <SelectItem value="delivered">Entregue</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[140px]">Identificador</TableHead>
                  <TableHead className="w-[140px]">Realizado há</TableHead>
                  <TableHead className="w-[140px]">Status</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="w-[140px]">Total do pedido</TableHead>
                  <TableHead className="w-[140px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result &&
                  result.orders.map((order) => {
                    return (
                      <TableRow key={order.orderId}>
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
                        <TableCell className="font-medium">
                          {order.customerName}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-0.5">
                            <span className="font-medium">
                              {(order.total / 100).toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                              })}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              3 produto(s)
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {order.status === 'pending' && (
                            <Button variant="outline" size="xs">
                              <Check className="mr-2 h-3 w-3" />
                              Aprovar
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    )
                  })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  )
}
