import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
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

const Input = styled.input`
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #0D76B8;
    border-radius: 1rem;
    color: #000000;
    background-color: #FFFFFF;
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
    color: ${props => props.secondary ? '#FFFFFF' : (props.danger ? '#FFFFFF' : '#42403dff')};
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

export default function DetalhesAvaliacao() {
    const navigate = useNavigate();

    return (
        <Div>
            <h1>Gestão das Avaliações</h1>

            <ManagementDiv>
                <h2>Criar Nova Avaliação</h2>
                <Form>
                    <Input type="text" name="nome" placeholder="Nome da Avaliação" required/>
                    <Botao text="Criar"/>
                </Form>
            </ManagementDiv>

            <ManagementDiv>
                <h2>Avaliações Cadastradas</h2>
                    <ListDiv>
                        <Card>
                            <InfoDiv>
                                <div>
                                    <h3 id="avalNome">Redação - 23/09/2025</h3>
                                    <p id="avalID">ID: x</p>
                                </div>
                            </InfoDiv>
                            <ActionsDiv>
                                <Button secondary onClick={() => navigate("/portal/avaliacoes/ver")}>
                                    Ver
                                </Button>
                                <Button onClick={() => navigate("/portal/avaliacoes/edit")}>
                                    Editar
                                </Button>
                                <Button danger>Apagar</Button>
                            </ActionsDiv>
                        </Card>
                        <Card>
                            <InfoDiv>
                                <div>
                                    <h3 id="avalNome">Redação - 23/09/2025</h3>
                                    <p id="avalID">ID: x</p>
                                </div>
                            </InfoDiv>
                            <ActionsDiv>
                                <Button secondary onClick={() => navigate("/portal/avaliacoes/ver")}>
                                    Ver
                                </Button>
                                <Button onClick={() => navigate("/portal/avaliacoes/edit")}>
                                    Editar
                                </Button>
                                <Button danger>Apagar</Button>
                            </ActionsDiv>
                        </Card>
                    </ListDiv>
            </ManagementDiv>
        </Div>
        
    );
}
