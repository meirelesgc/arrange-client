import { router } from './router'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { ApiHealthProvider } from './context/ApiHealthContext'

import './index.css'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <ApiHealthProvider>
            <RouterProvider router={router} />
        </ApiHealthProvider>
    </QueryClientProvider>
)
