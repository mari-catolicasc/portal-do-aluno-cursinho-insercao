import { api } from "../../services/api";
import styled from 'styled-components';
import { useEffect, useState } from "react";

const FooterDiv = styled.footer`
  background-color: #F2B924;
  text-align: center;
  font-size: 1rem;
  line-height: 3rem;
  font-weight: 400;
  bottom: 0;
  width: 100%;
  padding: 1rem 2rem 1rem 2rem;
  color: #FFFFFF;

  /* Força TODOS os links do footer a manterem a mesma cor/decoração */
  a, a:link, a:visited, a:hover, a:active, a:focus {
    color: inherit !important;
    text-decoration: inherit !important;
  }
`;

const Link = styled.a`
  font-style: italic;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const RedesSociais = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 50%;
`;

const Lin = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0.5rem 0;
`;

const RedesSociaisIcon = styled.img`
  height: 2rem;
  margin: 0 1rem 0 0;
`;

const Links = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;

  a, a:link, a:visited, a:hover, a:active, a:focus {
    color: #E23467 !important;
    text-decoration: underline !important;
  }
`;

export default function Footer() {

  const [redes, setRedes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRedes = async () => {
      try {
          setLoading(true);
          const response = await api.get('/api/redes');
          setRedes(response.data);
      } catch (err) {
          console.error(err);
      } finally {
          setLoading(false);
      }
  };

  useEffect(() => {
    fetchRedes();
  }, []);

  return (
    <FooterDiv>
      <FooterLinks>
        <RedesSociais>
          {loading ? (
            <Lin>
              <p>Carregando redes sociais...</p>
            </Lin>
          ) : redes.length === 0 ? (
            <Lin>
              <p>Nenhuma rede social cadastrada ainda</p>
            </Lin>
          ) : (
            redes.map((rede) => (
              <Lin key={rede.id}>
                {rede.imagem && (
                  <RedesSociaisIcon
                    src={`http://localhost:8080${rede.imagem}`}
                    alt={rede.texto}
                  />
                )}
                <Link href={rede.link} target="_blank" rel="noopener noreferrer">
                  {rede.texto}
                </Link>
              </Lin>
            ))
          )}
        </RedesSociais>

        <Links>
          <Link href="/portal/login">Portal do Aluno</Link>
          <Link href="/admin/register">Quero participar (aluno/educador popular)</Link>
          <Link href="/admin/login">Administração</Link>

        </Links>
      </FooterLinks>
      <p>© 2025 Cursinho Inserção - Todos os direitos reservados</p>

      <p>
        Desenvolvedores: <Link href="https://github.com/Anselmo2001">Claudio Anselmo</Link>,{' '}
        <Link href="https://github.com/gabezadx">Gabriel Henrique Ferreira</Link>,{' '}
        <Link href="https://github.com/mwrina">Mari Rosa Oliveira</Link>,{' '}
        <Link href="https://github.com/messiaspichaujr">Messias Ferreira Pichau Junior</Link>,{' '}
        <Link href="https://github.com/nathalia-berri">Nathalia Aline Berri</Link>
      </p>

    </FooterDiv>
  );
}