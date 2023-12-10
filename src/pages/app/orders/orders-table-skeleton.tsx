import { Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'

export function OrdersTableSkeleton() {
  return (
    <>
      {Array.from({ length: 10 }).map((_, i) => {
        return (
          <TableRow key={i}>
            <TableCell>
              <Button variant="outline" size="xs" disabled>
                <Search className="h-3 w-3" />
                <span className="sr-only">Detalhes do pedido</span>
              </Button>
            </TableCell>

            <TableCell className="font-mono text-xs font-medium">
              <Skeleton className="h-4 w-[172px]" />
            </TableCell>

            <TableCell className="text-muted-foreground">
              <Skeleton className="h-4 w-[148px]" />
            </TableCell>

            <TableCell>
              <Skeleton className="h-4 w-[110px]" />
            </TableCell>

            <TableCell className="font-medium">
              <Skeleton className="h-4 w-[200px]" />
            </TableCell>

            <TableCell>
              <div className="flex flex-col gap-0.5">
                <Skeleton className="h-5 w-[64px]" />
                <Skeleton className="h-4 w-[80px]" />
              </div>
            </TableCell>

            <TableCell>
              <Skeleton className="h-4 w-[92px]" />
            </TableCell>

            <TableCell>
              <Skeleton className="h-4 w-[92px]" />
            </TableCell>
          </TableRow>
        )
      })}
    </>
  )
}
