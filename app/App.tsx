import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './auth/context/AuthContext';

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ToastProvider>
  );
}
