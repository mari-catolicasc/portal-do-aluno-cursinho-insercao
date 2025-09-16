import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { api } from "../../services/api";

const fadeIn = keyframes`from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); }`;
const fadeOut = keyframes`from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(-20px); }`;

const PageTitle = styled.h1`
    font-size: 2rem;
    color: #333;
    margin-bottom: 2rem;
`;

const CandidaturaList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const CandidaturaCard = styled.div`
    background-color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const UserInfo = styled.div`
    display: flex;
    gap: 1.5rem;
    align-items: center;
    flex-grow: 1;
    span {
        color: #555;
    }
`;

const Actions = styled.div`
    display: flex;
    gap: 1rem;
`;

const ActionButton = styled.button`
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.2s;
    
    &.approve {
        background-color: #28a745;
        color: white;
        &:hover { background-color: #218838; }
    }
    
    &.reject {
        background-color: #dc3545;
        color: white;
        &:hover { background-color: #c82333; }
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

const ToastMessage = styled.div`
    position: fixed; top: 20px; right: 20px; padding: 1rem 1.5rem;
    background-color: ${props => (props.type === 'success' ? '#28a745' : '#dc3545')};
    color: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 2000; visibility: ${props => (props.show ? 'visible' : 'hidden')};
    animation: ${props => (props.show ? fadeIn : fadeOut)} 0.3s ease;
`;

export default function NovasCandidaturas() {
    const [candidaturas, setCandidaturas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type }), 3000);
    };

    const fetchCandidaturas = async () => {
        setLoading(true);
        try {
            const response = await api.get('/api/usuarios/professores/pendentes');
            setCandidaturas(response.data);
        } catch (err) {
            console.error(err);
            showToast("Falha ao carregar as candidaturas.", 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCandidaturas();
    }, []);

    const handleAprovar = async (id) => {
        setLoading(true);
        try {
            await api.put(`/api/usuarios/${id}/aprovar`);
            showToast("Candidatura aprovada com sucesso!");
            fetchCandidaturas(); 
        } catch {
            showToast("Erro ao aprovar a candidatura.", 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleRejeitar = async (id) => {
        if (window.confirm("Tem a certeza que quer rejeitar esta candidatura? A ação não pode ser desfeita.")) {
            setLoading(true);
            try {
                await api.delete(`/api/usuarios/${id}`);
                showToast("Candidatura rejeitada com sucesso.");
                fetchCandidaturas(); 
            } catch {
                showToast("Erro ao rejeitar a candidatura.", 'error');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div>
            <ToastMessage show={toast.show} type={toast.type}>{toast.message}</ToastMessage>
            <PageTitle>Novas Candidaturas de Educadores</PageTitle>

            {loading && <p>A carregar candidaturas...</p>}

            {!loading && candidaturas.length === 0 && (
                <p>Não há novas candidaturas pendentes de aprovação.</p>
            )}

            <CandidaturaList>
                {candidaturas.map(user => (
                    <CandidaturaCard key={user.id}>
                        <UserInfo>
                            <span>{user.nome}</span>
                            
                        </UserInfo>
                        <Actions>
                            <ActionButton className="approve" onClick={() => handleAprovar(user.id)} disabled={loading}>
                                Aprovar ✔
                            </ActionButton>
                            <ActionButton className="reject" onClick={() => handleRejeitar(user.id)} disabled={loading}>
                                Rejeitar ✖
                            </ActionButton>
                        </Actions>
                    </CandidaturaCard>
                ))}
            </CandidaturaList>
        </div>
    );
}
