import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SidebarContainer = styled.aside`
    width: 280px;
    background-color: #f2b924; // O tom de amarelo do seu design
    color: #4a4a4a;
    display: flex;
    flex-direction: column;
    padding: 1.5rem 0;
    flex-shrink: 0;
    height: 100vh;
    position: sticky;
    top: 0;
`;

const LogoContainer = styled.div`
    padding: 0 1.5rem 1.5rem 1.5rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    font-size: 1.5rem;
    font-weight: bold;
`;

const NavMenu = styled.nav`
    flex-grow: 1;
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
    
    &:hover {
        background-color: rgba(0, 0, 0, 0.05);
    }
`;

// Componente para um item de menu com dropdown
const DropdownItem = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(true); // Começa aberto por padrão
    return (
        <div>
            <NavButton onClick={() => setIsOpen(!isOpen)}>
                {title}
                <span>{isOpen ? '▲' : '▼'}</span>
            </NavButton>
            <DropdownMenu isOpen={isOpen}>
                {children}
            </DropdownMenu>
        </div>
    );
};


export default function PortalSidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user_token');
        navigate('/admin');
    };

    return (
        <SidebarContainer>
            <LogoContainer>
                Portal do Aluno
            </LogoContainer>
            <NavMenu>
                <NavItem>
                    <DropdownItem title="Recados e conteúdos">
                        <NavLinkStyled to="#">Recados gerais</NavLinkStyled>
                        <NavLinkStyled to="#">Criar novo recado</NavLinkStyled>
                        <NavLinkStyled to="#">Conteúdos</NavLinkStyled>
                        <NavLinkStyled to="#">Postar novo conteúdo</NavLinkStyled>
                    </DropdownItem>
                </NavItem>
                
                <NavItem>
                     <DropdownItem title="Frequência">
                        <NavLinkStyled to="#">Verificar frequência</NavLinkStyled>
                        <NavLinkStyled to="#">Lançar frequência</NavLinkStyled>
                    </DropdownItem>
                </NavItem>

                 <NavItem>
                     <DropdownItem title="Notas">
                        <NavLinkStyled to="/portal/notas">Ver notas</NavLinkStyled>
                        <NavLinkStyled to="/portal/notas/novo">Lançar notas</NavLinkStyled>
                        <NavLinkStyled to="/portal/avaliacoes/novo">Criar nova avaliação</NavLinkStyled>
                        <NavLinkStyled to="#">Avaliações cadastradas</NavLinkStyled>
                    </DropdownItem>
                </NavItem>
                
                <NavItem>
                    <NavLinkStyled to="#">Seu perfil</NavLinkStyled>
                </NavItem>
            </NavMenu>
            <LogoutButton onClick={handleLogout}>
                Sair ➔
            </LogoutButton>
        </SidebarContainer>
    );
}

