<<<<<<< HEAD
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// --- Estilização da Sidebar ---

const SidebarContainer = styled.aside`
    width: 280px;
    background-color: #f2b924; 
    color: #4a4a4a;
    display: flex;
    flex-direction: column;
    padding: 1.5rem 0;
    flex-shrink: 0; 
`;

const LogoContainer = styled.div`
    display: flex;
    align-items:center;
    padding: 0rem 2rem 2rem 2rem;
`;

const LogoContainerImg = styled.img`
    max-width: 60%;
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

// Usamos NavLink para que ele receba uma classe 'active' automaticamente
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
    const [isOpen, setIsOpen] = useState(false);
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
                <LogoContainerImg src="/src/assets/favicon.png" alt="Logo" />
            </LogoContainer>
            <NavMenu>
                <NavItem>
                    <DropdownItem title="Página Inicial">
                        <NavLinkStyled to="/admin/secoes">Seções Cadastradas</NavLinkStyled>
                        <NavLinkStyled to="/admin/banners">Gerir Banners</NavLinkStyled>
                    </DropdownItem>
                </NavItem>
                <NavItem>
                     <DropdownItem title="Educadores Populares">
                        <NavLinkStyled to="#">Novas Candidaturas</NavLinkStyled>
                        <NavLinkStyled to="#">Educadores Cadastrados</NavLinkStyled>
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
=======
import styled from 'styled-components';
import { useState } from "react";
import logo from '../assets/imgs/logo_sem_fundo.png';
import sair from '../assets/imgs/icon_sair.png';

const SidebarDiv = styled.div`
    width: ${({ $collapsed }) => ($collapsed ? "80px" : "20%")};
    height: 100vh;
    position: fixed;
    background-color: #F2B924;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    left: 0;
    padding: 0 2% 2% 2%;
    transition: width 0.3s ease;
    overflow: hidden;

    @media (max-width: 1500px) {
        width: ${({ $collapsed }) => ($collapsed ? "60px" : "25%")};
    }

    @media (max-width: 1000px) {
        width: ${({ $collapsed }) => ($collapsed ? "60px" : "100%")};
    }

    @media (max-width: 500px) {
        width: ${({ $collapsed }) => ($collapsed ? "50px" : "100%")};
    }
`;

const LogoDiv = styled.div`
    width: 100%;
    display: flex;
    justify-content: ${({ $collapsed }) => ($collapsed ? "center" : "flex-start")};
    cursor: pointer;
`;

const Logo = styled.img`
    position: absolute;
    left: 0;
    top: 0;
    height: 70px;
    transition: height 0.3s ease;

    @media (max-width: 1500px) {
        height: 50px;
    }

    @media (max-width: 1000px) {
        height: 40px;
    }
`;

const Opcoes = styled.div`
    display: flex;
    flex-direction: column;
`;

const Opcao = styled.div`
    display: flex;
    flex-direction: column;
    line-height: 40px;
    margin: 5% 0;
    position: relative;
`;

const DropdownBtn = styled.button`
    font-size: ${({ $collapsed }) => ($collapsed ? "0" : "16px")};
    color: #E1346A;
    border: none;
    background: none;
    width: 100%;
    text-align: ${({ $collapsed }) => ($collapsed ? "center" : "left")};
    cursor: pointer;
    outline: none;
    transition: font-size 0.3s ease;

    @media (max-width: 1500px) {
        font-size: ${({ $collapsed }) => ($collapsed ? "0" : "14px")};
    }

    @media (max-width: 1000px) {
        font-size: ${({ $collapsed }) => ($collapsed ? "0" : "13px")};
    }

    @media (max-width: 500px) {
        font-size: ${({ $collapsed }) => ($collapsed ? "0" : "12px")};
    }
`;

const DropdownContent = styled.div`
    display: ${({ $open }) => ($open ? "flex" : "none")};
    flex-direction: column;
    gap: 8px;
    padding-left: 16px;
