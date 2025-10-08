import styled from "styled-components";

const Btn = styled.button`
    width: 100%; /* Ocupa a largura do formulário */
    margin-top: 1.5rem; /* Espaçamento ajustado */
    min-height: 50px;
    font-size: 16px;
    font-weight: 600;
    border-radius: 10px; /* Borda um pouco mais suave */
    border: none;
    color: #FFFFFF;
    background-color: #F2B924;

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
`

export default function Botao({ text, onClick, type = "button", ...rest }) {
    return (
        <Btn type={type} onClick={onClick} {...rest}>
            {text}
        </Btn>
    )
}
