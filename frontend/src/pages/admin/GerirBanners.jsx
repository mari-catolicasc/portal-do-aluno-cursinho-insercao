import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { api } from "../../services/api";

// --- Animações ---
const fadeIn = keyframes`from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); }`;
const fadeOut = keyframes`from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(-20px); }`;

// --- Estilização (consistente com GerirSecoes) ---
const PageTitle = styled.h1`
    font-size: 2rem;
    color: #333;
    margin-bottom: 2rem;
`;

const ManagementSection = styled.section`
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    margin-bottom: 2rem;

    h2 {
        margin-top: 0;
        border-bottom: 1px solid #eee;
        padding-bottom: 1rem;
        margin-bottom: 1.5rem;
        font-size: 1.5rem;
        color: #4a4a4a;
    }
`;

const Form = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const Input = styled.input`
    padding: 0.8rem;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
`;

const Card = styled.div`
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    
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
            const response = await api.get('/api/banners/historico');
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
            const uploadResponse = await api.post('/api/uploads', formData);
            const filePath = uploadResponse.data.filePath;
            await api.post('/api/banners', { imagem: filePath });
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
            await api.put(`/api/banners/${bannerId}/reativar`);
            showToast("Banner reativado com sucesso!");
            fetchHistorico();
        } catch {
            showToast("Erro ao reativar o banner.", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <ToastMessage show={toast.show} type={toast.type}>{toast.message}</ToastMessage>
            <PageTitle>Gestão de Banners</PageTitle>

            <ManagementSection>
                <h2>Gerir Banner Principal</h2>
                <Form>
                    <label htmlFor="banner-upload">Carregar novo banner:</label>
                    <Input id="banner-upload" type="file" onChange={handleBannerFileChange} />
                    <Button onClick={handleUploadBanner} disabled={loading || !bannerFile}>
                        {loading ? 'A Enviar...' : 'Enviar Novo Banner'}
                    </Button>
                </Form>
                <h3 style={{ marginTop: '2rem' }}>Histórico de Banners</h3>
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
            </ManagementSection>
        </div>
    );
}