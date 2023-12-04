type OrderStatus =
  | 'pending'
  | 'approved'
  | 'canceled'
  | 'processing'
  | 'delivering'
  | 'delivered'

interface OrderStatusProps {
  status: OrderStatus
}

const orderStatusMap: Record<OrderStatus, string> = {
  pending: 'Pendente',
  approved: 'Aprovado',
  canceled: 'Cancelado',
  processing: 'Em preparo',
  delivering: 'Em entrega',
  delivered: 'Entregue',
}

export function OrderStatus({ status }: OrderStatusProps) {
  return (
    <div className="flex items-center gap-2">
      {['pending'].includes(status) && (
        <span className="h-2 w-2 rounded-full bg-slate-400" />
      )}

      {['canceled'].includes(status) && (
        <span className="h-2 w-2 rounded-full bg-rose-500" />
      )}

      {['processing', 'delivering'].includes(status) && (
        <span className="h-2 w-2 rounded-full bg-amber-500" />
      )}

      {['approved', 'delivered'].includes(status) && (
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
      )}

      <span className="text-xs font-medium text-muted-foreground">
        {orderStatusMap[status]}
      </span>
    </div>
  )
}
