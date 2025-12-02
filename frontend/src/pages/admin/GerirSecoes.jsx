import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { api } from "../../services/api";
import Botao from "../../components/reused/Botao";

// --- Animações ---
const fadeIn = keyframes`from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); }`;
const fadeOut = keyframes`from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(-20px); }`;

// --- Estilização ---
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

const Form = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2rem 0;
    width: 100%;
    height: 100%;
    flex-grow: 1;
    border-radius: 1rem;
    gap: 1rem;
    align-items: center;
`;

const Input = styled.input`
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #0D76B8;
    border-radius: 1rem;
    color: #000000;
    background-color: #FFFFFF;
`;

const InputImg = styled.input`
    width: 100%;
    padding: 0.75rem;
    color: #000000;

    &::file-selector-button {
    width: 100%;
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
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
  }
`;

const Textarea = styled.textarea`
    width: 100%;
    padding: 0.8rem;
    border: 2px solid #0D76B8;
    border-radius: 10px;
    min-height: 120px;
    resize: vertical;
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
    color: ${props => (props.danger ? 'white' : '#4a4a4a')};
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        background-color: ${props => props.secondary ? '#5a6268' : (props.danger ? '#c82333' : '#eab308')};
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
    }
`;

const ModalOverlay = styled.div`
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background-color: rgba(0, 0, 0, 0.5); display: flex;
    justify-content: center; align-items: center; z-index: 1000;
`;

const ModalContent = styled.div`
    background-color: white; padding: 2rem; border-radius: 8px;
    width: 90%; max-width: 600px;
`;

const ToastMessage = styled.div`
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    background-color: ${props => (props.type === 'success' ? '#28a745' : '#dc3545')};
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 2000;
    visibility: ${props => (props.show ? 'visible' : 'hidden')};
    animation: ${props => (props.show ? fadeIn : fadeOut)} 0.3s ease;
