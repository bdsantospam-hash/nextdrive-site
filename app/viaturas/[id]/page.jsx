import { supabase, ESTADOS, formatPrice, formatKm } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const revalidate = 0;

export default async function ViaturaPage({ params }) {
  const [{ data: car }, { data: infoRows }] = await Promise.all([
    supabase.from('viaturas').select('*').eq('id', params.id).single(),
    supabase.from('info_site').select('*').eq('id', 1).single(),
  ]);

  if (!car) return notFound();

  const info = infoRows || {};
  const seal = ESTADOS[car.estado]?.sealClass;
  const sealLabel = ESTADOS[car.estado]?.label;

  return (
    <>
      <Header />

      <section className="section" style={{ paddingTop: 48 }}>
        <div className="container">
          <Link href="/#viaturas" className="link-arrow" style={{ marginBottom: 24, display: 'inline-flex' }}>
            ← Voltar às viaturas
          </Link>

          <div className="featured-story" style={{ marginTop: 24 }}>
            <div className="featured-photo" style={{ position: 'relative', aspectRatio: '4/3' }}>
              {seal && <span className={`seal ${seal}`}>{sealLabel}</span>}
              {car.foto ? (
                <img src={car.foto} alt={`${car.marca} ${car.modelo}`} />
              ) : (
                <div style={{ width: '100%', height: '100%', background: 'var(--sand)' }} />
              )}
            </div>
            <div>
              {car.tag && <div className="eyebrow">{car.tag}</div>}
              <h1 style={{ fontSize: 'clamp(1.8rem,3vw,2.4rem)', fontWeight: 400, marginBottom: 16 }}>
                {car.marca} <strong style={{ fontWeight: 500, color: 'var(--petrol)' }}>{car.modelo}</strong>
              </h1>
              <div className="car-meta" style={{ marginBottom: 24, fontSize: '0.95rem' }}>
                <span>{car.ano}</span>
                <span>{car.combustivel}</span>
                <span>{formatKm(car.km)}</span>
              </div>
              <div className="price" style={{ fontSize: '2rem', marginBottom: 28 }}>
                {formatPrice(car.preco)}
                <small style={{ fontSize: '0.8rem' }}>financiamento disponível</small>
              </div>
              <div className="hero-cta">
                <Link href="/contacto" className="btn btn-primary">Marcar visita</Link>
                <Link href="/contacto" className="btn btn-ghost">Pedir mais informação</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer info={info} />
    </>
  );
}
