export const COLORS = {
  paper: '#FFFFFF',
  sand: '#F4F1EC',
  ink: '#2B2B2B',
  inkSoft: '#6B6B6B',
  petrol: '#3D5A6C',
  petrolSoft: '#7C97A4',
  line: '#E6E1D9',
};

export const ESTADOS_CONFIG = {
  disponivel: { label: 'Disponível', color: '#7C97A4', bg: '#EEF2F4' },
  reservado: { label: 'Reservado', color: '#B6862C', bg: '#FBF3E2' },
  vendido: { label: 'Vendido', color: '#8C8D8E', bg: '#F0EFED' },
  promocao: { label: 'Promoção', color: '#C2774A', bg: '#FBEDE3' },
};

export const adminStyles = {
  headRow: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
    marginBottom: 28, gap: 20, flexWrap: 'wrap',
  },
  eyebrow: {
    fontSize: '0.74rem', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase',
    color: COLORS.petrol, marginBottom: 8,
  },
  h1: { fontFamily: "'Fraunces', serif", fontSize: '1.9rem', fontWeight: 400, marginBottom: 6 },
  sub: { color: COLORS.inkSoft, fontSize: '0.92rem', maxWidth: 460, margin: 0 },
  btnPrimary: {
    display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 22px', borderRadius: 6,
    background: COLORS.ink, color: '#fff', border: 'none', fontSize: '0.88rem', fontWeight: 500,
    cursor: 'pointer', whiteSpace: 'nowrap',
  },
  legendRow: {
    display: 'flex', gap: 20, marginBottom: 24, flexWrap: 'wrap',
    fontSize: '0.82rem', color: COLORS.inkSoft,
  },
  legendItem: { display: 'flex', alignItems: 'center', gap: 6 },
  legendDot: { width: 9, height: 9, borderRadius: '50%', display: 'inline-block' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 },
  card: { background: COLORS.paper, border: `1px solid ${COLORS.line}`, borderRadius: 8, overflow: 'hidden' },
  media: { position: 'relative', aspectRatio: '4 / 3', background: COLORS.sand },
  img: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' },
  noImg: { width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  body: { padding: 20 },
  topRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10, marginBottom: 10 },
  tag: { fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: COLORS.petrol, marginBottom: 6 },
  title: { fontFamily: "'Fraunces', serif", fontSize: '1.05rem', fontWeight: 500, margin: 0 },
  badge: { fontSize: '0.7rem', fontWeight: 600, padding: '5px 10px', borderRadius: 4, whiteSpace: 'nowrap', letterSpacing: '0.04em' },
  meta: { display: 'flex', gap: 14, fontSize: '0.82rem', color: COLORS.inkSoft, marginBottom: 16, flexWrap: 'wrap' },
  footer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 14, borderTop: `1px solid ${COLORS.line}` },
  price: { fontFamily: "'Fraunces', serif", fontSize: '1.15rem', fontWeight: 500 },
  actions: { display: 'flex', alignItems: 'center', gap: 8 },
  btnSecondary: {
    fontSize: '0.82rem', fontWeight: 500, color: COLORS.ink, background: 'transparent',
    border: `1px solid ${COLORS.line}`, borderRadius: 5, padding: '7px 14px', cursor: 'pointer',
  },
  btnDanger: {
    display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 5,
    background: 'transparent', border: `1px solid ${COLORS.line}`, color: '#B5675A', cursor: 'pointer',
  },
  confirmRow: { display: 'flex', alignItems: 'center', gap: 6 },
  confirmText: { fontSize: '0.8rem', color: COLORS.inkSoft },
  confirmYes: { fontSize: '0.78rem', fontWeight: 600, color: '#fff', background: '#B5675A', border: 'none', borderRadius: 4, padding: '6px 10px', cursor: 'pointer' },
  confirmNo: { fontSize: '0.78rem', fontWeight: 600, color: COLORS.inkSoft, background: 'transparent', border: `1px solid ${COLORS.line}`, borderRadius: 4, padding: '6px 10px', cursor: 'pointer' },
  editForm: { display: 'flex', flexDirection: 'column', gap: 14 },
  row2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 },
  row3: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 },
  fieldWrap: { display: 'flex', flexDirection: 'column', gap: 6 },
  label: { fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: COLORS.inkSoft },
  input: {
    border: 'none', borderBottom: `1.5px solid ${COLORS.line}`, padding: '8px 0',
    fontSize: '0.92rem', fontFamily: "'Inter', sans-serif", color: COLORS.ink,
    background: 'transparent', outline: 'none', width: '100%',
  },
  estadoRow: { display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 6 },
  estadoChip: { fontSize: '0.8rem', fontWeight: 500, padding: '7px 14px', borderRadius: 5, border: '1px solid', cursor: 'pointer', background: '#fff' },
  btnDone: {
    display: 'inline-flex', alignItems: 'center', gap: 8, justifyContent: 'center', padding: '10px 18px', borderRadius: 6,
    background: COLORS.petrol, color: '#fff', border: 'none', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer', marginTop: 6,
  },
  empty: {
    gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
    padding: '60px 20px', color: COLORS.inkSoft, fontSize: '0.92rem',
    border: `1px dashed ${COLORS.line}`, borderRadius: 8, background: COLORS.paper,
  },
  list: { display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 640 },
  toggleRow: { display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' },
  checkbox: { width: 16, height: 16, accentColor: COLORS.petrol, cursor: 'pointer' },
  previewLabel: { fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: COLORS.inkSoft, marginTop: 4 },
  preview: { background: COLORS.sand, borderRadius: 6, padding: '18px 20px' },
  previewEyebrow: { fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: COLORS.petrol, marginBottom: 6 },
  previewTitle: { fontFamily: "'Fraunces', serif", fontSize: '1.15rem', fontWeight: 500 },
  previewSub: { fontSize: '0.88rem', color: COLORS.inkSoft, marginTop: 4 },
  siteForm: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20, maxWidth: 900 },
  siteSection: { background: COLORS.paper, border: `1px solid ${COLORS.line}`, borderRadius: 8, padding: 22, display: 'flex', flexDirection: 'column', gap: 14 },
  siteSectionHead: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 },
  siteSectionTitle: { fontFamily: "'Fraunces', serif", fontSize: '1rem', fontWeight: 500, margin: 0 },
  saveBar: {
    position: 'fixed', bottom: 24, right: 48, background: COLORS.ink, color: '#fff',
    padding: '10px 18px', borderRadius: 6, fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: 8,
    boxShadow: '0 8px 24px rgba(0,0,0,0.18)', zIndex: 100,
  },
};

export function Field({ label, value, onChange, type = 'text', placeholder }) {
  return (
    <div style={adminStyles.fieldWrap}>
      <label style={adminStyles.label}>{label}</label>
      <input
        type={type}
        value={value ?? ''}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        style={adminStyles.input}
      />
    </div>
  );
}

export function SelectField({ label, value, onChange, options }) {
  return (
    <div style={adminStyles.fieldWrap}>
      <label style={adminStyles.label}>{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} style={adminStyles.input}>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

export function formatPrice(n) {
  return new Intl.NumberFormat('pt-PT').format(n || 0) + ' €';
}
export function formatKm(n) {
  return new Intl.NumberFormat('pt-PT').format(n || 0) + ' km';
}
