import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// --- Estilização do Layout ---
const PortalContainer = styled.div`
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

export default function PortalLayout() {
    return (
        <PortalContainer>
            {/* <PortalSidebar />  // O espaço para a sidebar do portal está aqui */}
            <div style={{width: '280px', backgroundColor: '#e9ecef', flexShrink: 0}}>
                (Aqui ficará a Sidebar do Portal)
            </div>

            <ContentWrapper>
                <Navbar />
                <MainContent>
                    
                    <Outlet />
                </MainContent>
                <Footer />
            </ContentWrapper>
        </PortalContainer>
    );
}
