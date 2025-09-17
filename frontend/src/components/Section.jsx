import styled from 'styled-components';

const Secao = styled.div`
        width: 70%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 2% 15% 2% 15%;
    `
const Titulo = styled.h3`
        font-size: 30px;
        text-align: center;
        margin: 0 0 2% 0;
        color: #333; 
    `

const Texto = styled.p`
        font-size: 18px;
        line-height: 1.6;
        margin: 2% 0 0 0;
        text-align: center;
        color: #555;
    `

const Img = styled.img`
        width: 60%;
        max-height: 400px;
        border-radius: 8px; 
        box-shadow: 0 4px 8px rgba(0,0,0,0.1); 
        margin-bottom: 2%; 
    `

export default function Section({ titulo, imagem, texto }) {

    return (
        <Secao>
            <Titulo>{titulo}</Titulo>
            {imagem && <Img src={`http://localhost:8080${imagem}`} alt={titulo} />}
            <Texto>{texto}</Texto>
        </Secao>
    );
}

