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
      <div className="flex flex-col gap-2 rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
        <span className="text-base font-semibold">{label}</span>
        <div className="flex flex-col gap-1">
          <span className="">
            <span className="font-semibold">Receita:</span>{' '}
            {payload[0].value?.toLocaleString('pt-BR')}
          </span>
        </div>
      </div>
    )
  }

  return null
}

export function ReceiptChart({ data }: ReceiptChartProps) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data} style={{ fontSize: 12 }}>
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

        <Tooltip content={<CustomTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  )
}
