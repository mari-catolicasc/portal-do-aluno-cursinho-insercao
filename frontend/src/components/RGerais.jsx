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
