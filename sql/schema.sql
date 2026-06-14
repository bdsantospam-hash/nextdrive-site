-- ============================================================
-- DriveNext — Esquema da base de dados (Supabase / Postgres)
-- Execute este script completo no SQL Editor do Supabase
-- ============================================================

-- ---------- TABELA: viaturas ----------
create table if not exists viaturas (
  id uuid primary key default gen_random_uuid(),
  marca text not null,
  modelo text not null,
  ano int not null,
  combustivel text not null default 'Gasolina',
  km int not null default 0,
  preco numeric not null default 0,
  estado text not null default 'disponivel'
    check (estado in ('disponivel','reservado','vendido','promocao')),
  tag text default '',
  foto text default '',
  ordem int default 0,
  criado_em timestamptz default now()
);

-- ---------- TABELA: banners ----------
create table if not exists banners (
  id uuid primary key default gen_random_uuid(),
  titulo text not null default '',
  subtitulo text default '',
  ativo boolean not null default true,
  ordem int default 0,
  criado_em timestamptz default now()
);

-- ---------- TABELA: testemunhos ----------
create table if not exists testemunhos (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  detalhe text default '',
  texto text not null,
  estrelas int not null default 5 check (estrelas between 1 and 5),
  destaque boolean default false,
  foto text default '',
  ordem int default 0,
  criado_em timestamptz default now()
);

-- ---------- TABELA: info_site (linha única de configuração) ----------
create table if not exists info_site (
  id int primary key default 1,
  endereco text default '',
  nota_endereco text default '',
  telefone text default '',
  email text default '',
  horario text default '',
  horario_nota text default '',
  maps_embed_url text default '',
  atualizado_em timestamptz default now(),
  constraint single_row check (id = 1)
);

-- ============================================================
-- DADOS INICIAIS
-- ============================================================

insert into info_site (id, endereco, nota_endereco, telefone, email, horario, horario_nota, maps_embed_url)
values (
  1,
  'Av. da Liberdade 245, 1250-143 Lisboa',
  'A 5 minutos a pé da estação do Marquês de Pombal',
  '+351 21 000 0000',
  'ola@drivenext.pt',
  'Segunda a sábado · 9h00 – 19h00',
  'Domingo, sob marcação',
  'https://www.google.com/maps?q=Avenida+da+Liberdade+245,+Lisboa&output=embed'
)
on conflict (id) do nothing;

insert into viaturas (marca, modelo, ano, combustivel, km, preco, estado, tag, foto, ordem) values
('BMW', 'Série 3 320d', 2021, 'Diesel', 62000, 28900, 'disponivel', 'Como novo', 'https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=900&auto=format&fit=crop', 1),
('Volkswagen', 'Tiguan 2.0 TDI', 2020, 'Diesel', 78500, 24490, 'reservado', 'Família +', 'https://images.unsplash.com/photo-1532581140115-3e355d1ed1de?q=80&w=900&auto=format&fit=crop', 2),
('Renault', 'Clio 1.0 TCe', 2022, 'Gasolina', 31200, 15750, 'promocao', 'Primeiro carro', 'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=900&auto=format&fit=crop', 3);

insert into banners (titulo, subtitulo, ativo, ordem) values
('Destaque da semana', 'BMW Série 3 — condições especiais este mês', true, 1);

insert into testemunhos (nome, detalhe, texto, estrelas, destaque, foto, ordem) values
('Família Mendes', 'Comprou um Renault Clio 2022', 'Procurávamos o primeiro carro para o nosso filho e tínhamos mil dúvidas. A equipa sentou-se connosco, explicou tudo sobre garantias e financiamento, e nunca sentimos qualquer pressão.', 5, true, 'https://images.unsplash.com/photo-1609220136736-443350a90ac9?q=80&w=900&auto=format&fit=crop', 1),
('Família Oliveira', 'Lisboa · Troca de viatura', 'Vendemos o nosso carro antigo e compramos um SUV no mesmo dia. Processo transparente do início ao fim, sem surpresas na avaliação.', 5, false, '', 2),
('Família Santos', 'Cascais · Cliente recorrente', 'Já é a segunda vez que compramos aqui. Da primeira vez foi para mim, esta vez foi para a minha mãe — trataram-na com todo o cuidado.', 5, false, '', 3),
('Família Costa', 'Sintra · Garantia ativada', 'A garantia de 24 meses deu-nos tranquilidade total. Tivemos uma pequena questão ao terceiro mês e resolveram tudo sem custos.', 5, false, '', 4),
('Família Pereira', 'Porto · Compra remota', 'Fizemos tudo por videochamada porque vivemos longe. Receberam o carro impecável e exatamente como nos mostraram.', 5, false, '', 5),
('Família Ferreira', 'Amadora · Financiamento', 'O financiamento foi aprovado em poucas horas e as condições eram melhores do que as do nosso banco. Recomendamos sem hesitar.', 5, false, '', 6),
('Família Almeida', 'Loures · Primeira compra', 'Levámos os nossos três filhos à visita e a equipa teve uma paciência incrível, com tudo o que isso implica. Sentimo-nos mesmo em família.', 5, false, '', 7);

-- ============================================================
-- SEGURANÇA (Row Level Security)
-- ============================================================

alter table viaturas enable row level security;
alter table banners enable row level security;
alter table testemunhos enable row level security;
alter table info_site enable row level security;

-- Leitura pública (site público pode ler tudo)
create policy "Leitura pública - viaturas" on viaturas for select using (true);
create policy "Leitura pública - banners" on banners for select using (true);
create policy "Leitura pública - testemunhos" on testemunhos for select using (true);
create policy "Leitura pública - info_site" on info_site for select using (true);

-- Escrita apenas para utilizadores autenticados (backoffice)
create policy "Escrita autenticada - viaturas" on viaturas for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Escrita autenticada - banners" on banners for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Escrita autenticada - testemunhos" on testemunhos for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Escrita autenticada - info_site" on info_site for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ============================================================
-- STORAGE (para upload de fotos das viaturas)
-- ============================================================
insert into storage.buckets (id, name, public)
values ('viaturas-fotos', 'viaturas-fotos', true)
on conflict (id) do nothing;

create policy "Leitura pública fotos" on storage.objects for select
  using (bucket_id = 'viaturas-fotos');

create policy "Upload autenticado fotos" on storage.objects for insert
  with check (bucket_id = 'viaturas-fotos' and auth.role() = 'authenticated');

create policy "Remoção autenticada fotos" on storage.objects for delete
  using (bucket_id = 'viaturas-fotos' and auth.role() = 'authenticated');
