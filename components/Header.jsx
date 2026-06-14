import Link from 'next/link';
import Logo from './Logo';

export default function Header() {
  return (
    <header>
      <div className="container nav">
        <Link href="/" className="logo-wrap">
          <Logo />
          <span className="logo">DriveNext<span className="dot">.</span></span>
        </Link>
        <nav className="nav-links">
          <Link href="/#viaturas">Viaturas</Link>
          <Link href="/#familia">A Família</Link>
          <Link href="/testemunhos">Testemunhos</Link>
          <Link href="/contacto">Contacto</Link>
        </nav>
        <Link href="/contacto" className="btn btn-outline">Vender o meu carro</Link>
      </div>
    </header>
  );
}
