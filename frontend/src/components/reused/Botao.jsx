import styled from "styled-components";

const Btn = styled.button`
    width: 35%;
    min-width: 250px;
    min-height: 50px;
    font-size: 16px;
    font-weight: 600;
    border-radius: 30px;
    margin: 5% 0 0 0;
    border: none;
    color: #FFFFFF;
    background-color: #F2B924;

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
`
const DivBotao = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-grow: 1;
  height: 100%;
`;

export default function Botao({ text, onClick, type = "button", ...rest }) {
    return (
        <DivBotao>
            <Btn type={type} onClick={onClick} {...rest}>
                {text}
            </Btn>
        </DivBotao>
    )
}
