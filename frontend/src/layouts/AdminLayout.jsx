import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import PortalSidebar from '../components/PortalSidebar'; 
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer'; 

// --- Estilização do Layout ---
const AdminContainer = styled.div`
    display: flex;
    min-height: 100vh;
    background-color: #f8f9fa; 
`;

const ContentWrapper = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`;

const MainContent = styled.main`
    flex-grow: 1;
    padding: 2rem;
    overflow-y: auto;
`;

export default function AdminLayout() {
    return (
        <AdminContainer>
            <PortalSidebar />

            <ContentWrapper>
                <MainContent>

                    <Outlet />
                </MainContent>
            </ContentWrapper>
        </AdminContainer>
    );
}
