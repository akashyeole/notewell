import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

const ProtectedRoute = () => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.token
            ? <Outlet/>
            : <Navigate to='/user' state={{from: location}} replace/>
    );
};

export default ProtectedRoute;