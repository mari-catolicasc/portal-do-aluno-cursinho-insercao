import { useState } from "react";
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import fundoNavbar from '../assets/imgs/logo.jpg'
import logo from '../assets/imgs/logo_sem_fundo.png';

const NavbarDiv = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 3rem;
    padding: 0 1rem;
    background-image: url(${fundoNavbar}); 
    background-position: 100% 70px;    
    position: relative;
`

const Logo = styled.img`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    height: 100%;
`

const MenuBtn = styled.button`
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    z-index: 20;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const MenuIcon = styled.span`
    color: #FFFFFF;
    font-size: 2rem;
`

const Dropdown = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    border-radius: 0 0 20px 0;
    width: 15rem;
    top: 3rem;
    left: 0;
    background-image: url(${fundoNavbar}); 
    background-position: 100% 70px;
    z-index: 10;
`

const StyledLink = styled(Link)`
    font-weight: 600;   
    padding: 1rem;
    font-size: 1rem;
    text-decoration: none;
    color: #FFFFFF;
    transition: background-color 0.2s;

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }

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
                    <StyledLink to="/">Página Inicial</StyledLink>
                    <StyledLink to="/admin">Login / Área do Professor</StyledLink>
                    <StyledLink to="/admin/register">Cadastre-se</StyledLink>
                </Dropdown>
            )}
        </NavbarDiv>
    );
}

