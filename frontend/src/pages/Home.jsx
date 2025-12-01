
import { useState, useEffect } from 'react';
import { api } from '../services/api';
import Navbar from "../components/reused/Navbar";
import Banner from "../components/Banner";
import Section from "../components/Section";
import Footer from "../components/reused/Footer";

import '../global.css';

export default function Home() {
    const [secoes, setSecoes] = useState([]);
    const [bannerUrl, setBannerUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const [resSecoes, resBanner] = await Promise.all([
                    api.get('/api/secoes'),
                    api.get('/api/banners/ativo')
                ]);

                setSecoes(resSecoes.data);
                setBannerUrl(`http://localhost:8080${resBanner.data.imagem}`);

            } catch (error) {
                console.error("Erro ao buscar dados da home:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>
            <p>Carregando...</p>
        </div>;
    }

    if (error) {
        return <div>Erro ao carregar a página. Tente novamente mais tarde.</div>;
    }

    return (
        <>
            <Navbar />
            <Banner imagemUrl={bannerUrl} />
            {secoes.map(secao => (

                <Section
                    key={secao.id}
                    titulo={secao.titulo}
                    imagem={secao.imagem}
                    texto={secao.texto}
                />

            ))} 
            <Section/>
            <Footer/>
        </>
    )
}

