import styled from "styled-components";

const MainContent = styled.main`
  padding: 40px;
`;

const Breadcrumbs = styled.div`
  font-size: 1.1em;
  color: #8892b0;
  margin-bottom: 30px;
  font-weight: 500;
`;

const MessageCard = styled.div`
  background-color: #ffffff;
  border: 2px solid #5bc0de;
  border-radius: 15px;
  padding: 25px;
  max-width: 900px;
  margin: 0 auto;
`;

const MessageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const ProfessorInfo = styled.div`
  display: flex;
  align-items: center;
`;

const ProfessorIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #5bc0de;
  margin-right: 15px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E");
  background-size: 60%;
  background-repeat: no-repeat;
  background-position: center;
`;

const ProfessorName = styled.span`
  font-size: 1.2em;
  font-weight: bold;
  color: #333;
`;

const MessageDate = styled.div`
  font-size: 1em;
  color: #666;
`;

const MessageBody = styled.div`
  color: #333;
  line-height: 1.6;

  p { /* Você pode aninhar seletores como no SASS! 
    margin-bottom: 15px;
  }
`;

import { useState } from "react";
import styled from "styled-components";
import Botao from "./reused/botao";

export default function RGerais() {
  return (
    <main className="main-content">
      <div className="breadcrumbs">Recados e conteúdos / Recados gerais</div>
      <div className="message-card">
        <div className="message-header">
          <div className="professor-info">
            <div className="professor-icon" />
            <span className="professor-name">Prof. Fulano</span>
          </div>
          <div className="message-date">09/08/2025</div>
        </div>
        <div className="message-body">
          <p>
            <strong>Queridos alunos,</strong>
          </p>
          <p>
            xxxxxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxxxxxxx
            xxxxxxxxxxxxxxxxxxxxxxxx xxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
          </p>
        </div>
      </div>
    </main>
  );
}
