'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Logo from '@/components/Logo';

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError('Email ou palavra-passe incorretos.');
      return;
    }
    router.push('/admin');
    router.refresh();
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logoRow}>
          <Logo size={40} />
          <div>
            <div style={styles.title}>NextDrive<span style={{ color: '#3D5A6C' }}>.</span></div>
            <div style={styles.subtitle}>Backoffice</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
              placeholder="ola@nextdrive.pt"
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Palavra-passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
              placeholder="••••••••"
            />
          </div>
          {error && <div style={styles.error}>{error}</div>}
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'A entrar…' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: '#F4F1EC', fontFamily: "'Inter', sans-serif", padding: 20,
  },
  card: {
    background: '#fff', border: '1px solid #E6E1D9', borderRadius: 10,
    padding: '40px 36px', width: '100%', maxWidth: 380,
  },
  logoRow: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 },
  title: { fontFamily: "'Fraunces', serif", fontSize: '1.2rem', fontWeight: 500, color: '#2B2B2B' },
  subtitle: { fontSize: '0.74rem', color: '#6B6B6B', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 2 },
  form: { display: 'flex', flexDirection: 'column', gap: 18 },
  field: { display: 'flex', flexDirection: 'column', gap: 6 },
  label: { fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6B6B6B' },
  input: {
    border: 'none', borderBottom: '1.5px solid #E6E1D9', padding: '10px 0',
    fontSize: '0.95rem', fontFamily: "'Inter', sans-serif", color: '#2B2B2B',
    background: 'transparent', outline: 'none',
  },
  error: { fontSize: '0.85rem', color: '#B5675A' },
  button: {
    marginTop: 8, padding: '13px 28px', borderRadius: 6,
    background: '#2B2B2B', color: '#fff', border: 'none',
    fontSize: '0.92rem', fontWeight: 500, cursor: 'pointer',
  },
};
