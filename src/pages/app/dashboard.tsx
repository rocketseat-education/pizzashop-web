import { BarChart, DollarSign, Star, Utensils } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { SalesPerProductChart } from './products-ranking-chart'
import { ReceiptChart } from './receipt-chart'

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-semibold">
                Receita total (mês)
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-1">
              <span className="text-2xl font-bold">R$ 17.323,23</span>
              <p className="text-xs text-muted-foreground">
                +20% em relação ao mês passado
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-semibold">
                Pedidos no mês
              </CardTitle>
              <Utensils className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-1">
              <span className="text-2xl font-bold">237</span>
              <p className="text-xs text-muted-foreground">
                +24% em relação ao mês passado
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-semibold">
                Pedidos no dia
              </CardTitle>
              <Utensils className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-1">
              <span className="text-2xl font-bold">25</span>
              <p className="text-xs text-muted-foreground">
                +18% em relação a ontem
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-semibold">
                Média de avaliações
              </CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-1">
              <span className="text-2xl font-bold">4.5</span>
              <p className="text-xs text-muted-foreground">
                +0.3 em relação ao mês passado
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-9 gap-4">
          <Card className="col-span-6">
            <CardHeader className="pb-8">
              <div className="flex flex-row items-center justify-between">
                <CardTitle className="text-base font-medium">
                  Receita diária
                </CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </div>
              <CardDescription>
                Receita diária dos últimos 15 dias
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ReceiptChart
                data={[
                  {
                    date: '01/01',
                    receipt: Math.round(Math.random() * 2000),
                  },
                  {
                    date: '01/01',
                    receipt: Math.round(Math.random() * 2000),
                  },
                  {
                    date: '01/01',
                    receipt: Math.round(Math.random() * 2000),
                  },
                  {
                    date: '01/01',
                    receipt: Math.round(Math.random() * 2000),
                  },
                  {
                    date: '01/01',
                    receipt: Math.round(Math.random() * 2000),
                  },
                  {
                    date: '01/01',
                    receipt: Math.round(Math.random() * 2000),
                  },
                  {
                    date: '01/01',
                    receipt: Math.round(Math.random() * 2000),
                  },
                  {
                    date: '01/01',
                    receipt: Math.round(Math.random() * 2000),
                  },
                  {
                    date: '01/01',
                    receipt: Math.round(Math.random() * 2000),
                  },
                  {
                    date: '01/01',
                    receipt: Math.round(Math.random() * 2000),
                  },
                  {
                    date: '01/01',
                    receipt: Math.round(Math.random() * 2000),
                  },
                ]}
              />
            </CardContent>
          </Card>

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
