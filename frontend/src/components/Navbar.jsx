import { useState } from "react";
<<<<<<< HEAD
import { Link } from 'react-router-dom'; // 1. Importar o componente Link
=======
>>>>>>> main
import styled from 'styled-components';
import fundoNavbar from '../assets/imgs/logo.jpg'
import logo from '../assets/imgs/logo_sem_fundo.png';

const NavbarDiv = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70px;
    padding: 0 1rem;
    background-image: url(${fundoNavbar}); 
<<<<<<< HEAD
    background-position: 100% 70px;      
=======
    background-position: 100% 70px;    
>>>>>>> main
    position: relative;
`

const Logo = styled.img`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    height: 70px;
`

const MenuBtn = styled.button`
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
<<<<<<< HEAD
    z-index: 20; // Garante que o botão fique acima do dropdown
=======
>>>>>>> main
`

const MenuIcon = styled.span`
    color: #FFFFFF;
    font-size: 35px;
`

const Dropdown = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    border-radius: 0 0 20px 0;
    width: 300px;
    top: 70px;
    left: 0;
    background-image: url(${fundoNavbar}); 
    background-position: 100% 70px;
    z-index: 10;
`

<<<<<<< HEAD
// 2. Mudar de styled.a para styled(Link)
//    Isto aplica os teus estilos ao componente Link
const StyledLink = styled(Link)`
    font-weight: 600;   
    padding: 15px; // Aumentei o padding para ser mais fácil de clicar
    font-size: 18px;
    text-decoration: none;
    color: #FFFFFF;
    transition: background-color 0.2s;

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
=======
const Links = styled.a`
    font-weight: 600;  
    padding: 10px;
    font-size: 18px;
    text-decoration: none;
    color: #FFFFFF;
>>>>>>> main
`

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <NavbarDiv>
            <MenuBtn id="dropdown" onClick={() => setOpen(!open)}>
<<<<<<< HEAD
                <MenuIcon className="material-icons">menu</MenuIcon>
=======
              <MenuIcon className="material-icons">menu</MenuIcon>
>>>>>>> main
            </MenuBtn>

            <Logo src={logo} alt="Logo" className="logo" />

              {open && (
<<<<<<< HEAD
                    <Dropdown>
                        {/* 3. Usar o novo StyledLink com a prop 'to' em vez de 'href' */}
                        <StyledLink to="/">Página Inicial</StyledLink>
                        <StyledLink to="/admin">Login / Área do Professor</StyledLink>
                        <StyledLink to="/admin/register">Cadastre-se</StyledLink>
                        {/* <StyledLink to="/portal">Portal do Aluno</StyledLink> */}
                    </Dropdown>
              )}
        </NavbarDiv>
    );
}
=======
                  <Dropdown>
                      <Links href="/">Página Inicial</Links>
                      <Links href="/frontend/src/pages/Login">Portal do Aluno</Links>
                      <Links href="/admin/register">Matrícula</Links>
                      <Links href="/admin/register">Cadastro de Educador Popular</Links>
                  </Dropdown>
              )}
        </NavbarDiv>
    );
}
>>>>>>> main
