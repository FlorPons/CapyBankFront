import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const user = useAuthStore((state) => state.user);

  // Si no hay usuario, redirige al login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, muestra el contenido
  return <>{children}</>;
};

export default ProtectedRoute;

