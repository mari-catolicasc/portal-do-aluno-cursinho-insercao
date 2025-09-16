import styled from "styled-components";

const Btn = styled.button`
    width: 35%;
    min-width: 250px;
    min-height: 60px;
    font-size: 20px;
    font-weight: 600;
    border-radius: 30px;
    margin: 5% 0 0 0;
    border: none;
    color: #FFFFFF;
    background-color: #F2B924;
`
const DivBotao = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex-grow: 1;
  height: 100%;
`;

export default function Botao({ text }) {
    return (
        <DivBotao>
            <Btn type="submit">{text}</Btn>
        </DivBotao>
    )
}