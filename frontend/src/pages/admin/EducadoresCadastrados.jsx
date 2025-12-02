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
    font-weight: 600;
    background-color: ${props => props.secondary ? '#6c757d' : (props.danger ? '#dc3545' : '#f2b924')};
    color: ${props => props.secondary ? '#FFFFFF' : (props.danger ? '#FFFFFF' : '#42403dff')};
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        background-color: ${props => props.secondary ? '#5a6268' : (props.danger ? '#c82333' : '#eab308')};
    }
`;

const ToastMessage = styled.div`
    position: fixed; top: 20px; right: 20px; padding: 1rem 1.5rem;
    background-color: ${props => (props.type === 'success' ? '#28a745' : '#dc3545')};
    color: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 2000; visibility: ${props => (props.show ? 'visible' : 'hidden')};
    animation: ${props => (props.show ? fadeIn : fadeOut)} 0.3s ease;
`;

export default function EducadoresCadastrados() {

    const [educadores, setEducadores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type }), 3000);
    };

    const fetchEducadores = async () => {
        setLoading(true);
        try {
            const response = await api.get('/api/usuarios/professores/ativos');
            setEducadores(response.data);
        } catch (err) {
            console.error("Erro ao buscar educadores:", err);
            showToast("Falha ao carregar os educadores cadastrados.", 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEducadores();
    }, []);

    const handleRemover = async (id) => {

        if (window.confirm("Tem a certeza que quer remover este educador? A ação não pode ser desfeita.")) {
            setLoading(true);
            try {
               
                await api.delete(`/api/usuarios/${id}`);
                showToast("Educador removido com sucesso.");
                fetchEducadores(); 
                
            } catch (err) {

                console.error("Erro ao remover educador:", err);
                showToast("Erro ao remover o educador.", 'error');

            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <Div>
            <ToastMessage show={toast.show} type={toast.type}>{toast.message}</ToastMessage>
            <h1>Educadores Cadastrados</h1>

            <ManagementDiv>
                {loading && <p>A carregar educadores...</p>}

                {!loading && educadores.length === 0 && (
                    <p>Ainda não há educadores cadastrados e ativos.</p>
                )}

                <ListDiv>
                    {educadores.map(user => (
                        <Card key={user.id}>
                            <InfoDiv>
                                <span>{user.nome}</span>
                            </InfoDiv>
                            <ActionsDiv>
                                <Button danger onClick={() => handleRemover(user.id)} disabled={loading}>
                                    Remover
                                </Button>
                            </ActionsDiv>
                        </Card>
                    ))}
                </ListDiv>
            </ManagementDiv>
        </Div>
    );
}
