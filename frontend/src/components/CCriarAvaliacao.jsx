import styled from 'styled-components';
import Botao from './reused/botao';

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
    align-items: center;
`

const Lin = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 25%;
    align-items: flex-start;
    gap: 15%;
    padding: 1%;
    border-radius: 20px;
`

const Label = styled.label`
    width: 20%;
    font-size: 14px;
    font-weight: 600;
    color: #0D76B8;
`

const Input = styled.input`
    width: 100%;
    padding: 1% 0 1% 1.5%;
    border: 3px solid #0D76B8;
    border-radius: 20px;
    color: #000000;
    background-color: #FFFFFF;
`

export default function CCriarAvaliacao () {
  return (
    <Div>
        <TituloPag>Notas / Criar nova avaliação</TituloPag>
        <Form>
            <Lin>
                <Label htmlFor="nomeAval">Nome da avaliação:</Label>
                <Input
                    id="nomeAval"
                    placeholder="Digite aqui o nome da avaliação que deseja criar"
                />
            </Lin>
            <Botao text="Criar Avaliação"/>
        </Form>
    </Div>
  )
}