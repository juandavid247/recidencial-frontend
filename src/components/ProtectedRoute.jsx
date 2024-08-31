import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth-context';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  
  return user ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
