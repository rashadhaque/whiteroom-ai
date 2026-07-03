'use client';

import { useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function SignOut() {
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.signOut().then(() => {
      window.location.href = 'https://whiteroom.tech';
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#070B14' }}>
      <p className="text-sm font-mono" style={{ color: '#6B7C9E' }}>Signing out...</p>
    </div>
  );
}
