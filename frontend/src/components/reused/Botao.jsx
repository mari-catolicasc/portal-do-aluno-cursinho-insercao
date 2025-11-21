import styled from "styled-components";

const Btn = styled.button`
    width: 100%;
    margin-top: 1.5rem;
    min-height: 50px;
    font-size: 16px;
    font-weight: 600;
    border-radius: 10px;
    border: none;
    color: #FFFFFF;

    /* Cor padrão caso não receba prop */
    background-color: ${(props) => props.bgColor || "#F2B924"};

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);

        /* hover baseado na cor recebida */
        background-color: ${(props) =>
            props.bgColor ? darkenColor(props.bgColor, 0.1) : "#eab308"};
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
    }
`;

/* Função simples para escurecer a cor no hover */
function darkenColor(color, amount) {
    try {
        const num = parseInt(color.replace("#", ""), 16);
        let r = (num >> 16) - amount * 255;
        let g = ((num >> 8) & 0x00FF) - amount * 255;
        let b = (num & 0x0000FF) - amount * 255;

        r = Math.max(0, Math.min(255, r));
        g = Math.max(0, Math.min(255, g));
        b = Math.max(0, Math.min(255, b));

        return `rgb(${r}, ${g}, ${b})`;
    } catch {
        return color; // fallback
    }
}

export default function Botao({ text, onClick, type = "button", bgColor, ...rest }) {
    return (
        <Btn type={type} onClick={onClick} bgColor={bgColor} {...rest}>
            {text}
        </Btn>
    );
}