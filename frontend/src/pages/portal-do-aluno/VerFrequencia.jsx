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
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
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

const Select = styled.select`
    font-size: 1rem;
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #0D76B8;
    border-radius: 1rem;
    color: #000000;
    background-color: #FFFFFF;
`;

const Input = styled.input`
    font-size: 1rem;
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

    // 🔹 MOCK DE ALUNOS (seriam registros da tabela usuario onde tipo = 2)
    const alunosMock = [
        { id: 10, nome: "Ana Júlia" },
        { id: 11, nome: "Carlos Eduardo" },
        { id: 12, nome: "Fernanda Ribeiro" }
    ];

    // 🔹 MOCK DE FREQUÊNCIA (relacionada ao aluno)
    const frequenciaMock = {
        10: [
            { data: "11/10/2025", presenca: "P", justificativa: "" },
            { data: "18/10/2025", presenca: "F", justificativa: "" }
        ],
        11: [
            { data: "15/10/2025", presenca: "FJ", justificativa: "Consulta médica" }
        ],
        12: [
            { data: "09/10/2025", presenca: "P", justificativa: "" },
            { data: "16/10/2025", presenca: "P", justificativa: "" },
            { data: "23/10/2025", presenca: "F", justificativa: "" }
        ]
    };

    // 🔹 Tipo do usuário (viria do backend)
    const [isProf] = useState(true); // true = professor, pode editar

    // 🔹 Estado do aluno selecionado
    const [alunoId, setAlunoId] = useState(alunosMock[0].id);

    // 🔹 Frequências do aluno selecionado
    const [presencas, setPresencas] = useState(frequenciaMock[alunoId]);

    // 🔹 Edit mode
    const [isEdit, setIsEdit] = useState(false);

    const handleChange = (index, field, value) => {
        const novas = [...presencas];
        novas[index][field] = value;
        setPresencas(novas);
    };

    const handleTrocarAluno = (e) => {
        const novoId = parseInt(e.target.value);
        setAlunoId(novoId);
        setPresencas(frequenciaMock[novoId]);
    };

    function handleSave() {
        alert("Salvaria as frequências editadas no backend aqui.");
        setIsEdit(false);
        navigate("/portal/ver-frequencia");
    }

    return (
        <Div>
            <h1>Visualizar frequência</h1>

            <ManagementDiv>
                <h2>Aluno</h2>
                <Form>
                    <Select value={alunoId} onChange={handleTrocarAluno}>
                        {alunosMock.map(a => (
                            <option key={a.id} value={a.id}>
                                {a.nome}
                            </option>
                        ))}
                    </Select>
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

                    {isProf && (
                        isEdit ? (
                            <Botao text="Salvar" onClick={handleSave} />
                        ) : (
                            <Botao text="Editar" onClick={() => setIsEdit(true)} />
                        )
                    )}
                </ListDiv>
            </ManagementDiv>
        </Div>
    );
}
