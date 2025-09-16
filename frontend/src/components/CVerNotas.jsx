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

const Txt = styled.p`
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

const Nota = styled.p`
    width: 5%;
    font-size: 16px;
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

export default function CVerNotas() {
    // Simulando role de usuário. Precisa ser adaptado quando fizer integração front-back
    const role = "professor"; 
    // const role = "aluno";

  return (
    <Div>
        <TituloPag>Notas / Ver Notas</TituloPag>
        <Form>
            <SelectAvalDiv>
                <TituloAval>Avaliação</TituloAval>
                {role === "professor" && (
                    <Select>
                        <option>Redação - 09/08/2025</option>
                        <option>Simulado - 10/09/2025</option>
                    </Select>
                )}
                {role === "aluno" && (
                    <Select disabled>
                        <option>Todas</option>
                    </Select>
                )}
            </SelectAvalDiv>
            {role === "professor" && ( // Professor vê lista de alunos com notas
                <AlunosDiv>
                    <Lin>
                        <Txt id="nome">Fulano da Silva</Txt>
                        <Nota id="nota">10</Nota>
                    </Lin>
                    <Lin>
                        <Txt id="nome">Fulano da Silva</Txt>
                        <Nota id="nota">8</Nota>
                    </Lin>
                </AlunosDiv>
            )}
            {role === "aluno" && ( // Aluno vê só a própria nota
                <AlunosDiv>
                    <Lin>
                        <Txt id="avaliacao">Redação - 09/08/2025</Txt>
                        <Nota id="nota">10</Nota>
                    </Lin>
                    <Lin>
                        <Txt id="avaliacao">Simulado - 10/09/2025</Txt>
                        <Nota id="nota">8</Nota>
                    </Lin>
                </AlunosDiv>
                        )}
        </Form>
    </Div>
  )
}