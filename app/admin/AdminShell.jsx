'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Car, Megaphone, Settings, MessageSquareQuote, LogOut, ExternalLink } from 'lucide-react';
import Logo from '@/components/Logo';

export default function AdminShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClientComponentClient();

  // A página de login tem o seu próprio layout (sem sidebar)
  if (pathname === '/admin/login') return <>{children}</>;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  const links = [
    { href: '/admin', label: 'Viaturas', icon: Car },
    { href: '/admin/banners', label: 'Banners', icon: Megaphone },
    { href: '/admin/testemunhos', label: 'Testemunhos', icon: MessageSquareQuote },
    { href: '/admin/site', label: 'Informações do site', icon: Settings },
  ];

  return (
    <div style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
      `}</style>

      <aside style={styles.sidebar}>
        <div style={styles.logoRow}>
          <Logo size={34} />
          <div>
            <div style={styles.logoText}>DriveNext<span style={{ color: '#3D5A6C' }}>.</span></div>
            <div style={styles.logoSub}>Backoffice</div>
          </div>
        </div>

        <nav style={styles.nav}>
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link key={href} href={href} style={active ? styles.navBtnActive : styles.navBtn}>
                <Icon size={17} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div style={styles.bottomLinks}>
          <a href="/" target="_blank" rel="noreferrer" style={styles.bottomLink}>
            <ExternalLink size={15} />
            Ver site público
          </a>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            <LogOut size={15} />
            Terminar sessão
          </button>
        </div>
      </aside>

      <main style={styles.main}>{children}</main>
    </div>
  );
}

const COLORS = {
  paper: '#FFFFFF',
  sand: '#F4F1EC',
  ink: '#2B2B2B',
  inkSoft: '#6B6B6B',
  petrol: '#3D5A6C',
  line: '#E6E1D9',
};

const styles = {
  page: {
    display: 'flex', minHeight: '100vh', background: COLORS.sand,
    fontFamily: "'Inter', sans-serif", color: COLORS.ink,
  },
  sidebar: {
    width: 240, flexShrink: 0, background: COLORS.paper,
    borderRight: `1px solid ${COLORS.line}`, padding: '28px 20px',
    display: 'flex', flexDirection: 'column', gap: 32,
    position: 'sticky', top: 0, height: '100vh',
  },
  logoRow: { display: 'flex', alignItems: 'center', gap: 12 },
  logoText: { fontFamily: "'Fraunces', serif", fontSize: '1.15rem', fontWeight: 500 },
  logoSub: { fontSize: '0.72rem', color: COLORS.inkSoft, letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 2 },
  nav: { display: 'flex', flexDirection: 'column', gap: 4 },
  navBtn: {
    display: 'flex', alignItems: 'center', gap: 10, padding: '11px 12px', borderRadius: 6,
    fontSize: '0.88rem', fontWeight: 500, color: COLORS.inkSoft, background: 'transparent',
    border: 'none', cursor: 'pointer', textAlign: 'left', textDecoration: 'none',
  },
  navBtnActive: {
    display: 'flex', alignItems: 'center', gap: 10, padding: '11px 12px', borderRadius: 6,
    fontSize: '0.88rem', fontWeight: 500, color: COLORS.petrol, background: COLORS.sand,
    border: 'none', cursor: 'pointer', textAlign: 'left', textDecoration: 'none',
  },
  bottomLinks: { marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 4, paddingTop: 16, borderTop: `1px solid ${COLORS.line}` },
  bottomLink: {
    display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 6,
    fontSize: '0.84rem', fontWeight: 500, color: COLORS.inkSoft, textDecoration: 'none',
  },
  logoutBtn: {
    display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 6,
    fontSize: '0.84rem', fontWeight: 500, color: '#B5675A', background: 'transparent',
    border: 'none', cursor: 'pointer', textAlign: 'left',
  },
  main: { flex: 1, padding: '40px 48px', maxWidth: 1100 },
};
