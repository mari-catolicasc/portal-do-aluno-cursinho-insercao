import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { api } from "../../services/api";

const fadeIn = keyframes`from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); }`;
const fadeOut = keyframes`from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(-20px); }`;

const Div = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    align-content: center;
    padding: 1rem;
    height: 100%;
    gap: 10px;

    h1 {
        margin-top: 0;
        margin-bottom: 1rem;
        font-size: 1.4rem;
        color: #0D76B8;
    }
`;

const ManagementDiv = styled.section`
    background-color: #FEF8E9;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    margin-bottom: 2rem;

    h2 {
        margin-top: 0;
        margin-bottom: 1rem;
        font-size: 1rem;
        color: #0D76B8;
    }
`;

const ListDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: fit-content;
    gap: 2rem;
`;

const Card = styled.div`
    background-color: #FFFFFF;
    border: 1px solid #0D76B8;
    border-radius: 8px;
    padding: 1.5rem;
    display: flex;
    gap: 2rem;
    justify-content: space-between;
    align-items: center;
`;

const InfoDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;

    h3 {
        margin: 0;
        font-size: 1rem;
        color: #333;
    }

    p {
        margin: 0.2rem 0 0;
        font-size: 0.8rem;
        color: #333;
        word-break: break-all;
    }
`;

const ActionsDiv = styled.div`
    display: flex;
    gap: 1rem;
`;

const Button = styled.button`
    padding: 0.7rem 1.5rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.2s;

    background-color: ${props =>
        props.approve ? '#28a745' :
        props.danger ? '#dc3545' :
        '#E5E5E5'
    };

    color: ${props =>
        props.approve || props.danger ? '#FFFFFF' : '#333'
    };

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        background-color: ${props =>
            props.approve ? '#218838' :
            props.danger ? '#c82333' :
            '#D4D4D4'
        };
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
    }
`;

const ToastMessage = styled.div`
    position: fixed; top: 20px; right: 20px; padding: 1rem 1.5rem;
    background-color: ${props => (props.type === 'success' ? '#28a745' : '#dc3545')};
    color: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 2000; visibility: ${props => (props.show ? 'visible' : 'hidden')};
    animation: ${props => (props.show ? fadeIn : fadeOut)} 0.3s ease;
`;

export default function NovasMatriculas() {
    const [matriculas, setMatriculas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type }), 3000);
    };

    const fetchMatriculas = async () => {
        setLoading(true);
        try {
            const response = await api.get('/api/usuarios/alunos/pendentes');
            setMatriculas(response.data);
        } catch (err) {
            console.error("Erro ao buscar matrículas:", err);
            showToast("Falha ao carregar as novas matrículas.", 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMatriculas();
    }, []);

    const handleAprovar = async (id) => {
        setLoading(true);
        try {
            await api.put(`/api/usuarios/alunos/${id}/aprovar`);
            showToast("Matrícula aprovada com sucesso!");
            fetchMatriculas(); 
        } catch (err) {
            console.error("Erro ao aprovar matrícula:", err);
            showToast("Erro ao aprovar a matrícula.", 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleRejeitar = async (id) => {
        if (window.confirm("Tem a certeza que quer rejeitar esta matrícula? A ação não pode ser desfeita.")) {
            setLoading(true);
            try {
                await api.delete(`/api/usuarios/alunos/${id}`);
                showToast("Matrícula rejeitada com sucesso.");
                fetchMatriculas(); 
            } catch (err) {
                console.error("Erro ao rejeitar matrícula:", err);
                showToast("Erro ao rejeitar a matrícula.", 'error');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <Div>
            <ToastMessage show={toast.show} type={toast.type}>{toast.message}</ToastMessage>
            <h1>Novas Matrículas de Alunos</h1>

            <ManagementDiv>
                {loading && <p>A carregar novas matrículas...</p>}

                {!loading && matriculas.length === 0 && (
                    <p>Não há novas matrículas pendentes de aprovação.</p>
                )}

                <ListDiv>
                    {matriculas.map(user => (
                        <Card key={user.id}>
                            <InfoDiv>
                                <span>{user.nome}</span>
                            </InfoDiv>
                            <ActionsDiv>
                                <Button approve onClick={() => handleAprovar(user.id)} disabled={loading}>
                                    Aprovar
                                </Button>

                                <Button danger onClick={() => handleRejeitar(user.id)} disabled={loading}>
                                    Rejeitar
                                </Button>
                            </ActionsDiv>
                        </Card>
                    ))}
                </ListDiv>
            </ManagementDiv>
        </Div>
    );
}
