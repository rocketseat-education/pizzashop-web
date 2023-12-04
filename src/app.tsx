import './index.css'

import { RouterProvider } from 'react-router-dom'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import { ThemeProvider } from './components/theme-provider'
import { router } from './routes'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'
import { Toaster } from 'sonner'

export function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | pizza.shop" />
      <ThemeProvider defaultTheme="light" storageKey="ifood-theme">
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <Toaster />
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}
