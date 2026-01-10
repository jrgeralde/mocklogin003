import LoginPageGuard from '@/components/LoginPageGuard';

export default function ContactPage() {
  return (
    <LoginPageGuard>
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
         This is the contact page.
      </div>
    </LoginPageGuard>
  );
}
