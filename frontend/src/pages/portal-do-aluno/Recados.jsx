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

const Textarea = styled.textarea`
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    min-height: 120px;
    resize: vertical;
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

    img {
        width: 100%;
        max-width: 20rem;
        height: auto;
        object-fit: cover;
        border-radius: 1rem;
        margin-top: 1rem;
    }

    h3 {
        margin: 0;
        font-size: 1rem;
        color: #333;
    }

    p {
        white-space: pre-line;
        text-align: justify;
        margin: 0.2rem 0 0;
        font-size: 0.8rem;
        color: #333;
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

export default function Recados() {
    const isProf = true;
    const [isEdit, setIsEdit] = useState(false);

    const initialFormState = {
        id: null,
        texto: "",
        img: ""
    };

    const [editData, setEditData] = useState(initialFormState);

    // Mock dos recados
    const recados = [
        {
            id: 1,
            prof: 10,
            autor: "Prof. João Silva",
            texto: `Pessoal, lembrem-se da entrega do trabalho na próxima semana.
    Podem me enviar dúvidas por e-mail.`,
            data: "2025-09-23 10:30:00",
            img: "https://thumbs.dreamstime.com/b/selo-do-exemplo-28420393.jpg"
        },
        {
            id: 2,
            prof: 10,
            autor: "Prof. João Silva",
            texto: `A prova do módulo 3 será remarcada.
    Avisarei a nova data ainda esta semana.`,
            data: "2025-10-01 14:20:00",
            img: null
        }
    ];

    function formatarData(data) {
        return new Date(data).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
    }

    function handleEdit(recado) {
        setIsEdit(true);
        setEditData({
            id: recado.id,
            texto: recado.texto,
            img: recado.img
        });

        // rola a página até o topo onde fica o formulário
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function handleCancelarEdit() {
        setIsEdit(false);
        setEditData(initialFormState);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <Div>
            <h1>Recados</h1>

            {isProf && (
                <ManagementDiv>
                    <h2>Escrever novo recado</h2>
                    <Form>
                        <Textarea
                            name="texto"
                            placeholder="Texto da Postagem"
                            value={editData.texto}
                            onChange={(e) =>
                                setEditData({ ...editData, texto: e.target.value })
                            }
                        />
                        <InputImg
                            id="recado-upload"
                            type="file"
                            onChange={(e) =>
                                setEditData({ ...editData, img: e.target.files[0] })
                            }
                        />

                        {isEdit && editData.img && typeof editData.img === "string" && (
                            <img
                                src={editData.img}
                                alt="Imagem atual"
                                style={{ width: "200px", borderRadius: "10px", marginTop: "1rem" }}
                            />
                        )}
                        <Botao text={isEdit ? "Salvar alterações" : "Criar"} />
                        {isEdit && (
                            <Botao text="Cancelar" bgColor="#DC3545" onClick={() => handleCancelarEdit()}/>
                        )}
                    </Form>
                </ManagementDiv>
            )}

            <ManagementDiv>
                <h2>Recados</h2>
                    <ListDiv>
                        {recados.map((recado) => (
                            <Card key={recado.id}>
                                <InfoDiv>
                                    <div>
                                        <h3>{recado.autor}</h3>
                                        <p><strong>{formatarData(recado.data)}</strong></p>
                                        <p>{recado.texto}</p>

                                        {recado.img && (
                                            <img
                                                src={recado.img}
                                                alt="Imagem do recado"
                                            />
                                        )}
                                    </div>
                                </InfoDiv>

                                {isProf && (
                                    <ActionsDiv>
                                        <Button onClick={() => handleEdit(recado)}>
                                            Editar
                                        </Button>
                                        <Button danger>
                                            Apagar
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
