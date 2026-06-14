'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Plus, Trash2, Check, Image as ImageIcon, Car, Save } from 'lucide-react';
import {
  adminStyles as s, ESTADOS_CONFIG, Field, SelectField, formatPrice, formatKm,
} from './adminStyles';

const SEAL_CLASS = { reservado: '#3D5A6C', vendido: '#2B2B2B', promocao: '#C9A66B' };

export default function AdminViaturasPage() {
  const supabase = createClientComponentClient();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [savingId, setSavingId] = useState(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from('viaturas').select('*').order('ordem', { ascending: true });
    setCars(data || []);
    setLoading(false);
  }

  async function addCar() {
    const novo = {
      marca: '', modelo: '', ano: new Date().getFullYear(), combustivel: 'Gasolina',
      km: 0, preco: 0, estado: 'disponivel', tag: '', foto: '',
      ordem: cars.length + 1,
    };
    const { data, error } = await supabase.from('viaturas').insert(novo).select().single();
    if (!error && data) {
      setCars([...cars, data]);
      setEditingId(data.id);
    }
  }

  function updateLocal(id, field, value) {
    setCars(cars.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  }

  async function saveCar(id) {
    const car = cars.find((c) => c.id === id);
    if (!car) return;
    setSavingId(id);
    const { marca, modelo, ano, combustivel, km, preco, estado, tag, foto } = car;
    await supabase.from('viaturas')
      .update({ marca, modelo, ano, combustivel, km, preco, estado, tag, foto })
      .eq('id', id);
    setSavingId(null);
  }

  async function removeCar(id) {
    await supabase.from('viaturas').delete().eq('id', id);
    setCars(cars.filter((c) => c.id !== id));
    setConfirmDelete(null);
  }

  if (loading) {
    return <div style={{ color: '#6B6B6B' }}>A carregar…</div>;
  }

  return (
    <section>
      <div style={s.headRow}>
        <div>
          <div style={s.eyebrow}>Catálogo</div>
          <h1 style={s.h1}>Viaturas</h1>
          <p style={s.sub}>Adicione, edite ou remova viaturas. As alterações refletem-se de imediato no site público.</p>
        </div>
        <button style={s.btnPrimary} onClick={addCar}>
          <Plus size={16} />
          Adicionar viatura
        </button>
      </div>

      <div style={s.legendRow}>
        {Object.entries(ESTADOS_CONFIG).map(([key, cfg]) => (
          <div key={key} style={s.legendItem}>
            <span style={{ ...s.legendDot, background: cfg.color }} />
            {cfg.label}
          </div>
        ))}
      </div>

      <div style={s.grid}>
        {cars.map((car) => (
          <div key={car.id} style={s.card}>
            <div style={s.media}>
              {car.foto ? (
                <img src={car.foto} alt={car.modelo} style={s.img} />
              ) : (
                <div style={s.noImg}><ImageIcon size={28} color="#C9C4BA" /></div>
              )}
              {car.estado !== 'disponivel' && (
                <div style={{
                  position: 'absolute', top: 14, left: 14,
                  background: SEAL_CLASS[car.estado], color: '#fff',
                  fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.14em',
                  padding: '7px 14px', borderRadius: 4, textTransform: 'uppercase',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.18)',
                }}>
                  {ESTADOS_CONFIG[car.estado].label}
                </div>
              )}
            </div>

            <div style={s.body}>
              {editingId === car.id ? (
                <div style={s.editForm}>
                  <div style={s.row2}>
                    <Field label="Marca" value={car.marca} onChange={(v) => updateLocal(car.id, 'marca', v)} />
                    <Field label="Modelo" value={car.modelo} onChange={(v) => updateLocal(car.id, 'modelo', v)} />
                  </div>
                  <div style={s.row3}>
                    <Field label="Ano" type="number" value={car.ano} onChange={(v) => updateLocal(car.id, 'ano', Number(v))} />
                    <Field label="Km" type="number" value={car.km} onChange={(v) => updateLocal(car.id, 'km', Number(v))} />
                    <SelectField
                      label="Combustível"
                      value={car.combustivel}
                      onChange={(v) => updateLocal(car.id, 'combustivel', v)}
                      options={['Gasolina', 'Diesel', 'Híbrido', 'Elétrico']}
                    />
                  </div>
                  <div style={s.row2}>
                    <Field label="Preço (€)" type="number" value={car.preco} onChange={(v) => updateLocal(car.id, 'preco', Number(v))} />
                    <Field label="Etiqueta" value={car.tag} onChange={(v) => updateLocal(car.id, 'tag', v)} placeholder="ex: Família +" />
                  </div>
                  <Field label="URL da fotografia" value={car.foto} onChange={(v) => updateLocal(car.id, 'foto', v)} placeholder="https://..." />

                  <div>
                    <label style={s.label}>Estado</label>
                    <div style={s.estadoRow}>
                      {Object.entries(ESTADOS_CONFIG).map(([key, cfg]) => (
                        <button
                          key={key}
                          onClick={() => updateLocal(car.id, 'estado', key)}
                          style={{
                            ...s.estadoChip,
                            background: car.estado === key ? cfg.bg : '#fff',
                            borderColor: car.estado === key ? cfg.color : '#E6E1D9',
                            color: car.estado === key ? cfg.color : '#6B6B6B',
                          }}
                        >
                          {cfg.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    style={s.btnDone}
                    onClick={async () => {
                      await saveCar(car.id);
                      setEditingId(null);
                    }}
                  >
                    {savingId === car.id ? <Save size={15} /> : <Check size={15} />}
                    {savingId === car.id ? 'A guardar…' : 'Guardar e concluir'}
                  </button>
                </div>
              ) : (
                <>
                  <div style={s.topRow}>
                    <div>
                      <div style={s.tag}>{car.tag || 'Sem etiqueta'}</div>
                      <h3 style={s.title}>{car.marca || 'Marca'} {car.modelo || 'Modelo'}</h3>
                    </div>
                    <span style={{ ...s.badge, background: ESTADOS_CONFIG[car.estado].bg, color: ESTADOS_CONFIG[car.estado].color }}>
                      {ESTADOS_CONFIG[car.estado].label}
                    </span>
                  </div>
                  <div style={s.meta}>
                    <span>{car.ano}</span>
                    <span>{car.combustivel}</span>
                    <span>{formatKm(car.km)}</span>
                  </div>
                  <div style={s.footer}>
                    <div style={s.price}>{formatPrice(car.preco)}</div>
                    <div style={s.actions}>
                      <button style={s.btnSecondary} onClick={() => setEditingId(car.id)}>Editar</button>
                      {confirmDelete === car.id ? (
                        <div style={s.confirmRow}>
                          <span style={s.confirmText}>Remover?</span>
                          <button style={s.confirmYes} onClick={() => removeCar(car.id)}>Sim</button>
                          <button style={s.confirmNo} onClick={() => setConfirmDelete(null)}>Não</button>
                        </div>
                      ) : (
                        <button style={s.btnDanger} onClick={() => setConfirmDelete(car.id)}>
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}

        {cars.length === 0 && (
          <div style={s.empty}>
            <Car size={28} color="#C9C4BA" />
            <p>Ainda não existem viaturas. Adicione a primeira.</p>
          </div>
        )}
      </div>
    </section>
  );
}
