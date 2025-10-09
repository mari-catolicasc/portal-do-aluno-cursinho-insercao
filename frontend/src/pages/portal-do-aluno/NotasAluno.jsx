import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
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
`;

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
        font-size: 0.85rem;
        color: #7e7e7e;
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

export default function NotasAluno() {
    const navigate = useNavigate();

    const isProf = true;
    const isEdit = true; // define se está em modo de edição

    // "Mock" de exemplo
    const [nomeAluno, setNomeAluno] = useState("Fulano da Silva");
    const [avaliacoes, setAvaliacoes] = useState([
        { avaliacao: "Redação - 09/10/2025", id: "x", nota: "" },
        { avaliacao: "Simulado - 09/10/2025", id: "y", nota: "" }
    ]);

    const handleNotaChange = (index, value) => {
        const novasAvaliacoes = [...avaliacoes];
        novasAvaliacoes[index].nota = value;
        setAvaliacoes(novasAvaliacoes);
    };

    function handleSave() {
        if (!nomeAluno.trim() || avaliacoes.some(n => n.nota === "")) {
            alert("Preencha todos os campos antes de salvar.");
            return;
        }
        navigate("/portal/avaliacoes");
    }

    return (
        <Div>
            <h1>Notas</h1>

            <ManagementDiv>
                <h2>Aluno selecionado</h2>
                <Form>
                    <Input 
                        type="text"
                        name="nome" 
                        value={nomeAluno} 
                        onChange={(e) => setNomeAluno(e.target.value)}
                        disabled={!isProf} // professor pode mudar, aluno não
                    />
                </Form>
            </ManagementDiv>

            <ManagementDiv>
                <h2>Notas por Avaliação</h2>
                <ListDiv>
                    {avaliacoes.map((a, index) => (
                        <Card key={a.id}>
                            <InfoDiv>
                                <div>
                                    <h3>{a.avaliacao}</h3>
                                    <p>ID: {a.id}</p>
                                </div>
                            </InfoDiv>
                            <div>
                                <Input 
                                    type="number" 
                                    value={a.nota}
                                    onChange={(e) => handleNotaChange(index, e.target.value)}
                                    disabled={!isProf} 
                                />
                            </div>
                        </Card>
                    ))}

                    {isEdit ? (
                        <Botao 
                            text="Salvar" 
                            onClick={handleSave} 
                            disabled={!nomeAluno.trim() || avaliacoes.some(n => n.nota === "")}
                        />
                    ) : (
                        <Botao text="Voltar" onClick={() => navigate("/portal/avaliacoes")} />
                    )}
                </ListDiv>
            </ManagementDiv>
        </Div>
    );
}