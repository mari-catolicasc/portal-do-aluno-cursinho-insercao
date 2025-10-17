import React from "react";
import styled from "styled-components";

// --- COMPONENTES ESTILIZADOS (CSS) ---

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh; /* Usar min-height para se adaptar ao conteúdo */
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: #fffbf0; /* Cor de fundo principal */
  display: flex; /* Mantém o alinhamento centralizado fácil */
  justify-content: center; /* Centraliza o conteúdo horizontalmente */
  align-items: flex-start; /* Alinha o conteúdo no topo */
`;

const MainContent = styled.main`
  flex-grow: 1; /* Permite que o conteúdo cresça, mas o max-width o limita */
  padding: 40px;
  max-width: 900px; /* Adicionado para evitar que o formulário fique muito largo */
  width: 100%;
`;

const Breadcrumbs = styled.div`
  font-size: 1.2em;
  color: #007bff;
  margin-bottom: 40px;
  font-weight: 500;
`;

const Form = styled.form`
  width: 100%;
`;

const InputGroup = styled.div`
  margin-bottom: 25px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #5bc0de;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #fff;

  &::placeholder {
    color: #aaa;
  }
`;

const SubmitButton = styled.button`
  background-color: #f0ad4e;
  color: #5a3a00;
  border: none;
  border-radius: 25px;
  padding: 12px 40px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  display: block;
  margin: 40px auto 0 auto;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

// --- COMPONENTE PRINCIPAL (JSX) ---

export default function PostarNovoRecado() {
  return (
    <PageContainer>
      <MainContent>
        <Breadcrumbs>Recados e conteúdos / Postar novo recado</Breadcrumbs>
        <Form>
          <InputGroup>
            <Label htmlFor="nomeConteudo">Nome do conteúdo</Label>
            <Input type="text" id="nomeConteudo" />
          </InputGroup>

          <InputGroup>
            <Label htmlFor="linkDrive">Link da pasta no Drive</Label>
            <Input type="text" id="linkDrive" />
          </InputGroup>

          <SubmitButton type="submit">Postar</SubmitButton>
        </Form>
      </MainContent>
    </PageContainer>
  );
}
