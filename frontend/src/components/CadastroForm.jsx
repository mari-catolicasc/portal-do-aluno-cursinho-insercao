import { useState } from "react";
import Botao from "./reused/botao";
import styled from 'styled-components';

const Form = styled.form`
    margin: 2.5% 20% 2.5% 20%;
    width: 60%;
    padding: 5%;
    line-height: 40px;
    font-size: 20px;
    border-radius: 30px;
    background-color: #FDF5E0;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Lin = styled.div`
    width: 100%;
    height: 20%;
    margin: 1% 0 1% 0;
    display: flex;
    flex-direction: column;
`

const NomeCampo = styled.p`
    color: #E23467;
    align-self: flex-start;
`

const Campo = styled.input`
    width: 100%;
    padding: 15px;
    border: 3px solid #0DA9B8;
    border-radius: 15px;
    font-size: 18px;
`

const Select = styled.select`
    width: 100%;
    padding: 15px;
    border: 3px solid #0DA9B8;
    border-radius: 15px;
    appearance: none;
    outline: none; 
`
const Botao = styled.button`
    width: 35%;
    min-height: 60px;
    font-size: 20px;
    font-weight: 600;
    border-radius: 30px;
    margin: 5% 0 0 0;
    border: none;
    color: #FFFFFF;
    background-color: #F2B924;
`

export default function CadastroForm() {

    const [tipo, setTipo] = useState("");

    return (
        <Form>
            <Lin>
                <NomeCampo>Nome completo</NomeCampo>
                <Campo id="nome" type="text" placeholder="Digite seu nome e sobrenome"></Campo>
            </Lin>
            <Lin>
                <NomeCampo>E-mail</NomeCampo>
                <Campo id="email" type="email" placeholder="Digite seu e-mail"></Campo>
            </Lin>
            <Lin>
                <NomeCampo>Telefone</NomeCampo>
                <Campo id="tel" type="number" placeholder="Digite seu telefone (apenas números)"></Campo>
            </Lin>
            <Lin>
                <NomeCampo>Senha</NomeCampo>
                <Campo id="senha" type="password" placeholder="Digite sua senha"></Campo>
            </Lin>
            <Lin>
                <NomeCampo>Confirme sua senha</NomeCampo>
                <Campo id="confirmSenha" type="password" placeholder="Digite novamente a sua senha"></Campo>
            </Lin>
            <Lin>
                <NomeCampo>Como deseja se cadastrar?</NomeCampo>
                <Select id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)}>
                    <option value="">Selecione</option>
                    <option value="1">Estudante</option>
                    <option value="2">Educador popular</option>
                </Select>
            </Lin>

            {tipo === "2" && (
                <Lin className="linCampo">
                    <NomeCampo>Qual a sua área do conhecimento?</NomeCampo>
                    <Select id="areaConhecimento">
                        <option>Ciências da Natureza e Suas Tecnologias</option>
                        <option>Ciências Humanas e Suas Tecnologias</option>
                        <option>linCampoguagens e Suas Tecnologias</option>
                        <option>Matemática e Suas Tecnologias</option>
                        <option>Redação</option>
                    </Select>
                </Lin>
            )}
            <Botao text="Cadastrar"/>
        </Form>
    );
}