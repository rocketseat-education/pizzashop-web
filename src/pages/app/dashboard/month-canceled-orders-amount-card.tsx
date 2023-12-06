import { useQuery } from '@tanstack/react-query'
import { DollarSign, Loader2 } from 'lucide-react'

import { getMonthCanceledOrdersAmount } from '@/api/get-month-canceled-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function MonthCanceledOrdersAmountCard() {
  const {
    data: monthCanceledOrdersAmount,
    isFetching: isLoadingMonthCanceledOrdersAmount,
  } = useQuery({
    queryKey: ['metrics', 'month-canceled-orders-amount'],
    queryFn: getMonthCanceledOrdersAmount,
  })

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Cancelamentos (mês)
        </CardTitle>
        {isLoadingMonthCanceledOrdersAmount ? (
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        ) : (
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        )}
      </CardHeader>
      <CardContent className="space-y-1">
        {monthCanceledOrdersAmount && (
          <>
            <span className="text-2xl font-bold">
              {monthCanceledOrdersAmount.amount.toLocaleString('pt-BR')}
            </span>
            <p className="text-xs text-muted-foreground">
              <span
                className={
                  monthCanceledOrdersAmount.diffFromLastMonth < 0
                    ? 'text-emerald-500'
                    : 'text-red-500'
                }
              >
                {monthCanceledOrdersAmount.diffFromLastMonth > 0
                  ? `+${monthCanceledOrdersAmount.diffFromLastMonth}`
                  : monthCanceledOrdersAmount.diffFromLastMonth}
                %
              </span>{' '}
              em relação ao mês passado
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
