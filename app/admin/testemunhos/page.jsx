'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Plus, Trash2, MessageSquareQuote, Check } from 'lucide-react';
import { adminStyles as s, Field, SelectField } from '../adminStyles';

export default function AdminTestemunhosPage() {
  const supabase = createClientComponentClient();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedId, setSavedId] = useState(null);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from('testemunhos').select('*').order('ordem', { ascending: true });
    setItems(data || []);
    setLoading(false);
  }

  async function addItem() {
    const novo = {
      nome: '', detalhe: '', texto: '', estrelas: 5, destaque: false, foto: '',
      ordem: items.length + 1,
    };
    const { data, error } = await supabase.from('testemunhos').insert(novo).select().single();
    if (!error && data) setItems([...items, data]);
  }

  function updateLocal(id, field, value) {
    setItems(items.map((t) => (t.id === id ? { ...t, [field]: value } : t)));
  }

  async function saveItem(t) {
    await supabase.from('testemunhos')
      .update({ nome: t.nome, detalhe: t.detalhe, texto: t.texto, estrelas: t.estrelas, destaque: t.destaque, foto: t.foto })
      .eq('id', t.id);
    setSavedId(t.id);
    setTimeout(() => setSavedId(null), 1200);
  }

  async function removeItem(id) {
    await supabase.from('testemunhos').delete().eq('id', id);
    setItems(items.filter((t) => t.id !== id));
  }

  if (loading) return <div style={{ color: '#6B6B6B' }}>A carregar…</div>;

  return (
    <section>
      <div style={s.headRow}>
        <div>
          <div style={s.eyebrow}>Página de testemunhos</div>
          <h1 style={s.h1}>Testemunhos</h1>
          <p style={s.sub}>Adicione opiniões de clientes. Marque um como "destaque" para aparecer em grande na página de testemunhos.</p>
        </div>
        <button style={s.btnPrimary} onClick={addItem}>
          <Plus size={16} />
          Adicionar testemunho
        </button>
      </div>

      <div style={s.list}>
        {items.map((t) => (
          <div key={t.id} style={s.card}>
            <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={s.toggleRow}>
                  <input
                    type="checkbox"
                    checked={t.destaque}
                    onChange={(e) => updateLocal(t.id, 'destaque', e.target.checked)}
                    style={s.checkbox}
                  />
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: t.destaque ? '#3D5A6C' : '#A8A8A8' }}>
                    {t.destaque ? 'Em destaque' : 'Testemunho normal'}
                  </span>
                </label>
                <button style={s.btnDanger} onClick={() => removeItem(t.id)}>
                  <Trash2 size={14} />
                </button>
              </div>

              <div style={s.row2}>
                <Field label="Nome / família" value={t.nome} onChange={(v) => updateLocal(t.id, 'nome', v)} placeholder="ex: Família Oliveira" />
                <Field label="Detalhe" value={t.detalhe} onChange={(v) => updateLocal(t.id, 'detalhe', v)} placeholder="ex: Lisboa · Troca de viatura" />
              </div>

              <div style={s.fieldWrap}>
                <label style={s.label}>Testemunho</label>
                <textarea
                  value={t.texto}
                  onChange={(e) => updateLocal(t.id, 'texto', e.target.value)}
                  rows={3}
                  style={{ ...s.input, resize: 'vertical', fontFamily: 'inherit' }}
                />
              </div>

              <div style={s.row2}>
                <SelectField
                  label="Estrelas"
                  value={String(t.estrelas)}
                  onChange={(v) => updateLocal(t.id, 'estrelas', Number(v))}
                  options={['5', '4', '3', '2', '1']}
                />
                <Field label="URL da fotografia (opcional, usado se destaque)" value={t.foto} onChange={(v) => updateLocal(t.id, 'foto', v)} placeholder="https://..." />
              </div>

              <button style={s.btnDone} onClick={() => saveItem(t)}>
                <Check size={15} />
                {savedId === t.id ? 'Guardado!' : 'Guardar alterações'}
              </button>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div style={s.empty}>
            <MessageSquareQuote size={28} color="#C9C4BA" />
            <p>Ainda não existem testemunhos. Adicione o primeiro.</p>
          </div>
        )}
      </div>
    </section>
  );
}
