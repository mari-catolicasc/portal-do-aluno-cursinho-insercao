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

const AlunoList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const AlunoCard = styled.div`
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
        font-weight: 500;
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
    background-color: #dc3545;
    color: white;
    
    &:hover { background-color: #c82333; }

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

export default function AlunosMatriculados() {
    const [alunos, setAlunos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type }), 3000);
    };

    const fetchAlunos = async () => {
        setLoading(true);
        try {
            const response = await api.get('/api/usuarios/alunos/matriculados');
            setAlunos(response.data);
        } catch (err) {
            console.error("Erro ao buscar alunos:", err);
            showToast("Falha ao carregar os alunos matriculados.", 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAlunos();
    }, []);

    const handleRemover = async (id) => {
        if (window.confirm("Tem a certeza que quer remover este aluno? A ação não pode ser desfeita.")) {
            setLoading(true);
            try {
                await api.delete(`/api/usuarios/alunos/${id}`);
                showToast("Aluno removido com sucesso.");
                fetchAlunos(); 
            } catch (err) {
                console.error("Erro ao remover aluno:", err);
                showToast("Erro ao remover o aluno.", 'error');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div>
            <ToastMessage show={toast.show} type={toast.type}>{toast.message}</ToastMessage>
            <PageTitle>Alunos Matriculados</PageTitle>

            {loading && <p>A carregar alunos matriculados...</p>}

            {!loading && alunos.length === 0 && (
                <p>Ainda não há alunos matriculados e ativos no sistema.</p>
            )}

            <AlunoList>
                {alunos.map(user => (
                    <AlunoCard key={user.id}>
                        <UserInfo>
                            <span>{user.nome}</span>
                        </UserInfo>
                        <Actions>
                            <ActionButton onClick={() => handleRemover(user.id)} disabled={loading}>
                                Remover 🗑️
                            </ActionButton>
                        </Actions>
                    </AlunoCard>
                ))}
            </AlunoList>
        </div>
    );
}
