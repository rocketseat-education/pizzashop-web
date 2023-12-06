import { BarChart, DollarSign, Star, Utensils } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { DayOrdersAmountCard } from './day-orders-amount-card'
import { MonthCanceledOrdersAmountCard } from './month-canceled-orders-amount-card'
import { MonthOrdersAmountCard } from './month-orders-amount-card'
import { MonthReceiptCard } from './month-receipt-card'
import { SalesPerProductChart } from './products-ranking-chart'
import { ReceiptChart } from './receipt-chart'

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <div className="grid grid-cols-4 gap-4">
          <MonthReceiptCard />
          <MonthOrdersAmountCard />
          <DayOrdersAmountCard />
          <MonthCanceledOrdersAmountCard />
        </div>

        <div className="grid grid-cols-9 gap-4">
          <ReceiptChart />

          <Card className="col-span-3">
            <CardHeader className="pb-8">
              <div className="flex flex-row items-center justify-between">
                <CardTitle className="text-base font-medium">
                  Produtos populares
                </CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </div>
              <CardDescription>Produtos com mais vendas</CardDescription>
            </CardHeader>
            <CardContent>
              <SalesPerProductChart
                data={[
                  {
                    product: 'Sample Product 01',
                    amount: Math.round(Math.random() * 100),
                  },
                  {
                    product: 'Sample Product 02',
                    amount: Math.round(Math.random() * 100),
                  },
                  {
                    product: 'Sample Product 03',
                    amount: Math.round(Math.random() * 100),
                  },
                  {
                    product: 'Sample Product 04',
                    amount: Math.round(Math.random() * 100),
                  },
                ]}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
