'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Plus, Trash2, Megaphone, Check } from 'lucide-react';
import { adminStyles as s, Field } from '../adminStyles';

export default function AdminBannersPage() {
  const supabase = createClientComponentClient();
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedId, setSavedId] = useState(null);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from('banners').select('*').order('ordem', { ascending: true });
    setBanners(data || []);
    setLoading(false);
  }

  async function addBanner() {
    const novo = { titulo: 'Novo banner', subtitulo: '', ativo: true, ordem: banners.length + 1 };
    const { data, error } = await supabase.from('banners').insert(novo).select().single();
    if (!error && data) setBanners([...banners, data]);
  }

  function updateLocal(id, field, value) {
    setBanners(banners.map((b) => (b.id === id ? { ...b, [field]: value } : b)));
  }

  async function saveBanner(b) {
    await supabase.from('banners')
      .update({ titulo: b.titulo, subtitulo: b.subtitulo, ativo: b.ativo })
      .eq('id', b.id);
    setSavedId(b.id);
    setTimeout(() => setSavedId(null), 1200);
  }

  async function removeBanner(id) {
    await supabase.from('banners').delete().eq('id', id);
    setBanners(banners.filter((b) => b.id !== id));
  }

  if (loading) return <div style={{ color: '#6B6B6B' }}>A carregar…</div>;

  return (
    <section>
      <div style={s.headRow}>
        <div>
          <div style={s.eyebrow}>Página inicial</div>
          <h1 style={s.h1}>Banners</h1>
          <p style={s.sub}>Geste as faixas promocionais que aparecem no topo do site. Apenas o primeiro banner ativo é mostrado.</p>
        </div>
        <button style={s.btnPrimary} onClick={addBanner}>
          <Plus size={16} />
          Adicionar banner
        </button>
      </div>

      <div style={s.list}>
        {banners.map((b) => (
          <div key={b.id} style={s.card}>
            <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={s.toggleRow}>
                  <input
                    type="checkbox"
                    checked={b.ativo}
                    onChange={(e) => updateLocal(b.id, 'ativo', e.target.checked)}
                    style={s.checkbox}
                  />
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: b.ativo ? '#3D5A6C' : '#A8A8A8' }}>
                    {b.ativo ? 'Ativo' : 'Inativo'}
                  </span>
                </label>
                <button style={s.btnDanger} onClick={() => removeBanner(b.id)}>
                  <Trash2 size={14} />
                </button>
              </div>

              <Field label="Título" value={b.titulo} onChange={(v) => updateLocal(b.id, 'titulo', v)} />
              <Field label="Subtítulo" value={b.subtitulo} onChange={(v) => updateLocal(b.id, 'subtitulo', v)} placeholder="ex: condições especiais este mês" />

              <div style={s.previewLabel}>Pré-visualização</div>
              <div style={s.preview}>
                <div style={s.previewEyebrow}>{b.ativo ? 'Destaque' : 'Inativo — não visível no site'}</div>
                <div style={s.previewTitle}>{b.titulo || 'Título do banner'}</div>
                {b.subtitulo && <div style={s.previewSub}>{b.subtitulo}</div>}
              </div>

              <button style={s.btnDone} onClick={() => saveBanner(b)}>
                <Check size={15} />
                {savedId === b.id ? 'Guardado!' : 'Guardar alterações'}
              </button>
            </div>
          </div>
        ))}

        {banners.length === 0 && (
          <div style={s.empty}>
            <Megaphone size={28} color="#C9C4BA" />
            <p>Sem banners. Adicione um para destacar uma promoção.</p>
          </div>
        )}
      </div>
    </section>
  );
}
