import { Pizza, Home, UtensilsCrossed, Star, ClipboardList } from 'lucide-react'
import { ThemeToggle } from './theme-toggle'
import { NavLink } from './nav-link'
import { AccountMenu } from './account-menu'
import { Separator } from './ui/separator'
import { Label } from './ui/label'
import { Switch } from './ui/switch'

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-4 px-4">
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

        <div className="ml-auto flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <Label
              htmlFor="store-open"
              className="flex flex-col gap-0.5 text-sm"
            >
              Loja aberta?
            </Label>
            <Switch id="store-open" />
          </div>

          <Separator orientation="vertical" className="h-6" />

          <ThemeToggle />
          <AccountMenu />
        </div>
      </div>
    </div>
  )
}
