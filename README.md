# NextDrive — Site + Backoffice (Next.js + Supabase)

Site público e backoffice ligados à mesma base de dados: qualquer alteração feita no
backoffice (`/admin`) aparece imediatamente no site público, sem passos de exportação.

---

## 1. Configurar o Supabase

1. Crie um projeto em [supabase.com](https://supabase.com) (plano gratuito é suficiente).
2. Abra **SQL Editor** → cole o conteúdo de `sql/schema.sql` → **Run**.
   Isto cria as tabelas (`viaturas`, `banners`, `testemunhos`, `info_site`), preenche-as
   com os dados atuais do site, e configura as permissões de segurança (RLS).
3. Vá a **Authentication → Users → Add user** e crie o utilizador que vai usar para
   entrar no backoffice (o seu email + uma palavra-passe).
4. Vá a **Project Settings → API** e copie:
   - `Project URL`
   - `anon public` key

---

## 2. Configurar o projeto

1. Copie `.env.example` para `.env.local`:
   ```
   cp .env.example .env.local
   ```
2. Preencha `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` com os valores
   copiados no passo anterior.
3. Instale as dependências e arranque localmente:
   ```
   npm install
   npm run dev
   ```
4. Abra:
   - `http://localhost:3000` → site público
   - `http://localhost:3000/admin/login` → backoffice (entre com o utilizador criado no Supabase)

---

## 3. Publicar na Vercel

1. Suba este projeto para um repositório GitHub/GitLab.
2. Na Vercel: **New Project** → importe o repositório.
3. Em **Environment Variables**, adicione:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy. A Vercel volta a fazer deploy automaticamente sempre que enviar alterações ao
   código — mas alterações de **conteúdo** (viaturas, banners, morada, testemunhos) feitas
   no `/admin` aparecem de imediato, sem novo deploy.

---

## 4. Ligar o domínio nextdrive.pt

1. Na Vercel: **Project → Settings → Domains** → adicione `nextdrive.pt` (e `www.nextdrive.pt`).
2. A Vercel mostra os registos DNS a configurar (normalmente um registo `A` para o domínio
   raiz e um `CNAME` para `www`).
3. No painel do seu fornecedor de domínio (onde comprou nextdrive.pt), adicione esses
   registos DNS.
4. Aguarde a propagação (pode demorar entre minutos e algumas horas). A Vercel emite
   automaticamente o certificado HTTPS.

---

## 5. Como usar o backoffice no dia a dia

- **Viaturas**: adicionar/editar/remover, definir preço, km, ano, foto e o **estado**
  (Disponível, Reservado, Vendido, Promoção) — o selo correspondente aparece automaticamente
  sobre a primeira foto no site.
- **Banners**: criar a faixa promocional do topo da homepage; só o primeiro banner
  marcado como "Ativo" é mostrado.
- **Testemunhos**: adicionar opiniões de clientes; marcar um como "destaque" para
  aparecer em grande na página de Testemunhos.
- **Informações do site**: morada, telefone, email, horário e o link de incorporação do
  Google Maps usado na página de Contacto.

Todas as alterações são guardadas diretamente na base de dados Supabase e ficam
visíveis no site público de imediato (o site não usa cache de conteúdo).

---

## Estrutura do projeto

```
app/
  page.jsx                 -> homepage
  viaturas/[id]/page.jsx   -> ficha de viatura
  testemunhos/page.jsx     -> página de testemunhos
  contacto/page.jsx        -> contacto + mapa
  admin/
    login/page.jsx         -> login do backoffice
    page.jsx                -> gestão de viaturas
    banners/page.jsx        -> gestão de banners
    testemunhos/page.jsx    -> gestão de testemunhos
    site/page.jsx           -> morada, contactos, mapa
    AdminShell.jsx          -> barra lateral do backoffice
components/                -> Header, Footer, CarCard, Logo
lib/supabase.js            -> ligação ao Supabase + helpers
sql/schema.sql             -> esquema da base de dados + dados iniciais
middleware.js              -> protege /admin (exige login)
```

## Adicionar mais utilizadores ao backoffice

No Supabase: **Authentication → Users → Add user**. Qualquer utilizador autenticado
tem acesso total ao `/admin`. Para perfis com permissões diferentes (ex: só leitura),
seria necessário adicionar uma tabela de perfis/roles — posso ajudar se precisar disto
mais tarde.
