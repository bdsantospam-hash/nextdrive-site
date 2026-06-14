import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const revalidate = 0;

export default async function TestemunhosPage() {
  const [{ data: testemunhos }, { data: infoRows }] = await Promise.all([
    supabase.from('testemunhos').select('*').order('ordem', { ascending: true }),
    supabase.from('info_site').select('*').eq('id', 1).single(),
  ]);

  const all = testemunhos || [];
  const featured = all.find((t) => t.destaque) || all[0];
  const rest = all.filter((t) => t.id !== featured?.id);
  const info = infoRows || {};

  return (
    <>
      <Header />

      <section className="page-hero">
        <div className="container">
          <div className="eyebrow">Histórias reais</div>
          <h1>O que as famílias dizem<br />sobre a <strong>DriveNext</strong></h1>
          <p>Mais de 2.400 famílias já encontraram o seu próximo carro connosco. Estas são algumas das suas histórias.</p>
        </div>
      </section>

      {featured && (
        <section className="section">
          <div className="container">
            <div className="featured-story">
              <div className="featured-photo">
                <img
                  src={featured.foto || 'https://images.unsplash.com/photo-1609220136736-443350a90ac9?q=80&w=900&auto=format&fit=crop'}
                  alt="Família com o seu novo carro"
                />
              </div>
              <div>
                <div className="eyebrow">Destaque</div>
                <blockquote>&quot;{featured.texto}&quot;</blockquote>
                <cite>{featured.nome.toUpperCase()} · {featured.detalhe?.toUpperCase()}</cite>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section alt">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">Avaliações</div>
              <h2>Testemunhos de <strong>clientes</strong></h2>
            </div>
            <p className="section-sub">Avaliação média de 4.9/5 com base em mais de 600 opiniões verificadas.</p>
          </div>

          <div className="stories-grid">
            {rest.map((t) => (
              <div className="story-card" key={t.id}>
                <div className="stars">{'★'.repeat(t.estrelas)}{'☆'.repeat(5 - t.estrelas)}</div>
                <blockquote>&quot;{t.texto}&quot;</blockquote>
                <div className="story-meta">
                  <div className="story-avatar">{t.nome?.charAt(0)}</div>
                  <div>
                    <div className="story-name">{t.nome}</div>
                    <div className="story-detail">{t.detalhe}</div>
                  </div>
                </div>
              </div>
            ))}
            {all.length === 0 && (
              <p style={{ padding: '40px 0', color: 'var(--ink-soft)' }}>Ainda não existem testemunhos publicados.</p>
            )}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container">
          <div className="eyebrow" style={{ justifyContent: 'center' }}>Junte-se a eles</div>
          <h2>Quer ser a próxima<br />história de <strong>sucesso</strong>?</h2>
          <p>Marque uma visita e descubra porque tantas famílias confiam na DriveNext.</p>
          <div className="hero-cta" style={{ justifyContent: 'center' }}>
            <Link href="/contacto" className="btn btn-primary">Marcar visita</Link>
            <Link href="/#viaturas" className="btn btn-ghost">Ver viaturas</Link>
          </div>
        </div>
      </section>

      <Footer info={info} />
    </>
  );
}
