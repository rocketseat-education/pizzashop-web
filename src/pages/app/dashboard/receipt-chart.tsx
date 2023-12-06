import { useQuery } from '@tanstack/react-query'
import { subDays } from 'date-fns'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from 'recharts'
import { violet } from 'tailwindcss/colors'

import { getDailyReceiptInPeriod } from '@/api/get-daily-receipt-in-period'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { Label } from '@/components/ui/label'

interface ReceiptDataPerMonth {
  date: string
  receipt: number
}

export interface ReceiptChartProps {
  data: ReceiptDataPerMonth[]
}

function CustomTooltip({
  active,
  payload,
  label,
}: TooltipProps<number, number>) {
  if (active && payload && payload.length) {
    return (
      <div className="flex gap-1 rounded-l border bg-card p-2 text-sm text-card-foreground shadow-sm">
        <span className="font-semibold">{label}</span>
        <span>-</span>
        <span>
          {payload[0].value?.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </span>
      </div>
    )
  }

  return null
}

export function ReceiptChart() {
  const [period, setPeriod] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  })

  const {
    data: dailyReceiptInPeriod,
    isFetching: isLoadingDailyReceiptInPeriod,
  } = useQuery({
    queryKey: ['metrics', 'daily-receipt-in-period', period],
    queryFn: () =>
      getDailyReceiptInPeriod({
        from: period?.from,
        to: period?.to,
      }),
  })

  return (
    <Card className="col-span-6">
      <CardHeader className="flex flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="flex items-center gap-2 text-base font-medium">
            Receita no período
            {isLoadingDailyReceiptInPeriod && (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            )}
          </CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>
        <div className="flex items-center gap-3">
          <Label>Período</Label>
          <DateRangePicker date={period} onDateChange={setPeriod} />
        </div>
      </CardHeader>
      <CardContent>
        {dailyReceiptInPeriod ? (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={dailyReceiptInPeriod} style={{ fontSize: 12 }}>
              <XAxis
                dataKey="date"
                stroke="#888888"
                tickLine={false}
                axisLine={false}
                dy={16}
              />

              <YAxis
                stroke="#888888"
                tickLine={false}
                axisLine={false}
                width={80}
                dx={-8}
                tickFormatter={(value: number) =>
                  value.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })
                }
              />

              <CartesianGrid className="!stroke-muted" vertical={false} />

              <Line
                type="linear"
                strokeWidth={2}
                dataKey="receipt"
                stroke={violet['500']}
              />

              <Tooltip cursor={false} content={<CustomTooltip />} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-[240px] w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
