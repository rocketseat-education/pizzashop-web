import { Helmet } from 'react-helmet-async'

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
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { getOrders } from '@/api/get-orders'
import { OrderTableRow } from './order-table-row'
import { Pagination } from '@/components/pagination'
import { Loader2Icon } from 'lucide-react'

export function Orders() {
  const [searchParams, setSearchParams] = useSearchParams()

  const pageIndex = searchParams.get('page')
    ? Number(searchParams.get('page'))
    : 0

  const { data: result, isFetching: isFetchingOrders } = useQuery({
    queryKey: ['orders', pageIndex],
    queryFn: () => getOrders({ pageIndex }),
    placeholderData: keepPreviousData,
  })

  function handlePaginate(pageIndex: number) {
    setSearchParams((prev) => {
      prev.set('page', pageIndex.toString())

      return prev
    })
  }

  return (
    <>
      <Helmet title="Pedidos" />
      <div className="flex flex-col gap-4">
        <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
          Pedidos
          {isFetchingOrders && (
            <Loader2Icon className="h-5 w-5 animate-spin text-muted-foreground" />
          )}
        </h1>
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
                    return <OrderTableRow key={order.orderId} order={order} />
                  })}
              </TableBody>
            </Table>
          </div>
          {result && (
            <Pagination
              pageIndex={pageIndex}
              totalCount={result.meta.totalCount}
              perPage={result.meta.perPage}
              onPageChange={handlePaginate}
            />
          )}
        </div>
      </div>
    </>
  )
}
