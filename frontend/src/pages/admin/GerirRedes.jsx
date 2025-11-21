import { api } from "../../services/api";
import Botao from '../../components/reused/Botao';
import styled, { keyframes } from "styled-components";
import { useEffect, useState } from "react";

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

const Label = styled.p`
    font-size: 0.95rem;
    font-weight: 600;
    color: #E23467;
    align-self: flex-start;
`

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
    justify-content: space-between;
    align-items: center;
`;

const InfoDiv = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;

    img {
        width: 5rem;
        height: 5rem;
        object-fit: cover;
        border-radius: 1rem;
    }

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

const Button = styled.button`
    padding: 0.7rem 1.5rem;
    border: none;
    font-weight: 600;
    background-color: ${props => props.secondary ? '#6c757d' : (props.danger ? '#dc3545' : '#f2b924')};
    color: #FFFFFF;
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

export default function GerirRedes() {
    // --- States ---
    const [redes, setRedes] = useState([]);
    const [novaRede, setNovaRede] = useState({ link: '', texto: '' });
    const [redeImg, setRedeImg] = useState(null);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [redeParaEditar, setRedeParaEditar] = useState(null);
    const [editRedeImg, setEditRedeImg] = useState(null);

    // --- Funções ---
        const showToast = (message, type = 'success') => {
            setToast({ show: true, message, type });
            setTimeout(() => {
                setToast({ show: false, message: '', type });
            }, 3000);
        };
    
        const fetchRedes = async () => {
            try {
                setLoading(true);
                const response = await api.get('/api/redes');
                setRedes(response.data);
            } catch (err) {
                console.error(err);
                showToast("Falha ao carregar as seções.", 'error');
            } finally {
                setLoading(false);
            }
        };
    
        useEffect(() => {
            fetchRedes();
        }, []);
    
        const handleCriarRede = async () => {
            setLoading(true);
            try {
                let imagemPath = null;
                if (redeImg) {
                    const formData = new FormData();
                    formData.append('file', redeImg);
                    const uploadResponse = await api.post('/api/uploads', formData);
                    imagemPath = uploadResponse.data.filePath;
                }
                await api.post('/api/redes', { ...novaRede, imagem: imagemPath });
                showToast("Rede social criada com sucesso!");
                setNovaRede({ titulo: '', texto: '' });
                setRedeImg(null);
                document.getElementById('rede-upload').value = null;
                fetchRedes();
            } catch {
                showToast("Erro ao criar a rede social.", 'error');
            } finally {
                setLoading(false);
            }
        };
        
        const handleApagarRede = async (id) => {
            if (window.confirm("Tem a certeza que quer apagar esta rede social?")) {
                setLoading(true);
                try {
                    await api.delete(`/api/redes/${id}`);
                    showToast("Rede social apagada com sucesso!");
                    fetchRedes();
                } catch {
                    showToast("Erro ao apagar a rede social.", 'error');
                } finally {
                    setLoading(false);
                }
            }
        };
        
        const handleSalvarEdicao = async () => {
            if (!redeParaEditar) return;
            setLoading(true);
            try {
                let imagemPath = redeParaEditar.imagem;
                if (editRedeImg) {
                    const formData = new FormData();
                    formData.append('file', editRedeImg);
                    const uploadResponse = await api.post('/api/uploads', formData);
                    imagemPath = uploadResponse.data.filePath;
                }
                const dadosAtualizados = { link: redeParaEditar.link, texto: redeParaEditar.texto, imagem: imagemPath };
                await api.put(`/api/redes/${redeParaEditar.id}`, dadosAtualizados);
                showToast("Rede social atualizada com sucesso!");
                closeEditModal();
                fetchRedes();
            } catch {
                showToast("Erro ao atualizar a rede social.", 'error');
            } finally {
                setLoading(false);
            }
        };
    
        // --- Funções do Modal ---
        const openEditModal = (rede) => { setRedeParaEditar({ ...rede }); setEditRedeImg(null); setIsEditModalOpen(true); };
        const closeEditModal = () => { setIsEditModalOpen(false); setRedeParaEditar(null); setEditRedeImg(null); };
        const handleEditChange = (e) => { const { name, value } = e.target; setRedeParaEditar(p => ({ ...p, [name]: value })); };
        const handleEditRedeImgChange = (e) => { setEditRedeImg(e.target.files[0]); };
        const handleNovaRedeChange = (e) => {
            const { name, value } = e.target;
            setNovaRede(prevState => ({ ...prevState, [name]: value }));
        };
        const handleRedeImgChange = (e) => {
            setRedeImg(e.target.files[0]);
        };

    return (
        <Div>
            <ToastMessage show={toast.show} type={toast.type}>{toast.message}</ToastMessage>
            <h1>Gestão das Redes Sociais</h1>

            <ManagementDiv>
                <h2>Criar Nova Rede Social</h2>
                <Form>
                    <Input type="text" name="texto" placeholder="Nome da Rede" value={novaRede.texto} onChange={handleNovaRedeChange} required/>
                    <Input name="link" placeholder="Link da Rede Social" value={novaRede.link} onChange={handleNovaRedeChange} required/>
                    <Label htmlFor="rede-upload">Imagem (obrigatório)</Label>
                    <InputImg id="rede-upload" type="file" onChange={handleRedeImgChange} required>
                    </InputImg>
                    <Botao text="Criar" onClick={handleCriarRede} disabled={loading}/>
                </Form>
            </ManagementDiv>

            <ManagementDiv>
                <h2>Redes Cadastradas</h2>
                {loading ? (
                    <p>Carregando redes sociais...</p>
                ) : redes.length === 0 ? (
                    <ListDiv>
                        <p>Nenhuma rede social cadastrada ainda.</p>
                    </ListDiv>
                ) : (
                    <ListDiv>
                        {redes.map(rede => (
                            <Card key={rede.id}>
                                <InfoDiv>
                                    {rede.imagem && <img src={`http://localhost:8080${rede.imagem}`} alt={rede.texto} />}
                                    <div>
                                        <h3 className="redeNome">{rede.texto}</h3>
                                        <p className="redeID">ID: {rede.id}</p>
                                    </div>
                                </InfoDiv>
                                <ActionsDiv>
                                    <Button onClick={() => openEditModal(rede)} disabled={loading}>Editar</Button>
                                    <Button danger onClick={() => handleApagarRede(rede.id)} disabled={loading}>Apagar</Button>
                                </ActionsDiv>
                            </Card>
                        ))}
                    </ListDiv>
                )}
            </ManagementDiv>

            {isEditModalOpen && redeParaEditar && (
                <ModalOverlay>
                    <ModalContent>
                        <h2>Editar Seção ID: {redeParaEditar.id}</h2>
                        <Form>
                            <label>Nome da Rede:</label>
                            <Input type="text" name="texto" value={redeParaEditar.texto} onChange={handleEditChange} />
                            <label>Link:</label>
                            <Input name="link" value={redeParaEditar.link} onChange={handleEditChange} />
                            <label>Imagem Atual:</label>
                            {redeParaEditar.imagem ? (
                                <img src={`http://localhost:8080${redeParaEditar.imagem}`} alt="Imagem atual" style={{ width: '100px', height: 'auto', marginBottom: '1rem' }} />
                            ) : <p>Nenhuma imagem.</p>}
                            <label htmlFor="edit-rede-upload">Trocar Imagem (Opcional):</label>
                            <Input id="edit-rede-upload" type="file" onChange={handleEditRedeImgChange} />
                        </Form>
                        <ActionsDiv style={{ marginTop: '1.5rem', justifyContent: 'flex-end' }}>
                            <Button danger onClick={closeEditModal} disabled={loading}>Cancelar</Button>
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
