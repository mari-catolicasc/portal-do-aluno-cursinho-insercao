import { useState } from "react";
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
    background-position: 100% 70px;    
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

const Links = styled.a`
    font-weight: 600;  
    padding: 10px;
    font-size: 18px;
    text-decoration: none;
    color: #FFFFFF;
`

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <NavbarDiv>
            <MenuBtn id="dropdown" onClick={() => setOpen(!open)}>
              <MenuIcon className="material-icons">menu</MenuIcon>
            </MenuBtn>

            <Logo src={logo} alt="Logo" className="logo" />

              {open && (
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