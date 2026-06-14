import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CarCard from '@/components/CarCard';
import Link from 'next/link';

// Sempre buscar dados frescos — o site reflete imediatamente as alterações do backoffice
export const revalidate = 0;

export default async function HomePage() {
  const [{ data: viaturas }, { data: banners }, { data: infoRows }] = await Promise.all([
    supabase.from('viaturas').select('*').order('ordem', { ascending: true }).limit(6),
    supabase.from('banners').select('*').eq('ativo', true).order('ordem', { ascending: true }).limit(1),
    supabase.from('info_site').select('*').eq('id', 1).single(),
  ]);

  const banner = banners?.[0];
  const info = infoRows || {};
  const cars = viaturas || [];

  return (
    <>
      <Header />

      <section className="hero">
        <div className="container">
          {banner && (
            <div className="eyebrow" style={{ marginBottom: 6 }}>
              {banner.titulo}{banner.subtitulo ? ` — ${banner.subtitulo}` : ''}
            </div>
          )}
          <div className="hero-inner">
            <div>
              <div className="eyebrow">Concessionário familiar</div>
              <h1>Cada carro tem uma história.<br />A sua começa com <strong>confiança</strong>.</h1>
              <p className="lead">Na NextDrive escolhemos cada viatura como se fosse para um familiar nosso. Inspeção rigorosa, garantia real e o acompanhamento de uma equipa que conhece pelo nome.</p>
              <div className="hero-cta">
                <Link href="#viaturas" className="btn btn-primary">Ver viaturas disponíveis</Link>
                <Link href="#familia" className="btn btn-ghost">Conhecer a NextDrive</Link>
              </div>
            </div>
            <div className="hero-visual">
              <img src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1200&auto=format&fit=crop" alt="Automóvel em destaque" />
            </div>
          </div>

          <div className="search-card">
            <div className="field">
              <label htmlFor="marca">Marca</label>
              <select id="marca" defaultValue="">
                <option value="">Todas as marcas</option>
                <option>BMW</option>
                <option>Mercedes-Benz</option>
                <option>Volkswagen</option>
                <option>Renault</option>
                <option>Toyota</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="combustivel">Combustível</label>
              <select id="combustivel" defaultValue="">
                <option value="">Qualquer</option>
                <option>Gasolina</option>
                <option>Diesel</option>
                <option>Híbrido</option>
                <option>Elétrico</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="preco">Preço máximo</label>
              <select id="preco" defaultValue="">
                <option value="">Sem limite</option>
                <option>até 10.000 €</option>
                <option>até 20.000 €</option>
                <option>até 35.000 €</option>
                <option>até 50.000 €</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="ano">Ano (a partir de)</label>
              <select id="ano" defaultValue="">
                <option value="">Qualquer</option>
                <option>2024</option>
                <option>2022</option>
                <option>2020</option>
                <option>2018</option>
              </select>
            </div>
            <button className="btn btn-primary">Pesquisar</button>
          </div>
        </div>
      </section>

      <section className="trust">
        <div className="container">
          <div className="trust-grid">
            <div className="trust-item">
              <div className="line" />
              <h3>Inspeção em 110 pontos</h3>
              <p>Cada viatura passa por um checklist mecânico e estético antes de chegar até si.</p>
            </div>
            <div className="trust-item">
              <div className="line" />
              <h3>Garantia até 24 meses</h3>
              <p>Tranquilidade real, com cobertura alargada incluída em todas as viaturas certificadas.</p>
            </div>
            <div className="trust-item">
              <div className="line" />
              <h3>Acompanhamento próximo</h3>
              <p>Um único interlocutor desde a primeira visita até à entrega das chaves.</p>
            </div>
            <div className="trust-item">
              <div className="line" />
              <h3>Trocas facilitadas</h3>
              <p>Avaliamos o seu carro atual e simplificamos a troca pelo próximo.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section alt" id="viaturas">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">Stock selecionado</div>
              <h2>Viaturas em <strong>destaque</strong></h2>
            </div>
            <p className="section-sub">Uma seleção pensada para diferentes momentos da família: o primeiro carro, o carro do dia-a-dia, o carro das férias.</p>
          </div>

          <div className="cards-grid">
            {cars.map((car) => <CarCard key={car.id} car={car} />)}
            {cars.length === 0 && (
              <p style={{ padding: '40px 0', color: 'var(--ink-soft)' }}>
                Ainda não existem viaturas publicadas.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="section" id="familia">
        <div className="container">
          <div className="family">
            <div className="family-photo">
              <img src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=900&auto=format&fit=crop" alt="Equipa NextDrive" />
            </div>
            <div>
              <div className="eyebrow">Quem somos</div>
              <h2>Um negócio de família,<br />ao serviço da <strong>sua</strong>.</h2>
              <p>A NextDrive nasceu de uma garagem pequena e da convicção de que comprar um carro devia ser tão simples como pedir um conselho a alguém de confiança.</p>
              <p>Hoje continuamos a tratar cada cliente como gostaríamos que tratassem os nossos pais, filhos ou irmãos — com transparência, paciência e zero pressão.</p>
              <div className="stat-row">
                <div><h3>15+</h3><span>ANOS DE EXPERIÊNCIA</span></div>
                <div><h3>2.400+</h3><span>FAMÍLIAS SERVIDAS</span></div>
                <div><h3>4.9</h3><span>AVALIAÇÃO MÉDIA</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section alt" id="como-funciona">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">Processo simples</div>
              <h2>Como <strong>funciona</strong></h2>
            </div>
            <p className="section-sub">Da escolha à entrega, sem surpresas — explicamos cada passo antes de avançar.</p>
          </div>
          <div className="steps">
            <div className="step">
              <div className="num">01</div>
              <h3>Escolha online</h3>
              <p>Filtre por marca, preço, ano e combustível até encontrar a viatura certa para si.</p>
            </div>
            <div className="step">
              <div className="num">02</div>
              <h3>Visita ou videochamada</h3>
              <p>Veja o carro pessoalmente ou peça-nos um vídeo detalhado, à sua escolha.</p>
            </div>
            <div className="step">
              <div className="num">03</div>
              <h3>Financiamento e troca</h3>
              <p>Apresentamos as melhores condições de crédito e avaliamos o seu carro atual.</p>
            </div>
            <div className="step">
              <div className="num">04</div>
              <h3>Entrega com garantia</h3>
              <p>Receba a viatura pronta a conduzir, com documentação tratada e garantia ativa.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="testimonial">
            <blockquote>&quot;Comprámos o carro para a nossa filha e foi tratado como se fosse para a deles também. Explicaram tudo, sem pressas e sem letras pequenas.&quot;</blockquote>
            <cite>FAMÍLIA OLIVEIRA · CLIENTES NEXTDRIVE</cite>
            <div style={{ marginTop: 28 }}>
              <Link href="/testemunhos" className="link-arrow" style={{ justifyContent: 'center', display: 'inline-flex' }}>Ver todos os testemunhos</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-band alt" style={{ background: 'var(--sand)' }}>
        <div className="container">
          <div className="eyebrow" style={{ justifyContent: 'center' }}>Fale com a equipa</div>
          <h2>Pronto para encontrar<br />o seu próximo <strong>carro</strong>?</h2>
          <p>Visite-nos em Lisboa ou marque uma chamada — sem compromisso, sem pressão de vendas.</p>
          <div className="hero-cta" style={{ justifyContent: 'center' }}>
            <Link href="/contacto" className="btn btn-primary">Marcar visita</Link>
            <Link href="/contacto" className="btn btn-ghost">WhatsApp NextDrive</Link>
          </div>
        </div>
      </section>

      <Footer info={info} />
    </>
  );
}
