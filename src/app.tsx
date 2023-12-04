import './index.css'

import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider'
import { router } from './routes'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'
import { Toaster } from 'sonner'

export function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="ifood-theme">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  )
}
