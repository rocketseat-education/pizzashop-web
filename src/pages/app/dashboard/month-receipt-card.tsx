import { useQuery } from '@tanstack/react-query'
import { DollarSign, Loader2 } from 'lucide-react'

import { getMonthReceipt } from '@/api/get-month-receipt'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { CardSkeleton } from './card-skeleton'

export function MonthReceiptCard() {
  const { data: monthReceipt, isFetching: isLoadingMonthReceipt } = useQuery({
    queryKey: ['metrics', 'month-receipt'],
    queryFn: getMonthReceipt,
  })

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Receita total (mês)
        </CardTitle>
        {isLoadingMonthReceipt ? (
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        ) : (
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        )}
      </CardHeader>
      <CardContent className="space-y-1">
        {monthReceipt ? (
          <>
            <span className="text-2xl font-bold">
              {monthReceipt.receipt.toLocaleString('pt-BR', {
                currency: 'BRL',
                style: 'currency',
              })}
            </span>
            <p className="text-xs text-muted-foreground">
              <span
                className={
                  monthReceipt.diffFromLastMonth > 0
                    ? 'text-emerald-500'
                    : 'text-red-500'
                }
              >
                {monthReceipt.diffFromLastMonth > 0
                  ? `+${monthReceipt.diffFromLastMonth}`
                  : monthReceipt.diffFromLastMonth}
                %
              </span>{' '}
              em relação ao mês passado
            </p>
          </>
        ) : (
          <CardSkeleton />
        )}
      </CardContent>
    </Card>
  )
}
