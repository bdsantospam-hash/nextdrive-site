import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Estados possíveis de uma viatura e respetiva configuração visual dos selos
export const ESTADOS = {
  disponivel: { label: 'Disponível', sealClass: null },
  reservado: { label: 'Reservado', sealClass: 'seal-reservado' },
  vendido: { label: 'Vendido', sealClass: 'seal-vendido' },
  promocao: { label: 'Promoção', sealClass: 'seal-promocao' },
};

export function formatPrice(n) {
  return new Intl.NumberFormat('pt-PT').format(n) + ' €';
}

export function formatKm(n) {
  return new Intl.NumberFormat('pt-PT').format(n) + ' km';
}
