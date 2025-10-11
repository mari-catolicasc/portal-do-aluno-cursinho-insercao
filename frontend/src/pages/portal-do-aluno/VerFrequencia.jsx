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
    gap: 1rem;
`;

const InfoDiv = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;

    h3 {
        margin: 0;
        font-size: 1rem;
        color: #333;
    }
`;

export default function VerFrequencia() {
    const navigate = useNavigate();

    // Estado de edição
    const [isEdit, setIsEdit] = useState(false);
    const [isProf] = useState(false); // Deve validar de acordo com o tipo de usuário vindo do back

    const [nomeAluno, setNomeAluno] = useState("Fulano");

    // Mock de exemplo
    const [presencas, setPresencas] = useState([
        { data: "11/10/2025", presenca: "P", justificativa: "" },
        { data: "18/10/2025", presenca: "F", justificativa: "" },
        { data: "25/10/2025", presenca: "FJ", justificativa: "Aluno doente" },
    ]);

    const handleChange = (index, field, value) => {
        const novasPresencas = [...presencas];
        novasPresencas[index][field] = value;
        setPresencas(novasPresencas);
    };

    function handleSave() {
        if (presencas.some(p => p.presenca.trim() === "")) {
            alert("Preencha todos os campos antes de salvar.");
            return;
        }
        setIsEdit(false);
        navigate("/portal/ver-frequencia");
    }

    return (
        <Div>
            <h1>Visualizar frequência</h1>

            <ManagementDiv>
                <h2>Aluno</h2>
                <Form>
                    <Input 
                        type="text"
                        value={nomeAluno}
                        onChange={(e) => setNomeAluno(e.target.value)}
                        disabled={false}
                    />
                </Form>
            </ManagementDiv>

            <ManagementDiv>
                <h2>Presença por Data</h2>
                <ListDiv>
                    {presencas.map((p, index) => (
                        <Card key={index}>
                            <InfoDiv>
                                <h3>{p.data}</h3>
                            </InfoDiv>
                            <div style={{ display: "flex", flexDirection: "row", gap: "0.5rem", width: "50%" }}>
                                <Input 
                                    type="text" 
                                    value={p.presenca}
                                    onChange={(e) => handleChange(index, "presenca", e.target.value)}
                                    disabled={!isEdit} 
                                />
                                <Input 
                                    type="text"
                                    value={p.justificativa}
                                    onChange={(e) => handleChange(index, "justificativa", e.target.value)}
                                    disabled={!isEdit}
                                />
                            </div>
                        </Card>
                    ))}

                    {/* Exibe botões somente se for professor */}
                    {isProf && (
                        isEdit ? (
                            <Botao 
                                text="Salvar" 
                                onClick={handleSave} 
                                disabled={presencas.some(p => p.presenca === "")}
                            />
                        ) : (
                            <Botao text="Editar" onClick={() => setIsEdit(true)} />
                        )
                    )}
                </ListDiv>
            </ManagementDiv>
        </Div>
    );
}