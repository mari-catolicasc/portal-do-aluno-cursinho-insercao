import styled from 'styled-components';
import Botao from '../../components/reused/Botao';

// --- Estilização ---
const Div = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    align-content: center;
    padding: 1rem;
    height: 100%;
    gap: 10px;

    h1 {
        margin-top: 0;
        margin-bottom: 1rem;
        font-size: 1.4rem;
        color: #0D76B8;
    }
`

const ManagementDiv = styled.section`
    background-color: #FEF8E9;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    margin-bottom: 2rem;

    h2 {
        margin-top: 0;
        margin-bottom: 1rem;
        font-size: 1rem;
        color: #0D76B8;
    }
`;

const Form = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2rem 0;
    width: 100%;
    height: 100%;
    flex-grow: 1;
    border-radius: 1rem;
    gap: 1rem;
    align-items: center;
`;

const Label = styled.p`
    font-size: 0.95rem;
    font-weight: 600;
    color: #E23467;
    align-self: flex-start;
`

const Input = styled.input`
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #0D76B8;
    border-radius: 1rem;
    color: #000000;
    background-color: #FFFFFF;
`;

const InputImg = styled.input`
    width: 100%;
    padding: 0.75rem;
    color: #000000;

    &::file-selector-button {
    width: 100%;
    background-color: #0D76B8;
    color: #fff;
    font-weight: 500;
    padding: 1rem 2rem;
    border: none;
    border-radius: 1rem;
    margin-right: 1rem;
    cursor: pointer;
    transition: all 0.2s;
  }

    &::file-selector-button:hover {
      background-color: #095a8f;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
  }
`;

const Textarea = styled.textarea`
    width: 100%;
    padding: 0.8rem;
    padding: 0.75rem;
    border: 2px solid #0D76B8;
    border-radius: 1rem;
    min-height: 3rem;
    resize: vertical;
`;

const ListDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: fit-content;
    gap: 2rem;
`;

const Card = styled.div`
    background-color: #FFFFFF;
    border: 1px solid #0D76B8;
    border-radius: 8px;
    padding: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const InfoDiv = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;

    img {
        width: 5rem;
        height: 5rem;
        object-fit: cover;
        border-radius: 1rem;
    }

    h3 {
        margin: 0;
        font-size: 1rem;
        color: #333;
    }

    p {
        margin: 0.2rem 0 0;
        font-size: 0.8rem;
        color: #888;
    }
`;

const ActionsDiv = styled.div`
    display: flex;
    gap: 1rem;
`;

const Button = styled.button`
    padding: 0.7rem 1.5rem;
    border: none;
    font-weight: 600;
    background-color: ${props => props.secondary ? '#6c757d' : (props.danger ? '#dc3545' : '#f2b924')};
    color: #FFFFFF;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.2s;

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
`;

export default function GerirRelatorioUnis() {
    return (
        <Div>
            <h1>Gestão do Relatório de Universidades da Região</h1>

            <ManagementDiv>
                <h2>Cadastrar ou Alterar Relatório</h2>
                <Form>
                    <Label htmlFor="rede-upload">Arquivo (.PDF ou .xls)</Label>
                    <InputImg id="rede-upload" type="file" required>
                    </InputImg>
                    <Botao text="Salvar"/>
                </Form>
            </ManagementDiv>

            <ManagementDiv>
                <h2>Redes Cadastradas</h2>
                    <ListDiv>
                        <Card>
                            <InfoDiv>
                                <div>
                                    <h3 id="redeNome">Nome do Arquivo</h3>
                                </div>
                            </InfoDiv>
                            <ActionsDiv>
                                <Button>Baixar</Button>
                            </ActionsDiv>
                        </Card>
                    </ListDiv>
            </ManagementDiv>
        </Div>
        
    );
}