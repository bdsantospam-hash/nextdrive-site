'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { MapPin, Phone, Mail, Clock, Check, Map } from 'lucide-react';
import { adminStyles as s, Field } from '../adminStyles';

export default function AdminSitePage() {
  const supabase = createClientComponentClient();
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from('info_site').select('*').eq('id', 1).single();
    setInfo(data);
    setLoading(false);
  }

  function update(field, value) {
    setInfo({ ...info, [field]: value });
  }

  async function save() {
    const { id, atualizado_em, ...rest } = info;
    await supabase.from('info_site').update({ ...rest, atualizado_em: new Date().toISOString() }).eq('id', 1);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  if (loading || !info) return <div style={{ color: '#6B6B6B' }}>A carregar…</div>;

  return (
    <section>
      <div style={s.headRow}>
        <div>
          <div style={s.eyebrow}>Geral</div>
          <h1 style={s.h1}>Informações do site</h1>
          <p style={s.sub}>Estes dados aparecem no rodapé e na página de contacto, incluindo o mapa.</p>
        </div>
      </div>

      <div style={s.siteForm}>
        <div style={s.siteSection}>
          <div style={s.siteSectionHead}>
            <MapPin size={16} color="#3D5A6C" />
            <h3 style={s.siteSectionTitle}>Morada</h3>
          </div>
          <Field label="Endereço" value={info.endereco} onChange={(v) => update('endereco', v)} />
          <Field label="Nota (ex: indicações de acesso)" value={info.nota_endereco} onChange={(v) => update('nota_endereco', v)} />
        </div>

        <div style={s.siteSection}>
          <div style={s.siteSectionHead}>
            <Phone size={16} color="#3D5A6C" />
            <h3 style={s.siteSectionTitle}>Telefone &amp; WhatsApp</h3>
          </div>
          <Field label="Número" value={info.telefone} onChange={(v) => update('telefone', v)} />
        </div>

        <div style={s.siteSection}>
          <div style={s.siteSectionHead}>
            <Mail size={16} color="#3D5A6C" />
            <h3 style={s.siteSectionTitle}>Email</h3>
          </div>
          <Field label="Endereço de email" value={info.email} onChange={(v) => update('email', v)} />
        </div>

        <div style={s.siteSection}>
          <div style={s.siteSectionHead}>
            <Clock size={16} color="#3D5A6C" />
            <h3 style={s.siteSectionTitle}>Horário</h3>
          </div>
          <Field label="Horário principal" value={info.horario} onChange={(v) => update('horario', v)} />
          <Field label="Nota adicional" value={info.horario_nota} onChange={(v) => update('horario_nota', v)} />
        </div>

        <div style={{ ...s.siteSection, gridColumn: '1 / -1' }}>
          <div style={s.siteSectionHead}>
            <Map size={16} color="#3D5A6C" />
            <h3 style={s.siteSectionTitle}>Mapa do Google (página de contacto)</h3>
          </div>
          <Field
            label="URL de incorporação (Google Maps &gt; Partilhar &gt; Incorporar mapa &gt; copiar o link do src)"
            value={info.maps_embed_url}
            onChange={(v) => update('maps_embed_url', v)}
            placeholder="https://www.google.com/maps?q=...&output=embed"
          />
          {info.maps_embed_url && (
            <div className="map-wrap" style={{ borderRadius: 6, overflow: 'hidden', border: '1px solid #E6E1D9', aspectRatio: '16/9' }}>
              <iframe src={info.maps_embed_url} style={{ width: '100%', height: '100%', border: 0 }} loading="lazy" title="Pré-visualização do mapa" />
            </div>
          )}
        </div>
      </div>

      <button style={{ ...s.btnDone, marginTop: 24 }} onClick={save}>
        <Check size={15} />
        {saved ? 'Guardado!' : 'Guardar alterações'}
      </button>
    </section>
  );
}
