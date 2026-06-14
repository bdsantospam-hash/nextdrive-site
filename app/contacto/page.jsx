import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const revalidate = 0;

export default async function ContactoPage() {
  const { data: infoRows } = await supabase.from('info_site').select('*').eq('id', 1).single();
  const info = infoRows || {};

  const mapsUrl = info.maps_embed_url || 'https://www.google.com/maps?q=Lisboa&output=embed';

  return (
    <>
      <Header />

      <section className="page-hero">
        <div className="container">
          <div className="eyebrow">Estamos aqui</div>
          <h1>Fale com a <strong>NextDrive</strong></h1>
          <p>Visite o nosso espaço em Lisboa, ligue-nos ou deixe os seus dados — respondemos pessoalmente, sem respostas automáticas.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Os <strong>nossos</strong> contactos</h2>

              <div className="info-block">
                <h3>Endereço</h3>
                <p>{info.endereco}</p>
                {info.nota_endereco && <p className="soft">{info.nota_endereco}</p>}
              </div>

              <div className="info-block">
                <h3>Telefone &amp; WhatsApp</h3>
                <p>{info.telefone}</p>
                <p className="soft">Resposta em poucos minutos durante o horário de funcionamento</p>
              </div>

              <div className="info-block">
                <h3>Email</h3>
                <p>{info.email}</p>
                <p className="soft">Para questões gerais, financiamento ou avaliação de retoma</p>
              </div>

              <div className="info-block">
                <h3>Horário</h3>
                <p>{info.horario}</p>
                {info.horario_nota && <p className="soft">{info.horario_nota}</p>}
              </div>
            </div>

            <div>
              <form className="contact-form">
                <div className="form-grid">
                  <div>
                    <label htmlFor="nome">Nome</label>
                    <input type="text" id="nome" name="nome" placeholder="O seu nome" />
                  </div>
                  <div>
                    <label htmlFor="telefone">Telefone</label>
                    <input type="tel" id="telefone" name="telefone" placeholder="+351" />
                  </div>
                  <div className="field-full">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="email@exemplo.com" />
                  </div>
                  <div className="field-full">
                    <label htmlFor="assunto">Assunto</label>
                    <select id="assunto" name="assunto" defaultValue="">
                      <option>Tenho interesse numa viatura</option>
                      <option>Quero vender o meu carro</option>
                      <option>Financiamento</option>
                      <option>Outro assunto</option>
                    </select>
                  </div>
                  <div className="field-full">
                    <label htmlFor="mensagem">Mensagem</label>
                    <textarea id="mensagem" name="mensagem" rows={4} placeholder="Conte-nos como podemos ajudar" />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">Enviar mensagem</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">Como chegar</div>
              <h2>Visite-nos em <strong>Lisboa</strong></h2>
            </div>
            <p className="section-sub">Estacionamento próprio disponível para clientes durante a visita.</p>
          </div>
          <div className="map-wrap">
            <iframe
              src={mapsUrl}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização da NextDrive em Lisboa"
            />
          </div>
        </div>
      </section>

      <Footer info={info} />
    </>
  );
}
