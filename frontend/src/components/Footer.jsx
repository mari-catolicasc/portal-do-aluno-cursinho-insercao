import styled from 'styled-components';
import instagram from '../assets/imgs/icon_instagram.png';
import facebook from '../assets/imgs/icon_facebook.png';
import apoiase from '../assets/imgs/icon_apoia-se.png';

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
  return (
    <FooterDiv>
      <FooterLinks>
        <RedesSociais>
          <Lin>
            <RedesSociaisIcon src={instagram} alt="Instagram" />
            <Link href="https://www.instagram.com/cursinhoinsercaojoinville/">cursinhoinsercaojoinville</Link>
          </Lin>
          <Lin>
            <RedesSociaisIcon src={facebook} alt="Facebook" />
            <Link href="https://www.facebook.com/cursinhoinsercaojoinville/">cursinhoinsercaojoinville</Link>
          </Lin>
          <Lin>
            <RedesSociaisIcon src={apoiase} alt="Apoia-se" />
            <Link href="https://apoia.se/prevestibularpopularinsercao">apoia-se</Link>
          </Lin>
        </RedesSociais>

        <Links>
          <Link href="">Universidades em Joinville e Região</Link>
          <Link href="../pages/AdminLogin.jsx">Portal do Aluno</Link>
          <Link href="/admin/register">Matrícula</Link>
          <Link href="/admin/register">Cadatro de novo educador popular</Link>
          <Link href="../pages/AdminLogin.jsx">Administração</Link>

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