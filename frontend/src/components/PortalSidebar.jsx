import logo from '../assets/imgs/logo_sem_fundo.png';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// ========== STYLED COMPONENTS (CSS) ==========

const SidebarContainer = styled.div`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  width: 323px;
  height: 1024px;
  background-color: #F2B924;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow-y: auto;
  overflow-x: visible;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  font-family: 'Roboto', sans-serif;
  font-weight: 600;
  font-size: 20px;

  &.collapsed {
    width: 80px;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
  }

  @media (max-width: 768px) {
    transform: translateX(-100%);
    width: 280px;

    &.mobile-open {
      transform: translateX(0);
    }
  }

  @media (max-height: 800px) {
    height: 100vh;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 25px 20px;
  flex-shrink: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 10px;

  .collapsed & {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px 10px;
    gap: 15px;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
`;

const Logo = styled.div`
  width: 81px;
  height: 81px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }

  .collapsed & {
    width: 40px;
    height: 40px;
  }
`;

const ToggleButton = styled.button`
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  transition: all 0.2s ease;
  padding: 8px;
  flex-shrink: 0;
  outline: none;

  &:hover,
  &:focus {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
    outline: none;
  }
`;

const HamburgerLine = styled.span`
  width: 20px;
  height: 2px;
  background-color: #E1346A;
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  .collapsed &:nth-child(1) {
    transform: none;
  }

  .collapsed &:nth-child(2) {
    opacity: 1;
  }

  .collapsed &:nth-child(3) {
    transform: none;
  }
`;

const NavMenu = styled.nav`
  flex: 1;
  padding: 20px 25px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: visible;

  .collapsed & {
    padding: 15px 10px;
    align-items: center;
    gap: 10px;
    overflow: visible;
  }

  @media (max-height: 800px) {
    gap: 12px;
  }
`;

const MenuGroup = styled.div`
  margin-bottom: 8px;

  &.expanded .expand-icon {
    transform: rotate(180deg);
  }

  .collapsed & {
    margin-bottom: 8px;
  }
`;

const GroupHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 8px;
  user-select: none;
  position: relative;
  margin-bottom: 4px;
  overflow: visible;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateX(2px);
  }

  &.active {
    background-color: rgba(255, 255, 255, 0.2);
  }

  .collapsed & {
    width: 50px;
    height: 50px;
    justify-content: center;
    padding: 12px;
    margin-bottom: 8px;
    border-radius: 12px;
    background-color: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    position: relative;
    overflow: visible;

    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
      transform: scale(1.05);
    }

    &::after {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      background-color: #E1346A;
      border-radius: 3px;
    }

    &[data-group="1"]::after {
      content: '📝';
      background: none;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &[data-group="2"]::after {
      content: '📅';
      background: none;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &[data-group="3"]::after {
      content: '🎓';
      background: none;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &[data-group="4"]::after {
      content: '👤';
      background: none;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  @media (max-height: 800px) {
    padding: 14px 18px;
  }
`;

const GroupTitle = styled.span`
  color: #E1346A;
  font-weight: 600;
  font-size: 15px;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  flex: 1;

  .collapsed & {
    display: none;
  }
`;

const ExpandIcon = styled.span`
  color: #E1346A;
  font-size: 12px;
  transition: transform 0.3s ease;
  font-weight: bold;
  margin-left: 16px;

  .collapsed & {
    display: none;
  }
`;

const Submenu = styled.ul`
  list-style: none;
  max-height: 0;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background-color: rgba(255, 255, 255, 0.05);
  margin: 8px 0 0 0;
  border-radius: 8px;
  padding-left: 0;

  .expanded & {
    max-height: 200px;
    padding: 12px 0;
  }

  .collapsed & {
    display: none;
  }

  li {
    margin: 4px 0;
  }
`;

const SubmenuItem = styled.a`
  display: block;
  padding: 12px 24px;
  color: #FFFFFF;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.2s ease;
  border-radius: 6px;
  margin: 0 12px;
  white-space: nowrap;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
    transform: translateX(4px);
  }

  &.active {
    background-color: rgba(255, 255, 255, 0.2);
    font-weight: 500;
  }

  @media (max-height: 800px) {
    padding: 10px 20px;
  }
`;

const LogoutContainer = styled.div`
  padding: 25px;
  flex-shrink: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 20px;

  .collapsed & {
    padding: 15px 10px;
  }
`;

const LogoutButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background-color: transparent;
  border: none;
  border-radius: 8px;
  color: #FFFFFF;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  justify-content: flex-start;

  &:hover {
    background-color: #FFFFFF;
    color: #F2B924;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }

  .collapsed & {
    width: 50px;
    height: 50px;
    padding: 12px;
    justify-content: center;
    border-radius: 12px;
    background-color: rgba(255, 255, 255, 0.1);
    border: none;
    position: relative;

    &:hover {
      background-color: rgba(255, 255, 255, 0.9);
      color: #F2B924;
      transform: scale(1.05);
    }
  }
`;

const LogoutIcon = styled.svg`
  min-width: 16px;
  transition: all 0.2s ease;

  .collapsed & {
    width: 20px;
    height: 20px;
  }
`;

const LogoutText = styled.span`
  transition: all 0.2s ease;
  white-space: nowrap;

  .collapsed & {
    display: none;
  }
`;

// ========== COMPONENTE REACT ==========

export default function PortalSidebar({ isCollapsed, setIsCollapsed }) {
  const navigate = useNavigate();
  const submenuRoutes = { 
    'Ver notas': '/portal/notas',
    'Lançar notas': '/portal/notas/novo',
    'Criar nova avaliação': '/portal/avaliacoes/novo',
  }

  // Estados do componente
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState([]);
  const [activeSubmenuItem, setActiveSubmenuItem] = useState('');
  const [activeGroup, setActiveGroup] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Efeito para detectar mudanças no tamanho da tela
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Efeito para atalho de teclado (Ctrl + B)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'b') {
        e.preventDefault();
        toggleSidebar();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Função para toggle da sidebar
  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileOpen(!isMobileOpen);
    } else {
      if (typeof setIsCollapsed === 'function') {
        setIsCollapsed(!isCollapsed);
      }
      if (!isCollapsed) {
        // Fecha todos os grupos quando minimiza
        setExpandedGroups([]);
      }
    }
  };

  // Função para toggle de grupo individual
  const toggleGroup = (groupId) => {
    // Não permite expandir grupos quando sidebar está minimizada (exceto mobile)
    if (isCollapsed && !isMobile) {
      return;
    }

    if (expandedGroups.includes(groupId)) {
      setExpandedGroups(expandedGroups.filter(id => id !== groupId));
    } else {
      setExpandedGroups([...expandedGroups, groupId]);
    }
  };

  // Função para lidar com grupos sem submenu
  const handleSingleGroupClick = (groupId, groupTitle) => {
    console.log(`Navegando para: ${groupTitle}`);
    setActiveGroup(groupId);
    setActiveSubmenuItem('');
  };

  // Função para lidar com itens de submenu
  const handleSubmenuClick = (item, e) => {
    e.stopPropagation();
    console.log(`Submenu clicado: ${item}`);
    setActiveSubmenuItem(item);
    setActiveGroup('');
    // Navega para a rota correspondente
    const route = submenuRoutes[item];
    if(route) {
      navigate(route);
    }
  };

  // Função de logout
  const handleLogout = () => {
    const userConfirmed = window.confirm('Tem certeza que deseja sair do sistema?');
    
    if (userConfirmed) {
      setTimeout(() => {
        alert('Você foi desconectado do sistema.');
        console.log('Usuário deslogado com sucesso');
      }, 500);
    } else {
      console.log('Logout cancelado pelo usuário');
    }
  };

  // Dados dos grupos de menu
  const menuGroups = [
    {
      id: 1,
      title: 'Recados e conteúdos',
      emoji: '📝',
      submenu: [
        'Recados gerais',
        'Criar novo recado',
        'Conteúdos',
        'Postar novo conteúdo'
      ]
    },
    {
      id: 2,
      title: 'Frequência',
      emoji: '📅',
      submenu: [
        'Verificar frequência',
        'Lançar frequência'
      ]
    },
    {
      id: 3,
      title: 'Notas',
      emoji: '🎓',
      submenu: [
        'Ver notas',
        'Lançar notas',
        'Criar nova avaliação',
        'Avaliações cadastradas'
      ]
    },
    {
      id: 4,
      title: 'Seu perfil',
      emoji: '👤',
      submenu: null // Sem submenu
    }
  ];

  return (
    <SidebarContainer 
      className={`${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}
    >
      {/* ========== CABEÇALHO DA SIDEBAR ========== */}
      <SidebarHeader>
        {/* Container do logo da escola */}
        <LogoContainer>
          <Logo>
            <img src={logo} alt="Logo sem fundo" />
          </Logo>
        </LogoContainer>
        
        {/* Botão hambúrguer para expandir/minimizar sidebar */}
        <ToggleButton onClick={toggleSidebar} title="Expandir/Minimizar">
          {/* Três linhas do ícone hambúrguer */}
          <HamburgerLine />
          <HamburgerLine />
          <HamburgerLine />
        </ToggleButton>
      </SidebarHeader>

      {/* ========== MENU DE NAVEGAÇÃO PRINCIPAL ========== */}
      <NavMenu>
        {menuGroups.map(group => (
          <MenuGroup 
            key={group.id}
            data-group={group.id}
            className={expandedGroups.includes(group.id) ? 'expanded' : ''}
          >
            {/* Cabeçalho clicável do grupo */}
            <GroupHeader
              data-group={group.id}
              onClick={() => group.submenu ? 
                toggleGroup(group.id) : 
                handleSingleGroupClick(group.id, group.title)
              }
              title={group.title}
              className={activeGroup === group.id ? 'active' : ''}
            >
              <GroupTitle>{group.title}</GroupTitle>
              {/* Seta que roda quando o grupo é expandido */}
              {group.submenu && <ExpandIcon className="expand-icon">▼</ExpandIcon>}
            </GroupHeader>
            
            {/* Submenu que se expande/contrai */}
            {group.submenu && (
              <Submenu>
                {group.submenu.map(item => (
                  <li key={item}>
                    {/* Links para páginas específicas */}
                    <SubmenuItem
                      as="button"
                      onClick={(e) => handleSubmenuClick(item, e)}
                      className={`submenu-item ${activeSubmenuItem === item ? 'active' : ''}`}
                    >
                      {item}
                    </SubmenuItem>
                  </li>
                ))}
              </Submenu>
            )}
          </MenuGroup>
        ))}
      </NavMenu>

      {/* ========== BOTÃO DE LOGOUT ========== */}
      <LogoutContainer>
        {/* Botão com controle para logout */}
        <LogoutButton onClick={handleLogout} title="Sair do sistema">
          {/* Ícone SVG de saída/logout */}
          <LogoutIcon width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path 
              d="M6 2H3C2.44772 2 2 2.44772 2 3V13C2 13.5523 2.44772 14 3 14H6" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round"
            />
            <path 
              d="M10 5L13 8L10 11" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M13 8H6" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round"
            />
          </LogoutIcon>
          {/* Texto do botão (some quando sidebar minimizada) */}
          <LogoutText>Sair</LogoutText>
        </LogoutButton>
      </LogoutContainer>
    </SidebarContainer>
  );
};