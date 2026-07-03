'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        router.push('/dashboard');
      }
    });

    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');
    if (code) {
      supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
        if (error) router.push('/sign-in?error=auth_failed');
      });
    } else {
      router.push('/sign-in');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#070B14' }}>
      <p className="text-sm font-mono" style={{ color: '#6B7C9E' }}>Signing in...</p>
    </div>
  );
}
