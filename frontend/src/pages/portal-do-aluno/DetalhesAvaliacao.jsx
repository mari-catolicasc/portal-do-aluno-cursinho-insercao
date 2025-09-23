import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from "react";
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
    font-size: 1rem;
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #0D76B8;
    border-radius: 1rem;
    color: #000000;
    background-color: #FFFFFF;

    &:disabled {
        font-size: 0.75rem;
        color: #7e7e7eff;
    }
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

export default function DetalhesAvaliacao() {
    const location = useLocation();
    const navigate = useNavigate();

    // Detecta se está no modo edição
    const isEdit = location.pathname.includes("/edit");

    // "Mock" de exemplo
    const [nomeAvaliacao, setNomeAvaliacao] = useState("Redação - 23/09/2025");
    const [notas, setNotas] = useState([
        { aluno: "Fulano", id: "x", nota: "" },
        { aluno: "Ciclano", id: "y", nota: "" }
    ]);

    const handleNotaChange = (index, value) => {
        const novasNotas = [...notas];
        novasNotas[index].nota = value;
        setNotas(novasNotas);
    };

    function handleSave() {
        if (!nomeAvaliacao.trim() || notas.some(n => n.nota === "")) {
            alert("Preencha todos os campos antes de salvar.");
            return;
        }
        navigate("/portal/avaliacoes");
    }

    return (
        <Div>
            <h1>Gestão das Avaliações</h1>

            <ManagementDiv>
                <h2>Avaliação selecionada</h2>
                <Form>
                    <Input 
                        type="text"
                        name="nome" 
                        value={nomeAvaliacao} 
                        onChange={(e) => setNomeAvaliacao(e.target.value)}
                        disabled={!isEdit} 
                    />
                </Form>
            </ManagementDiv>

            <ManagementDiv>
                <h2>Notas por Aluno</h2>
                <ListDiv>
                    {notas.map((n, index) => (
                        <Card key={n.id}>
                            <InfoDiv>
                                <div>
                                    <h3>{n.aluno}</h3>
                                    <p>ID: {n.id}</p>
                                </div>
                            </InfoDiv>
                            <div>
                                <Input 
                                    type="number" 
                                    value={n.nota}
                                    onChange={(e) => handleNotaChange(index, e.target.value)}
                                    disabled={!isEdit} 
                                />
                            </div>
                        </Card>
                    ))}

                    {isEdit ? (
                        <Botao 
                            text="Salvar" 
                            onClick={handleSave} 
                            disabled={!nomeAvaliacao.trim() || notas.some(n => n.nota === "")}
                        />
                    ) : (
                        <Botao text="Voltar" onClick={() => navigate("/portal/avaliacoes")} />
                    )}
                </ListDiv>
            </ManagementDiv>
        </Div>
    );
}
