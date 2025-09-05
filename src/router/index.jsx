import { createBrowserRouter } from 'react-router-dom';
import CoreLayout from '../layouts/CoreLayout';
import Home from '../pages/Home';
import Document from '../pages/Document';
import Params from '../pages/Params';
import Arrange from '../pages/Arrange';
import Patient from '../pages/Patient';

function ForbiddenPage() {
    return (
        <div style={{ textAlign: 'center', marginTop: 80 }}>
            <h1>403 - Acesso Negado</h1>
            <p>Você não tem permissão para acessar esta página.</p>
        </div>
    );
}

const getUserRole = () => localStorage.getItem('userRole');

function ProtectedRoute({ allowedRoles, element }) {
    const role = getUserRole();
    if (!role || !allowedRoles.includes(role)) {
        return <ForbiddenPage />;
    }
    return element;
}

export const router = createBrowserRouter([
    {
        path: '/',
        element: <CoreLayout />,
        children: [
            { index: true, element: <ProtectedRoute allowedRoles={['ADMIN']} element={<Home />} /> },
            { path: '/doc/', element: <ProtectedRoute allowedRoles={['ADMIN', 'TECHNICIAN']} element={<Document />} /> },
            { path: '/doc/:id/', element: <ProtectedRoute allowedRoles={['ADMIN', 'TECHNICIAN']} element={<Arrange />} /> },
            { path: '/param/', element: <ProtectedRoute allowedRoles={['ADMIN']} element={<Params />} /> },
            { path: '/patient/', element: <ProtectedRoute allowedRoles={['ADMIN']} element={<Patient />} /> },
        ]
    }
]);
