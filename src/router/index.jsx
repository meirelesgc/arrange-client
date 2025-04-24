import { createBrowserRouter } from 'react-router-dom'
import CoreLayout from '../layouts/CoreLayout'
import Home from '../pages/Home'

export const router = createBrowserRouter([
    {
        path: '/', element: <CoreLayout />, children:
            [{ index: true, element: <Home /> }]
    }
])
