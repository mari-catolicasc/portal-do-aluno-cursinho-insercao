<<<<<<< HEAD
import { useState, useEffect } from 'react';
import { api } from '../services/api'; 
=======
//importação dos hoooks do react

// import { useEffect, useState } from "react";
// import { api } from "../services/api";

//importação dos components

>>>>>>> main
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Section from "../components/Section";
import Footer from "../components/Footer";

import '../global.css';

export default function Home() {
    const [secoes, setSecoes] = useState([]);
    const [bannerUrl, setBannerUrl] = useState(''); // Novo estado para o banner
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

<<<<<<< HEAD
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Usamos Promise.all para buscar os dois dados em paralelo
                const [resSecoes, resBanner] = await Promise.all([
                    api.get('/api/secoes'),
                    api.get('/api/banners/ativo') // Busca o banner ativo
                ]);
                
                setSecoes(resSecoes.data);
                // Monta a URL completa para a imagem do banner
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
=======
    // essa const cria um estado para guardar os dados das seção que virão da api
    // const [sections, setSections] = useState([]);

    // isso aqui é padrão quando for usar, ele executa a requisição a api apenas uma vez 
    // useEffect(() => {
    //     api.get('/sections')
    //         .then(res => setSections(res.data))
    //         .catch(err => console.error(err));
    // }, []);
>>>>>>> main

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>Erro: {error}</div>;
    }

    return (
        <>
            <Navbar />
<<<<<<< HEAD
            <Banner imagemUrl={bannerUrl} /> 
=======
            <Banner />

            {/* ele vai renderizar cada seção recebida pela api
>>>>>>> main
            
            {secoes.map(secao => (
                <Section
                    key={secao.id}
                    titulo={secao.titulo} 
                    imagem={secao.imagem}
                    texto={secao.texto}
                />
<<<<<<< HEAD
            ))}
            <Footer />
=======
            ))} */}

            <Section/>
            <Footer/>
>>>>>>> main
        </>
    )
}

