import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/imgs/logo_sem_fundo.png';

// --- Estilização da Sidebar ---

const SidebarContainer = styled.aside`
    width: 280px;
    background-color: #f2b924;
    color: #4a4a4a;
    display: flex;
    flex-direction: column;
    padding: 1.5rem 0;
    flex-shrink: 0;
    transition: width 0.3s ease;
    height: 100vh;
    position: sticky;
    top: 0;

    &.collapsed {
        width: 80px;
    }
`;

const SidebarHeader = styled.div`
    padding: 0 1.5rem 1.5rem 1.5rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;

    &.collapsed {
        justify-content: center;
    }
`;

const Logo = styled.img`
    height: 60px;
    transition: opacity 0.3s ease, width 0.3s ease;
    opacity: ${props => (props.isCollapsed ? 0 : 1)};
    width: ${props => (props.isCollapsed ? '0px' : 'auto')};
`;

const ToggleButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    color: #4a4a4a;
    flex-shrink: 0; 
`;

const LogoContainer = styled.div`
    padding: 0 1.5rem 1.5rem 1.5rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    // Adicione a sua logo aqui se desejar
    font-size: 1.5rem;
    font-weight: bold;
`;

const NavMenu = styled.nav`
    flex-grow: 1;
    padding: 0 1.5rem;
`;

const NavItem = styled.div`
    padding: 0 1.5rem;
`;

const NavButton = styled.button`
    width: 100%;
    background: none;
    border: none;
    padding: 0.8rem 0;
    text-align: left;
    font-size: 1rem;
    font-weight: 600;
    color: #4a4a4a;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover {
        opacity: 0.8;
    }
`;

const DropdownMenu = styled.div`
    padding-left: 1rem; // Indentação para os sub-links
    max-height: ${props => (props.isOpen ? '500px' : '0')};
    overflow: hidden;
    transition: max-height 0.3s ease-in-out;
`;

const NavLinkStyled = styled(NavLink)`
    display: block;
    padding: 0.6rem 0;
    color: #4a4a4a;
    text-decoration: none;
    border-radius: 5px;
    white-space: nowrap;

    &:hover {
        background-color: rgba(0, 0, 0, 0.05);
    }

    &.active {
        font-weight: bold;
        color: black;
    }
`;

const LogoutButton = styled.button`
    background: none;
    border: none;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    width: 100%;
    padding: 1.5rem;
    text-align: left;
    font-size: 1rem;
    font-weight: 600;
    color: #4a4a4a;
    cursor: pointer;
    white-space: nowrap;
    &:hover {
        background-color: rgba(0, 0, 0, 0.05);
    }

    .collapsed & .logout-text {
        display: none;
    }
`;

const DropdownItem = ({ title, children, isCollapsed }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <NavItem>
            <NavButton className={isCollapsed ? 'collapsed' : ''} onClick={() => setIsOpen(!isOpen)}>
                <span>{title}</span>
                <span>{isOpen ? '▲' : '▼'}</span>
            </NavButton>
            <DropdownMenu isOpen={isOpen} className={isCollapsed ? 'collapsed' : ''}>
                {children}
            </DropdownMenu>
        </NavItem>
    );
};

export default function PortalSidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Limpa o token do localStorage
        localStorage.removeItem('user_token');
        // Redireciona para a página de login
        navigate('/admin');
    };

    return (
        <SidebarContainer>
            <LogoContainer>
                Portal Admin
            </LogoContainer>
            <NavMenu>
                <NavItem>
                    <DropdownItem title="Página Inicial">
                        <NavLinkStyled to="/admin/secoes">Gerir Seções</NavLinkStyled>
                        <NavLinkStyled to="/admin/banners">Gerir Banners</NavLinkStyled>
                    </DropdownItem>
                </NavItem>
                <NavItem>
                    <DropdownItem title="Educadores Populares">
                        <NavLinkStyled to="/admin/educadores/candidaturas">Novas Candidaturas</NavLinkStyled>
                        <NavLinkStyled to="/admin/educadores/cadastrados">Educadores Cadastrados</NavLinkStyled>
                    </DropdownItem>
                </NavItem>
                <NavItem>
                    <DropdownItem title="Controle de Alunos">
                        <NavLinkStyled to="#">Novas Matrículas</NavLinkStyled>
                        <NavLinkStyled to="#">Alunos Matriculados</NavLinkStyled>
                    </DropdownItem>
                </NavItem>
                <NavItem>
                    <DropdownItem title="Redes Sociais">
                        <NavLinkStyled to="#">Redes Cadastradas</NavLinkStyled>
                        <NavLinkStyled to="#">Cadastrar Nova Rede</NavLinkStyled>
                    </DropdownItem>
                </NavItem>
            </NavMenu>
            <LogoutButton onClick={handleLogout}>
                Sair ➔
            </LogoutButton>
        </SidebarContainer>
    );
}