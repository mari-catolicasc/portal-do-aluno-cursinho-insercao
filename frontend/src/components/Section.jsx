import styled from 'styled-components';

const Secao = styled.div`
        width: 70%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 2% 15% 4% 15%; /* Aumentei a margem inferior para separar melhor as seções */
    `

const Titulo = styled.h3`
        font-size: 30px;
        text-align: center;
        margin: 0 0 2% 0;
        color: #333; /* Adicionei uma cor para o título */
    `

const Texto = styled.p`
        font-size: 18px;
        line-height: 1.6; /* Melhorei a legibilidade */
        margin: 2% 0 0 0;
        text-align: center;
        color: #555; /* Adicionei uma cor para o texto */
    `

const Img = styled.img`
        width: 60%;
        max-height: 400px;
        border-radius: 8px; /* Adicionei um leve arredondamento */
        box-shadow: 0 4px 8px rgba(0,0,0,0.1); /* Adicionei uma sombra suave */
        margin-bottom: 2%; /* Adiciona espaço entre a imagem e o texto */
    `

// O componente agora recebe as props: titulo, imagem e texto.
export default function Section({ titulo, imagem, texto }) {

    return (
        <Secao>
            {/* Usa o título recebido via prop */}
            <Titulo>{titulo}</Titulo>

            {/* Mostra a imagem APENAS se uma URL de imagem for recebida */}
            {imagem && <Img src={`http://localhost:8080${imagem}`} alt={titulo} />}
            
            {/* Usa o texto recebido via prop */}
            <Texto>{texto}</Texto>
        </Secao>
    );
}