`;

const Link = styled.a`
    color: #FFFFFF;
    text-decoration: none;
    font-size: ${({ $collapsed }) => ($collapsed ? "0" : "16px")};
    transition: font-size 0.3s ease;

    &:hover {
        text-decoration: underline;
    }

    @media (max-width: 1500px) {
        font-size: ${({ $collapsed }) => ($collapsed ? "0" : "14px")};
    }

    @media (max-width: 1000px) {
        font-size: ${({ $collapsed }) => ($collapsed ? "0" : "12px")};
    }

    @media (max-width: 500px) {
        font-size: ${({ $collapsed }) => ($collapsed ? "0" : "12px")};
    }
`;

const Sair = styled.button`
    font-size: ${({ $collapsed }) => ($collapsed ? "0" : "16px")};
    display: flex;
    flex-direction: row;
    gap: ${({ $collapsed }) => ($collapsed ? "0" : "30px")};
    background-color: transparent;
    border: none;
    cursor: pointer;

    @media (max-width: 1500px) {
        font-size: ${({ $collapsed }) => ($collapsed ? "0" : "14px")};
    }

    @media (max-width: 1000px) {
        font-size: ${({ $collapsed }) => ($collapsed ? "0" : "12px")};
    }

    @media (max-width: 500px) {
        font-size: ${({ $collapsed }) => ($collapsed ? "0" : "12px")};
    }
`;

const SairLink = styled.p`
    color: #E3271E;
    text-decoration: none;
    transition: font-size 0.3s ease;

    @media (max-width: 1500px) {
        font-size: ${({ $collapsed }) => ($collapsed ? "0" : "16px")};
    }

    @media (max-width: 1000px) {
        font-size: ${({ $collapsed }) => ($collapsed ? "0" : "14px")};
    }

    @media (max-width: 500px) {
        font-size: ${({ $collapsed }) => ($collapsed ? "0" : "14px")};
    }
`;

const SairIcon = styled.img`
    height: ${({ $collapsed }) => ($collapsed ? "30px" : "18px")};
`;

export default function PortalSidebar() {
    const [openDropdown, setOpenDropdown] = useState(null);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleDropdown = (menu) => {
        setOpenDropdown(openDropdown === menu ? null : menu);
    };

    return (
        <SidebarDiv $collapsed={isCollapsed}>
            <LogoDiv
                $collapsed={isCollapsed}
                onClick={() => setIsCollapsed(!isCollapsed)}
            >
                <Logo src={logo} />
            </LogoDiv>

            <Opcoes>
                <Opcao>
                    <DropdownBtn
                        $collapsed={isCollapsed}
                        onClick={() => toggleDropdown("recados")}
                    >
                        Recados e conteúdos
                    </DropdownBtn>
                    <DropdownContent $open={openDropdown === "recados" && !isCollapsed}>
                        <Link href="#">Recados gerais</Link>
                        <Link href="#">Criar novo recado</Link>
                        <Link href="#">Conteúdos</Link>
                        <Link href="#">Postar novo conteúdo</Link>
                    </DropdownContent>
                </Opcao>
                <Opcao>
                    <DropdownBtn
                        $collapsed={isCollapsed}
                        onClick={() => toggleDropdown("frequencia")}
                    >
                        Frequência
                    </DropdownBtn>
                    <DropdownContent $open={openDropdown === "frequencia" && !isCollapsed}>
                        <Link href="#">Verificar frequência</Link>
                        <Link href="#">Lançar frequência</Link>
                    </DropdownContent>
                </Opcao>
                <Opcao>
                    <DropdownBtn
                        $collapsed={isCollapsed}
                        onClick={() => toggleDropdown("notas")}
                    >
                        Notas
                    </DropdownBtn>
                    <DropdownContent $open={openDropdown === "notas" && !isCollapsed}>
                        <Link href="#">Ver notas</Link>
                        <Link href="#">Lançar notas</Link>
                        <Link href="#">Criar nova avaliação</Link>
                        <Link href="#">Avaliações cadastradas</Link>
                    </DropdownContent>
                </Opcao>
                <Opcao>
                    <DropdownBtn $collapsed={isCollapsed}>
                        Seu perfil
                    </DropdownBtn>
                </Opcao>
            </Opcoes>

            <Sair $collapsed={isCollapsed} onclick="location.href='/home'">
                <SairLink $collapsed={isCollapsed}>Sair</SairLink>
                <SairIcon $collapsed={isCollapsed} src={sair}/>
            </Sair>
        </SidebarDiv>
>>>>>>> main
    );
}
