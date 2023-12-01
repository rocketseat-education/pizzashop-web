import { createBrowserRouter } from 'react-router-dom'

import { Dashboard } from './pages/dashboard'
import { SignIn } from './pages/auth/sign-in'
import { AuthLayout } from './pages/_layouts/auth'
import { SignUp } from './pages/auth/sign-up'
import { AppLayout } from './pages/_layouts/app'
import { NotFound } from './pages/404'
import { Orders } from './pages/app/orders/orders'
import { Evaluations } from './pages/app/evaluations/evaluations'
import { Menu } from './pages/app/menu/menu'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/orders',
        element: <Orders />,
      },
      {
        path: '/evaluations',
        element: <Evaluations />,
      },
      {
        path: '/menu',
        element: <Menu />,
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/sign-in',
        element: <SignIn />,
      },
      {
        path: '/sign-up',
        element: <SignUp />,
      },
    ],
  },
])
