import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { api } from '../../services/api';
import Botao from '../../components/reused/Botao';

// --- Animações e Estilização (consistente com as outras páginas) ---
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
`

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

const Form = styled.form`
    display: flex;
    flex-direction: column;
    padding: 2rem 0;
    width: 100%;
    flex-grow: 1;
    border-radius: 1rem;
    gap: 1rem;
    align-items: center;
`;

const Label = styled.p`
    font-size: 0.95rem;
    font-weight: 600;
    color: #E23467;
    align-self: flex-start;
`

const InputImg = styled.input`
    width: 100%;
    padding: 0.75rem;
    color: #000000;

    &::file-selector-button {
        background-color: #0D76B8;
        color: #fff;
        font-weight: 500;
        padding: 1rem 2rem;
        border: none;
        border-radius: 1rem;
        margin-right: 1rem;
        cursor: pointer;
        transition: all 0.2s;
    }

    &::file-selector-button:hover {
      background-color: #095a8f;
    }
`;

const ListDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: fit-content;
    gap: 1rem;
`;

const Card = styled.div`
    background-color: #FFFFFF;
    border: 1px solid #0D76B8;
    border-radius: 8px;
    padding: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const InfoDiv = styled.div`
    h3 {
        margin: 0;
        font-size: 1rem;
        color: #333;
    }
    p {
        margin: 0.2rem 0 0;
        font-size: 0.8rem;
        color: #888;
    }
`;

const ActionsDiv = styled.div`
    display: flex;
    gap: 1rem;
`;

const ActionButton = styled.a`
    padding: 0.7rem 1.5rem;
    border: none;
    font-weight: 600;
    background-color: #0D76B8;
    color: #FFFFFF;
    border-radius: 5px;
    cursor: pointer;
    text-decoration: none;
    text-align: center;
    transition: all 0.2s;

    &:hover {
        background-color: #095a8f;
    }
`;

const DeleteButton = styled.button`
    padding: 0.7rem 1.5rem;
    border: none;
    font-weight: 600;
    background-color: #dc3545;
    color: #FFFFFF;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.2s;
    &:hover { background-color: #c82333; }
`;

const ToastMessage = styled.div`
    position: fixed; top: 20px; right: 20px; padding: 1rem 1.5rem;
    background-color: ${props => (props.type === 'success' ? '#28a745' : '#dc3545')};
    color: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 2000; visibility: ${props => (props.show ? 'visible' : 'hidden')};
    animation: ${props => (props.show ? fadeIn : fadeOut)} 0.3s ease;
`;

export default function GerirRelatorioUnis() {
    const [relatorios, setRelatorios] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type }), 3000);
    };

    const fetchRelatorios = async () => {
        setLoading(true);
        try {
            const response = await api.get('/api/relatorios');
            setRelatorios(response.data);
        } catch (err) {
            console.error(err);
            showToast("Falha ao carregar os relatórios.", 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRelatorios();
    }, []);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!selectedFile) {
            showToast("Por favor, selecione um ficheiro.", "error");
            return;
        }
        setLoading(true);
        try {

            const formData = new FormData();

            formData.append('file', selectedFile);

            await api.post('/api/relatorios', formData, {
                headers: {
   
                    'Content-Type': 'multipart/form-data',
                },
            });

            showToast("Relatório salvo com sucesso!");
            setSelectedFile(null);
            document.getElementById('relatorio-upload').value = null; 
            fetchRelatorios(); 
        } catch (err) {
            console.error(err);
            showToast("Erro ao salvar o relatório.", 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleRemover = async (id) => {
        if(window.confirm("Tem a certeza que quer apagar este relatório?")) {
            setLoading(true);
            try {
                await api.delete(`/api/relatorios/${id}`);
                showToast("Relatório removido com sucesso!");
                fetchRelatorios();
            } catch (err) {
                console.error(err);
                showToast("Erro ao remover o relatório.", 'error');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <Div>
            <ToastMessage show={toast.show} type={toast.type}>{toast.message}</ToastMessage>
            <h1>Gestão do Relatório de Universidades da Região</h1>

            <ManagementDiv>
                <h2>Cadastrar ou Alterar Relatório</h2>
                <Form onSubmit={handleUpload}>
                    <Label htmlFor="relatorio-upload">Arquivo (.PDF ou .xls)</Label>
                    <InputImg id="relatorio-upload" type="file" onChange={handleFileChange} required />
                    <Botao text={loading ? 'A Salvar...' : 'Salvar'} type="submit" disabled={loading || !selectedFile} />
                </Form>
            </ManagementDiv>

            <ManagementDiv>
                <h2>Relatórios Cadastrados</h2>
                <ListDiv>
                    {loading && <p>A carregar...</p>}
                    {!loading && relatorios.length === 0 && <p>Nenhum relatório cadastrado.</p>}
                    {relatorios.map(relatorio => (
                         <Card key={relatorio.id}>
                            <InfoDiv>
                                <div>
                                    <h3>{relatorio.nomeOriginal}</h3>
                                    <p>Enviado em: {new Date(relatorio.dataUpload).toLocaleDateString()}</p>
                                </div>
                            </InfoDiv>
                            <ActionsDiv>
                                <ActionButton href={`http://localhost:8080${relatorio.path}`} target="_blank" download>
                                    Baixar
                                </ActionButton>
                                <DeleteButton onClick={() => handleRemover(relatorio.id)} disabled={loading}>
                                    Remover
                                </DeleteButton>
                            </ActionsDiv>
                        </Card>
                    ))}
                </ListDiv>
            </ManagementDiv>
        </Div>
    );
}

