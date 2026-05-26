import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Role } from '../types/auth';

interface HasRoleProps {
  children: React.ReactNode;
  allowedRoles: Role[];
  fallback?: React.ReactNode;
}

/**
 * Module-level access control component.
 * Conditionally renders children only if the current user has one of the allowed roles.
 */
export const HasRole = ({ children, allowedRoles, fallback = null }: HasRoleProps) => {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.role)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
