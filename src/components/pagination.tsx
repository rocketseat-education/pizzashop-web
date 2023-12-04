import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import { Button } from './ui/button'

interface PaginationProps {
  pageIndex: number
  totalCount: number
  onPageChange: (pageIndex: number) => Promise<void>
}

export function Pagination({
  pageIndex,
  totalCount,
  onPageChange,
}: PaginationProps) {
  const pages = Math.floor(totalCount / 10)

  return (
    <div className="flex items-center space-x-6 lg:space-x-8">
      <div className="flex w-[100px] items-center justify-center text-sm font-medium">
        Página {pageIndex + 1} de {pages}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => onPageChange(0)}
          disabled={pageIndex === 0}
        >
          <span className="sr-only">Primeira página</span>
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => onPageChange(pageIndex - 1)}
          disabled={pageIndex === 0}
        >
          <span className="sr-only">Página anterior</span>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => onPageChange(pageIndex + 1)}
          disabled={pages < pageIndex + 1}
        >
          <span className="sr-only">Próxima página</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => onPageChange(pages)}
          disabled={pages < pageIndex + 1}
        >
          <span className="sr-only">Última página</span>
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
