import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";
import SkeletonLoading from "../components/SkeletonLoading"; 

type Props = { children: React.ReactNode };

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const user = useAuthStore((state) => state.user);
  const hasHydrated = useAuthStore((state) => state._hasHydrated);

  if (!hasHydrated) {
    return <SkeletonLoading />;
  }

  // Si no hay usuario, redirigir al login
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  // Si hay usuario, renderizar los hijos
  return <>{children}</>;
};

export default ProtectedRoute;

