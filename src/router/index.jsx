import { createBrowserRouter } from 'react-router-dom';
import CoreLayout from '../layouts/CoreLayout';
import Home from '../pages/Home';
import Document from '../pages/Document';
import Params from '../pages/Params';
import Arrange from '../pages/Arrange';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <CoreLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: '/doc/', element: <Document /> },
            { path: '/doc/:id/', element: <Arrange /> },
            { path: '/param/', element: <Params /> }
        ]
    }
]);
