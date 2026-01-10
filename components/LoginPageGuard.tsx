'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isLoggedIn } from '../lib/auth-client';
import { showMessage } from './MessageModal';

export default function LoginPageGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      // Check if user is logged in
      const loggedIn = isLoggedIn();

      if (!loggedIn) {
        await showMessage('You must be logged in to view this page.', { okColor: 'bg-red-600 hover:bg-red-700' });
        // Redirect to login page (assuming root '/' is the login page)
        router.push('/');
      } else {
        setAuthorized(true);
      }
    };

    checkAuth();
  }, [router]);

  // Prevent flashing of protected content before check is complete
  if (!authorized) {
    return null;
  }

  return <>{children}</>;
}
