import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../../context/ToastContext';
import { useEffect } from 'react';
import { Role } from '../types/auth';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: Role[];
}

export const RoleGuard = ({ children, allowedRoles }: RoleGuardProps) => {
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user && !allowedRoles.includes(user.role)) {
      toast('warning', 'Security verification required');
    }
  }, [user, allowedRoles, toast]);

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};
