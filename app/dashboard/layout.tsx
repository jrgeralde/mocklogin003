'use client';

import Header, { Footer } from './headerfooter';
import React from 'react';
import LoginPageGuard from '@/components/LoginPageGuard';
import SessionTimeoutWrapper from '@/components/SessionTimeoutWrapper';
import { signOut } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleTimeoutLogout = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <LoginPageGuard>
      <SessionTimeoutWrapper
        timeoutMinutes={.3}
        countdownSeconds={10}
        onLogout={handleTimeoutLogout}
      >
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow pt-16 pb-16">
            {children}
          </main>
          <Footer />
        </div>
      </SessionTimeoutWrapper>
    </LoginPageGuard>
  );
}
