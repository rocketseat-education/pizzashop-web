import {
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
} from 'recharts'
import colors from 'tailwindcss/colors'

interface AmountSalesPerProduct {
  product: string
  amount: number
}

export interface SalesPerProductChartProps {
  data: AmountSalesPerProduct[]
}

function CustomTooltip({ active, payload }: TooltipProps<number, number>) {
  if (active && payload && payload.length) {
    console.log(payload)
    return (
      <div className="flex flex-col gap-2 rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
        <span className="text-base font-semibold">{payload[0].name}</span>
        <div className="flex flex-col gap-1">
          <span className="">
            <span className="font-semibold">Vendas:</span> {payload[0].value}
          </span>
        </div>
      </div>
    )
  }

  return null
}

const COLORS = [
  colors.sky[500],
  colors.amber[500],
  colors.violet[500],
  colors.emerald[500],
]

export function SalesPerProductChart({ data }: SalesPerProductChartProps) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart style={{ fontSize: 14 }}>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="product"
          cx="50%"
          cy="50%"
          outerRadius={86}
          innerRadius={64}
          strokeWidth={8}
          fill={colors.emerald['500']}
          label
          labelLine={false}
        >
          {data.map((_, index) => {
            return (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                className="stroke-background hover:opacity-80"
              />
            )
          })}
        </Pie>

        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  )
}
