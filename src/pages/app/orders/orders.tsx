import { Helmet } from 'react-helmet-async'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'

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
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { getOrders } from '@/api/get-orders'
import { OrderTableRow } from './order-table-row'
import { Pagination } from '@/components/pagination'
import { Loader2Icon, Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ordersFiltersSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional(),
})

type OrderFiltersSchema = z.infer<typeof ordersFiltersSchema>

export function Orders() {
  const [searchParams, setSearchParams] = useSearchParams()

  const orderId = searchParams.get('orderId')
  const customerName = searchParams.get('customerName')
  const status = searchParams.get('status')

  const { register, handleSubmit, reset, control } =
    useForm<OrderFiltersSchema>({
      defaultValues: {
        orderId: orderId ?? '',
        customerName: customerName ?? '',
        status: status ?? '',
      },
    })

  const pageIndex = searchParams.get('page')
    ? Number(searchParams.get('page'))
    : 0

  const hasAnyFilter = !!orderId || !!customerName || !!status

  const { data: result, isFetching: isFetchingOrders } = useQuery({
    queryKey: ['orders', customerName, orderId, status, pageIndex],
    queryFn: () => getOrders({ pageIndex, customerName, orderId, status }),
    placeholderData: keepPreviousData,
  })

  function handlePaginate(pageIndex: number) {
    setSearchParams((prev) => {
      prev.set('page', pageIndex.toString())

      return prev
    })
  }

  function handleFilter(data: OrderFiltersSchema) {
    const orderId = data.orderId?.toString()
    const customerName = data.customerName?.toString()
    const status = data.status?.toString()

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

  function handleClearFilters() {
    setSearchParams((prev) => {
      prev.delete('orderId')
      prev.delete('customerName')
      prev.delete('status')
      prev.set('page', '0')

      return prev
    })

    reset({
      orderId: '',
      customerName: '',
      status: '',
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
          <form
            onSubmit={handleSubmit(handleFilter)}
            className="flex items-center gap-2"
          >
            <span className="text-sm font-semibold">Filtros:</span>
            <Input
              placeholder="ID do pedido"
              className="h-8 w-auto"
              {...register('orderId')}
            />
            <Input
              placeholder="Nome do cliente"
              className="h-8 w-[320px]"
              {...register('customerName')}
            />
            <Controller
              control={control}
              name="status"
              render={({ field: { name, onChange, value, disabled } }) => {
                return (
                  <Select
                    name={name}
                    onValueChange={onChange}
                    value={value}
                    disabled={disabled}
                  >
                    <SelectTrigger className="h-8 w-[180px]">
                      <SelectValue placeholder="Status do pedido" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pendente</SelectItem>
                      <SelectItem value="approved">Aprovado</SelectItem>
                      <SelectItem value="canceled">Cancelado</SelectItem>
                      <SelectItem value="processing">Em preparo</SelectItem>
                      <SelectItem value="delivering">Em entrega</SelectItem>
                      <SelectItem value="delivered">Entregue</SelectItem>
                    </SelectContent>
                  </Select>
                )
              }}
            />

            <Button type="submit" variant="secondary" size="xs">
              <Search className="mr-2 h-4 w-4" />
              Filtrar resultados
            </Button>
            <Button
              type="button"
              variant="outline"
              size="xs"
              disabled={!hasAnyFilter}
              onClick={handleClearFilters}
            >
              <X className="mr-2 h-4 w-4" />
              Remover filtros
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

                {result && result.orders.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="py-10 text-center text-muted-foreground"
                    >
                      Nenhum resultado encontrado.
                    </TableCell>
                  </TableRow>
                )}
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
