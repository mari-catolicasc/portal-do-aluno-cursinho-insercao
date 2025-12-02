import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { api } from "../../services/api";
import Botao from "../../components/reused/Botao";

// --- Animações ---
const fadeIn = keyframes`from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); }`;
const fadeOut = keyframes`from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(-20px); }`;

// --- Estilização (consistente com GerirSecoes) ---
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

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
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

    img {
        width: 100%;
        height: 150px;
        object-fit: cover;
    }

    div {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    span {
        font-weight: bold;
        color: ${props => (props.ativo ? '#28a745' : '#6c757d')};
    }
`;

const Button = styled.button`
    padding: 0.7rem 1.5rem;
    border: none;
    font-weight: 600;
    background-color: #f2b924;
    color: #4a4a4a;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        background-color: #eab308;
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
    }
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

export default function GerirBanners() {
    const [historicoBanners, setHistoricoBanners] = useState([]);
    const [bannerFile, setBannerFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast({ show: false, message: '', type });
        }, 3000);
    };

    const fetchHistorico = async () => {
        try {
            setLoading(true);
            const response = await api.get('/banners/historico');
            setHistoricoBanners(response.data);
        } catch (err) {
            console.error(err);
            showToast("Falha ao carregar o histórico de banners.", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistorico();
    }, []);

    const handleBannerFileChange = (e) => {
        setBannerFile(e.target.files[0]);
    };

    const handleUploadBanner = async () => {
        if (!bannerFile) {
            showToast("Por favor, selecione um ficheiro.", "error");
            return;
        }
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('file', bannerFile);
            const uploadResponse = await api.post('/uploads', formData);
            const filePath = uploadResponse.data.filePath;
            await api.post('/banners', { imagem: filePath });
            showToast("Banner criado com sucesso!");
            setBannerFile(null);
            document.getElementById('banner-upload').value = null;
            fetchHistorico();
        } catch {
            showToast("Erro ao criar o banner.", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleReativarBanner = async (bannerId) => {
        setLoading(true);
        try {
            await api.put(`/banners/${bannerId}/reativar`);
            showToast("Banner reativado com sucesso!");
            fetchHistorico();
        } catch {
            showToast("Erro ao reativar o banner.", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Div>
            <ToastMessage show={toast.show} type={toast.type}>{toast.message}</ToastMessage>
            <h1>Gestão de Banners</h1>

            <ManagementDiv>
                <h2>Gerir Banner Principal</h2>
                <Form>
                    <p htmlFor="banner-upload">Carregar novo banner:</p>
                    <InputImg
                        id="banner-upload"
                        type="file"
                        onChange={handleBannerFileChange}
                    />
                    <Botao onClick={handleUploadBanner} disabled={loading || !bannerFile} text={loading ? 'A Enviar...' : 'Enviar Novo Banner'}/>
                </Form>
            </ManagementDiv>

            <ManagementDiv>
                <h2 style={{ marginTop: '2rem' }}>Histórico de Banners</h2>
                {loading && !historicoBanners.length ? <p>A carregar histórico...</p> : (
                    <Grid>
                        {historicoBanners.map(banner => (
                            <Card key={banner.id} ativo={banner.ativo}>
                                <img src={`http://localhost:8080${banner.imagem}`} alt={`Banner ${banner.id}`} />
                                <div>
                                    <span>{banner.ativo ? 'ATIVO' : 'INATIVO'}</span>
                                    <p>ID: {banner.id}</p>
                                    {!banner.ativo && (
                                        <Button onClick={() => handleReativarBanner(banner.id)} disabled={loading}>
                                            Reativar
                                        </Button>
                                    )}
                                </div>
                            </Card>
                        ))}
                    </Grid>
                )}
            </ManagementDiv>
        </Div>
    );
}

