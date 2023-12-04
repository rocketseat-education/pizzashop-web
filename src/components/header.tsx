import { Pizza, Home, UtensilsCrossed, Star, ClipboardList } from 'lucide-react'
import { ThemeToggle } from './theme-toggle'
import { NavLink } from './nav-link'
import { AccountMenu } from './account-menu'
import { Separator } from './ui/separator'

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-4 px-6">
        <Pizza className="h-6 w-6" />

        <Separator orientation="vertical" className="h-6" />

        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink to="/">
            <Home className="h-4 w-4" />
            Início
          </NavLink>
          <NavLink to="/orders">
            <UtensilsCrossed className="h-4 w-4" />
            Pedidos
          </NavLink>
          <NavLink to="/evaluations">
            <Star className="h-4 w-4" />
            Avaliações
          </NavLink>
          <NavLink to="/menu">
            <ClipboardList className="h-4 w-4" />
            Cardápio
          </NavLink>
        </nav>

        <div className="ml-auto flex items-center space-x-2">
          <ThemeToggle />
          <AccountMenu />
        </div>
      </div>
    </div>
  )
}
