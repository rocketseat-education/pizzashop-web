import { Helmet } from 'react-helmet-async'

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
import { Loader2Icon, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FormEvent } from 'react'

export function Orders() {
  const [searchParams, setSearchParams] = useSearchParams()

  const pageIndex = searchParams.get('page')
    ? Number(searchParams.get('page'))
    : 0

  const orderId = searchParams.get('orderId')
  const customerName = searchParams.get('customerName')

  const { data: result, isFetching: isFetchingOrders } = useQuery({
    queryKey: ['orders', customerName, orderId, pageIndex],
    queryFn: () => getOrders({ pageIndex, customerName, orderId }),
    placeholderData: keepPreviousData,
  })

  function handlePaginate(pageIndex: number) {
    setSearchParams((prev) => {
      prev.set('page', pageIndex.toString())

      return prev
    })
  }

  function handleFilter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget

    const formData = new FormData(form)
    const data = Object.fromEntries(formData)

    const orderId = data.orderId.toString()
    const customerName = data.customerName.toString()
    const status = data.status.toString()

    setSearchParams((prev) => {
      if (orderId) {
        prev.set('orderId', orderId)
      } else {
        prev.delete('orderId')
      }

      if (customerName) {
        prev.set('customerName', customerName)
      } else {
        prev.delete('customerName')
      }

      if (status) {
        prev.set('status', status)
      } else {
        prev.delete('status')
      }

      prev.set('page', '0')

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
        <div className="space-y-2.5">
          <form onSubmit={handleFilter} className="flex items-center gap-2">
            <span className="text-sm font-semibold">Filtros:</span>
            <Input
              name="orderId"
              placeholder="ID do pedido"
              className="h-8 w-auto"
              defaultValue={orderId ?? ''}
            />
            <Input
              name="customerName"
              placeholder="Nome do cliente"
              className="h-8 w-[320px]"
              defaultValue={customerName ?? ''}
            />
            <Select name="status">
              <SelectTrigger className="h-8 w-[180px]">
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
            <Button type="submit" variant="secondary" size="xs">
              <Search className="mr-2 h-4 w-4" />
              Filtrar resultados
            </Button>
          </form>
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
