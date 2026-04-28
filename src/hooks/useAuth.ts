import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export function useAuth(requireAuth = true) {
  const { user, loading } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (requireAuth && !user) navigate('/login', { replace: true });
    if (!requireAuth && user) navigate('/dashboard', { replace: true });
  }, [user, loading, requireAuth, navigate]);

  return { user, loading };
}
