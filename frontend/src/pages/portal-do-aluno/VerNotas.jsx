import CVerNotas from '../../components/CVerNotas';
import PortalSidebar from '../../components/PortalSidebar';
import styled from 'styled-components';
import { useState } from "react";
import '../../global.css';

const LayoutDiv = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

const Content = styled.div`
  flex-grow: 1;
  margin-left: ${({ $collapsed }) => ($collapsed ? "80px" : "20%")};
  transition: margin-left 0.3s ease;

  @media (max-width: 1500px) {
    margin-left: ${({ $collapsed }) => ($collapsed ? "60px" : "25%")};
  }

  @media (max-width: 1000px) {
    margin-left: ${({ $collapsed }) => ($collapsed ? "60px" : "100%")};
  }

  @media (max-width: 500px) {
    margin-left: ${({ $collapsed }) => ($collapsed ? "50px" : "100%")};
  }
`;

export default function VerNotas() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <LayoutDiv>
        <PortalSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <Content $collapsed={isCollapsed}>
            <CVerNotas />
        </Content>
        </LayoutDiv>
    );
}