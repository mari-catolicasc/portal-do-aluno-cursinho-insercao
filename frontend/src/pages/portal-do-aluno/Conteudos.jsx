import styled from 'styled-components';
import Botao from '../../components/reused/Botao';
import { useState } from "react";

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
    gap: 2rem;
    justify-content: space-between;
    align-items: center;
`;

const InfoDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;

    h3 {
        margin: 0;
        font-size: 1rem;
        color: #333;
    }

    p {
        margin: 0.2rem 0 0;
        font-size: 0.8rem;
        color: #333;
        word-break: break-all;
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
`;

export default function Conteudos() {

    // --- Mock simples ---
    const mockConteudos = [
        { id: 1, disciplina: "Matemática - Funções", link: "https://drive.google.com/arquivo1" },
        { id: 2, disciplina: "História - Segunda Guerra", link: "https://drive.google.com/arquivo2" },
        { id: 3, disciplina: "Geografia - Climas", link: "https://drive.google.com/arquivo3" }
    ];

    const isProf = true;

    const [conteudos] = useState(mockConteudos);

    const [isEdit, setIsEdit] = useState(false);

    const emptyForm = {
        id: null,
        disciplina: "",
        link: ""
    };

    const [formData, setFormData] = useState(emptyForm);

    function handleEdit(c) {
        setIsEdit(true);
        setFormData(c);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function handleCancelarEdit() {
        setIsEdit(false);
        setFormData(emptyForm);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function handleOpen(link) {
        window.open(link, "_blank");
    }

    return (
        <Div>
            <h1>Conteúdos</h1>

            {isProf && (
                <ManagementDiv>
                    <h2>Adicionar novo conteúdo</h2>
                    <Form>
                        <Input
                            name="disciplina"
                            placeholder="Nome do conteúdo"
                            value={formData.disciplina}
                            onChange={(e) =>
                                setFormData({ ...formData, disciplina: e.target.value })
                            }
                        />

                        <Input
                            name="link"
                            placeholder="Link no Drive"
                            value={formData.link}
                            onChange={(e) =>
                                setFormData({ ...formData, link: e.target.value })
                            }
                        />

                        <Botao text={isEdit ? "Salvar alterações" : "Criar"} />

                        {isEdit && (
                            <Botao
                                text="Cancelar"
                                bgColor="#DC3545"
                                onClick={handleCancelarEdit}
                            />
                        )}
                    </Form>
                </ManagementDiv>
            )}

            <ManagementDiv>
                <h2>Conteúdos</h2>
                <ListDiv>
                    {conteudos.map((c) => (
                        <Card key={c.id}>
                            <InfoDiv>
                                <h3>{c.disciplina}</h3>
                                <p>{c.link}</p>
                            </InfoDiv>

                            {isProf ? (
                                <ActionsDiv>
                                    <Button secondary onClick={() => handleOpen(c.link)}>Ver</Button>
                                    <Button onClick={() => handleEdit(c)}>Editar</Button>
                                    <Button danger>Apagar</Button>
                                </ActionsDiv>
                            ) : (
                                <ActionsDiv>
                                    <Button secondary onClick={() => handleOpen(c.link)}>
                                        Ver
                                    </Button>
                                </ActionsDiv>
                            )}
                        </Card>
                    ))}
                </ListDiv>
            </ManagementDiv>
        </Div>
    );
}