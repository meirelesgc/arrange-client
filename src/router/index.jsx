import { createBrowserRouter } from 'react-router-dom'
import CoreLayout from '../layouts/CoreLayout'
import Home from '../pages/Home'
import Document from '../pages/Document'

export const router = createBrowserRouter([
    {
        path: '/', element: <CoreLayout />, children:
            [
                { index: true, element: <Home /> },
                { path: '/doc/', element: <Document /> }
            ]
    }
])
