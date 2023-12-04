import { Button } from './ui/button'
import { Building, ChevronDown, LogOut } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from './ui/dropdown-menu'
import { Dialog, DialogTrigger } from './ui/dialog'
import { StoreProfile } from './store-profile'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'

export function AccountMenu() {
  const { data } = useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const response = await api.get('/me')

      return response.data
    },
  })

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-1.5">
            Minha loja
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Conta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DialogTrigger asChild>
              <DropdownMenuItem>
                <Building className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </DropdownMenuItem>
            </DialogTrigger>
            <DropdownMenuItem className="text-rose-500 dark:text-rose-400">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <StoreProfile />
    </Dialog>
  )
}