`;

export default function GerirSecoes() {
    // --- States ---
    const [secoes, setSecoes] = useState([]);
    const [novaSecao, setNovaSecao] = useState({ titulo: '', texto: '' });
    const [secaoFile, setSecaoFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [secaoParaEditar, setSecaoParaEditar] = useState(null);
    const [editSecaoFile, setEditSecaoFile] = useState(null);

    // --- Funções ---
    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast({ show: false, message: '', type });
        }, 3000);
    };

    const fetchSecoes = async () => {
        try {
            setLoading(true);
            const response = await api.get('/api/secoes');
            setSecoes(response.data);
        } catch (err) {
            console.error(err);
            showToast("Falha ao carregar as seções.", 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSecoes();
    }, []);

    const handleCriarSecao = async () => {
        setLoading(true);
        try {
            let imagemPath = null;
            if (secaoFile) {
                const formData = new FormData();
                formData.append('file', secaoFile);
                const uploadResponse = await api.post('/api/uploads', formData);
                imagemPath = uploadResponse.data.filePath;
            }
            await api.post('/api/secoes', { ...novaSecao, imagem: imagemPath });
            showToast("Seção criada com sucesso!");
            setNovaSecao({ titulo: '', texto: '' });
            setSecaoFile(null);
            document.getElementById('secao-upload').value = null;
            fetchSecoes();
        } catch {
            showToast("Erro ao criar a seção.", 'error');
        } finally {
            setLoading(false);
        }
    };
    
    const handleApagarSecao = async (id) => {
        if (window.confirm("Tem a certeza que quer apagar esta seção?")) {
            setLoading(true);
            try {
                await api.delete(`/api/secoes/${id}`);
                showToast("Seção apagada com sucesso!");
                fetchSecoes();
            } catch {
                showToast("Erro ao apagar a seção.", 'error');
            } finally {
                setLoading(false);
            }
        }
    };
    
    const handleSalvarEdicao = async () => {
        if (!secaoParaEditar) return;
        setLoading(true);
        try {
            let imagemPath = secaoParaEditar.imagem;
            if (editSecaoFile) {
                const formData = new FormData();
                formData.append('file', editSecaoFile);
                const uploadResponse = await api.post('/api/uploads', formData);
                imagemPath = uploadResponse.data.filePath;
            }
            const dadosAtualizados = { titulo: secaoParaEditar.titulo, texto: secaoParaEditar.texto, imagem: imagemPath };
            await api.put(`/api/secoes/${secaoParaEditar.id}`, dadosAtualizados);
            showToast("Seção atualizada com sucesso!");
            closeEditModal();
            fetchSecoes();
        } catch {
            showToast("Erro ao atualizar a seção.", 'error');
        } finally {
            setLoading(false);
        }
    };

    // --- Funções do Modal ---
    const openEditModal = (secao) => { setSecaoParaEditar({ ...secao }); setEditSecaoFile(null); setIsEditModalOpen(true); };
    const closeEditModal = () => { setIsEditModalOpen(false); setSecaoParaEditar(null); setEditSecaoFile(null); };
    const handleEditChange = (e) => { const { name, value } = e.target; setSecaoParaEditar(p => ({ ...p, [name]: value })); };
    const handleEditSecaoFileChange = (e) => { setEditSecaoFile(e.target.files[0]); };
    const handleNovaSecaoChange = (e) => {
        const { name, value } = e.target;
        setNovaSecao(prevState => ({ ...prevState, [name]: value }));
    };
    const handleSecaoFileChange = (e) => {
        setSecaoFile(e.target.files[0]);
    };

    return (
        <Div>
            <ToastMessage show={toast.show} type={toast.type}>{toast.message}</ToastMessage>
            <h1>Gestão das Seções</h1>

            <ManagementDiv>
                <h2>Criar Nova Seção</h2>
                <Form>
                    <Input type="text" name="titulo" placeholder="Título da Seção" value={novaSecao.titulo} onChange={handleNovaSecaoChange} />
                    <Textarea name="texto" placeholder="Texto da Seção" value={novaSecao.texto} onChange={handleNovaSecaoChange} />
                    <InputImg
                        id="secao-upload" 
                        type="file"
                        onChange={handleSecaoFileChange}
                    />
                    <Botao onClick={handleCriarSecao} disabled={loading} text={loading ? 'A Guardar...' : 'Guardar Nova Seção'}/>
                </Form>
            </ManagementDiv>

            <ManagementDiv>
                <h2>Seções Atuais</h2>
                {loading && !secoes.length ? <p>A carregar seções...</p> : (
                    <ListDiv>
                        {secoes.map(secao => (
                            <Card key={secao.id}>
                                <InfoDiv>
                                    {secao.imagem && <img src={`http://localhost:8080${secao.imagem}`} alt={secao.titulo} />}
                                    <div>
                                        <h3>{secao.titulo}</h3>
                                        <p>ID: {secao.id}</p>
                                    </div>
                                </InfoDiv>
                                <ActionsDiv>
                                    <Button onClick={() => openEditModal(secao)} disabled={loading}>Editar</Button>
                                    <Button danger onClick={() => handleApagarSecao(secao.id)} disabled={loading}>Apagar</Button>
                                </ActionsDiv>
                            </Card>
                        ))}
                    </ListDiv>
                )}
            </ManagementDiv>

            {isEditModalOpen && secaoParaEditar && (
                <ModalOverlay>
                    <ModalContent>
                        <h2>Editar Seção ID: {secaoParaEditar.id}</h2>
                        <Form>
                            <label>Título:</label>
                            <Input type="text" name="titulo" value={secaoParaEditar.titulo} onChange={handleEditChange} />
                            <label>Texto:</label>
                            <Textarea name="texto" value={secaoParaEditar.texto} onChange={handleEditChange} />
                            <label>Imagem Atual:</label>
                            {secaoParaEditar.imagem ? (
                                <img src={`http://localhost:8080${secaoParaEditar.imagem}`} alt="Imagem atual" style={{ width: '100px', height: 'auto', marginBottom: '1rem' }} />
                            ) : <p>Nenhuma imagem.</p>}
                            <label htmlFor="edit-secao-upload">Trocar Imagem (Opcional):</label>
                            <Input id="edit-secao-upload" type="file" onChange={handleEditSecaoFileChange} />
                        </Form>
                        <ActionsDiv style={{ marginTop: '1.5rem', justifyContent: 'flex-end' }}>
                            <Button secondary onClick={closeEditModal} disabled={loading}>Cancelar</Button>
                            <Button onClick={handleSalvarEdicao} disabled={loading}>
                                {loading ? 'A Salvar...' : 'Salvar Alterações'}
                            </Button>
                        </ActionsDiv>
                    </ModalContent>
                </ModalOverlay>
            )}
        </Div>
    );
}

