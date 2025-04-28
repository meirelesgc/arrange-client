import { createBrowserRouter } from 'react-router-dom'
import CoreLayout from '../layouts/CoreLayout'
import Home from '../pages/Home'
import Document from '../pages/Document'
import Params from '../pages/Params'

export const router = createBrowserRouter([
    {
        path: '/', element: <CoreLayout />, children:
            [
                { index: true, element: <Home /> },
                { path: '/doc/', element: <Document /> },
                { path: '/param/', element: <Params /> }
            ]
    }
])
