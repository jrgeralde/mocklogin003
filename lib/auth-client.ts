import { useState, useEffect } from 'react';

export type User = {
  id: string;
  name: string;
};

export type Session = {
  user: User | null;
};

export type SessionData = {
  data: Session | null;
  isPending: boolean;
};

export function useSession(): SessionData {
  const [session, setSession] = useState<Session | null>(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const checkSession = () => {
      if (typeof window === 'undefined') {
        setIsPending(false);
        return;
      }

      const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

      if (isLoggedIn) {
         setSession({
          user: {
            id: 'mock-admin-id',
            name: 'Admin User'
          }
        });
      } else {
        setSession({ user: null });
      }
      setIsPending(false);
    };

    checkSession();

    const handleAuthChange = () => {
      checkSession();
    };

    // Listen for custom event (same tab) and storage event (cross-tab)
    window.addEventListener('mock-auth-change', handleAuthChange);
    window.addEventListener('storage', handleAuthChange);

    return () => {
      window.removeEventListener('mock-auth-change', handleAuthChange);
      window.removeEventListener('storage', handleAuthChange);
    };
  }, []);

  return { data: session, isPending };
}

export async function signOut(): Promise<void> {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('isLoggedIn');
    window.dispatchEvent(new Event('mock-auth-change'));
    // Trigger storage event manually for other tabs if needed, though 'storage' event fires automatically for other tabs
  }
}

export function isLoggedIn(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  return sessionStorage.getItem('isLoggedIn') === 'true';
}
