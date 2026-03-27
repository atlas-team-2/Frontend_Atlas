export function useAuth() {
  const isAuth = false;
  const role: 'admin' | 'user' | null = null;

  return { isAuth, role };
}
