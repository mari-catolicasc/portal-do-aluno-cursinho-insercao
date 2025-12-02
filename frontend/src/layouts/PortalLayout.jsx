import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import PortalSidebar from '../components/reused/PortalSidebar';

const AdminContainer = styled.div`
    display: flex;
    min-height: 100vh;
    background-color: #f8f9fa; 
`;

const ContentWrapper = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    margin-left: ${props => (props.$isSidebarCollapsed ? '80px' : '323px')};
    transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

const MainContent = styled.main`
    flex-grow: 1;
    padding: 2rem;
    overflow-y: auto;
`;

export default function PortalLayout() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    return (
        <AdminContainer>
            <PortalSidebar 
                isCollapsed={isSidebarCollapsed} 
                toggleSidebar={toggleSidebar} 
            />
            <ContentWrapper $isSidebarCollapsed={isSidebarCollapsed}>
                <MainContent>
                    <Outlet />
                </MainContent>
            </ContentWrapper>
        </AdminContainer>
    );
}