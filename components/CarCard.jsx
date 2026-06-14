import Link from 'next/link';
import { ESTADOS, formatPrice, formatKm } from '@/lib/supabase';

export default function CarCard({ car }) {
  const seal = ESTADOS[car.estado]?.sealClass;
  const sealLabel = ESTADOS[car.estado]?.label;

  return (
    <article className="car-card">
      <div className="car-media">
        {seal && <span className={`seal ${seal}`}>{sealLabel}</span>}
        {car.foto ? (
          <img src={car.foto} alt={`${car.marca} ${car.modelo}`} />
        ) : (
          <div style={{ width: '100%', height: '100%', background: 'var(--sand)' }} />
        )}
      </div>
      <div className="car-body">
        {car.tag && <div className="car-tag">{car.tag}</div>}
        <h3>{car.marca} {car.modelo}</h3>
        <div className="car-meta">
          <span>{car.ano}</span>
          <span>{car.combustivel}</span>
          <span>{formatKm(car.km)}</span>
        </div>
        <div className="car-footer">
          <div className="price">
            {formatPrice(car.preco)}
            <small>financiamento disponível</small>
          </div>
          <Link href={`/viaturas/${car.id}`} className="link-arrow">Ver ficha</Link>
        </div>
      </div>
    </article>
  );
}
