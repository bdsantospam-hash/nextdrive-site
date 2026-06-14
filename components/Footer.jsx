import Link from 'next/link';
import Logo from './Logo';

export default function Footer({ info }) {
  const i = info || {};
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <span className="footer-logo logo-wrap">
              <Logo size={32} />
              NextDrive<span className="dot">.</span>
            </span>
            <p>Compra e venda de viaturas usadas e seminovas, com inspeção certificada e acompanhamento pessoal — uma família a cuidar da sua mobilidade.</p>
          </div>
          <div>
            <h4>Navegação</h4>
            <ul>
              <li><Link href="/#viaturas">Viaturas</Link></li>
              <li><Link href="/#familia">A Família</Link></li>
              <li><Link href="/testemunhos">Testemunhos</Link></li>
              <li><Link href="/contacto">Contacto</Link></li>
            </ul>
          </div>
          <div>
            <h4>Serviços</h4>
            <ul>
              <li><Link href="/contacto">Financiamento</Link></li>
              <li><Link href="/contacto">Avaliação de retoma</Link></li>
              <li><Link href="/contacto">Garantia estendida</Link></li>
              <li><Link href="/contacto">Vender o meu carro</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contacto</h4>
            <ul>
              <li>{i.endereco || 'Av. da Liberdade, Lisboa'}</li>
              <li>{i.telefone || '+351 21 000 0000'}</li>
              <li>{i.email || 'ola@nextdrive.pt'}</li>
              <li>{i.horario || 'Seg–Sáb · 9h–19h'}</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} NextDrive.pt — Todos os direitos reservados</span>
          <span>Política de Privacidade · Termos de Utilização</span>
        </div>
      </div>
    </footer>
  );
}
