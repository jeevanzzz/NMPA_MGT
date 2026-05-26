import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Role } from '../types/auth';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: Role[];
}

export const RoleGuard = ({ children, allowedRoles }: RoleGuardProps) => {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};
