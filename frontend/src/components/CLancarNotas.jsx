import styled from 'styled-components';

const Div = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    align-content: center;
    padding: 2.5%;
    height: 100%;
    gap: 10px;
`

const TituloPag = styled.h3`
    font-size: 18px;
    font-weight: 600;
    color: #0D76B8;

    @media (max-width: 1500px) {
        font-size: 16px;
    }

    @media (max-width: 1000px) {
        font-size: 14px;
    }

    @media (max-width: 500px) {
        font-size: 12px;
    }
`

const Form = styled.form`
    background-color: #FEF8E9;
    display: flex;
    flex-direction: column;
    padding: 2.5%;
    width: 100%;
    height: 100%;
    flex-grow: 1;
    border-radius: 5px;
    gap: 2.5%;
`

const SelectAvalDiv = styled.div`
    display: flex;
    width: 100%;
    gap: 15px;
    align-items: center;
`

const TituloAval = styled.p`
    font-size: 18px;
    font-weight: 500;
    color: #0D76B8;

    @media (max-width: 1500px) {
        font-size: 16px;
    }

    @media (max-width: 1000px) {
        font-size: 14px;
    }

    @media (max-width: 500px) {
        font-size: 12px;
    }
`

const Select = styled.select`
    border: 3px solid #0D76B8;
    border-radius: 10px;
    padding: 5px;
    width: 25%;
`

const AlunosDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: fit-content;
    gap: 20px;
`

const Lin = styled.div`
    background-color: #FDF2D5;
    display: flex;
    align-items: center;
    gap: 2%;
    padding: 1%;
    border-radius: 20px;
`

const Nome = styled.p`
    font-size: 16px;
    font-weight: 400;
    color: #000000;

    @media (max-width: 1500px) {
        font-size: 14px;
    }

    @media (max-width: 1000px) {
        font-size: 13px;
    }

    @media (max-width: 500px) {
        font-size: 12px;
    }
`

const Input = styled.input`
    width: 5%;
    padding: 0.5% 0 0.5% 3%;
    border: none;
    border-radius: 5px;
    color: #000000;
    background-color: #FFFFFF;
`

export default function CLancarNotas() {
  return (
    <Div>
        <TituloPag>Notas / Lançar Notas</TituloPag>
        <Form>
            <SelectAvalDiv>
                <TituloAval>Avaliação</TituloAval>
                <Select>
                    <option>Redação - 09/08/2025</option>
                </Select>
            </SelectAvalDiv>
            <AlunosDiv>
                <Lin>
                    <Nome id="nome">Fulano da Silva</Nome>
                    <Input type="number" id="nota" min="0" max="10" step="0.1"/>
                </Lin>
                <Lin>
                    <Nome id="nome">Fulano da Silva</Nome>
                    <Input type="number" id="nota" min="0" max="10" step="0.1"/>
                </Lin>
            </AlunosDiv>
        </Form>
    </Div>
  )
}