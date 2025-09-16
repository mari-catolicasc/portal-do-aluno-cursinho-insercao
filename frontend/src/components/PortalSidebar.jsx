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

export default function PortalSidebar({ isCollapsed, setIsCollapsed }) {
    const [openDropdown, setOpenDropdown] = useState(null);

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
    );
}
