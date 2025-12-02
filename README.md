# Portal do Aluno - Cursinho Inserção
## PAC - Projeto de Aprendizagem Colaborativa Extensionista do Curso de Engenharia de Software da Católica de Santa Catarina

**Alunos:** Claudio Anselmo Katzer Junior, Gabriel Henrique Ferreira, Marina Rosa Oliveira, Messias Ferreira Pichau Junior, Nathalia Aline Berri.

**Professores Orientadores:** Luiz Carlos Camargo e Claudinei Dias.

**Instituição Beneficiada:** Movimento Negro Maria Laura - Cursinho Inserção.

O projeto tem por objetivo o desenvolvimento de um sistema de gerenciamento de alunos e um website de apresentação para o “Cursinho Inserção”. Este sistema visa otimizar a gestão dos estudantes matriculados, oferecendo uma interface intuitiva e funcionalidades que auxiliem na organização e desempenho do movimento.

**Funcionalidades:**
* Cadastro de alunos, professores, notas e presenças;
* Cadastro de conteúdos e recados;
* Personalização da página de apresentação do website;
* Geração de relatórios (notas e presenças);
* Segurança e privacidade;
* Responsividade.

O projeto será desenvolvido utilizando React e Java, com arquitetura MVC.

## Padrão de Branches
Para a nomenclatura de branches, decidimos seguir simplesmente com o código das issues criadas no Jira (https://projetos-catolica.atlassian.net/jira/software/projects/CI/boards/3)

Ex:
* CI-17
* CI-55
* Etc.

## Padrão de Mensagem para Commits/Pull-requests
Código da Atividade - Descrição breve das alterações realizadas no commit especifico

Ex:
- CI-32 - Criar tela de visualização de frequência
- CI-34 - Criar tela de lançamento de frequência portal do aluno

## Preparação do Ambiente de Desenvolvimento
* **Requisitos:**
* Node v. 22.14.0
* Java

* **Como rodar o ambiente de desenvolvimento:**
1. Ative o banco de dados MySQL de sua preferência (ex: XAMPP);
2. No terminal, dentro da pasta frontend, execute: npm run dev
3. Execute o arquivo backend/Main.java

## Principais telas
### Gerais
1. Tela Inicial
![Tela Inicial](./prints/home.jpg)

2. Cadastro
![Cadastro](./prints/cadastro.jpg)

3. Login
![Login](./prints/login.jpg)

### Portal do Aluno
1. Visualização de Frequência
![Visualização de Frequência](./prints/visu_freq.jpg)

2. Gestão de Frequência
![Gestão de Frequência](./prints/gestao_freq.jpg)

3. Visualização de Notas por Aluno
![Visualização de Notas por Aluno](./prints/notas_aluno.jpg)

4. Gestão de Notas
![Gestão de Notas](./prints/gestao_aval.jpg)

5. Detalhes de Avaliação
![Detalhes de Avaliação](./prints/detalhes_aval.jpg)

6. Conteúdos
![Conteúdos](./prints/conteudos.jpg)

7. Recados
![Recados](./prints/recados.jpg)

### Administração
1. Gestão de Banners Cadastrados
![Gestão de Banners Cadastrados](./prints/gestao_banners.jpg)

2. Cadastro de Redes Sociais
![Cadastro de Redes Sociais](./prints/redes_sociais.jpg)

3. Cadastro de Relatórios de Universidades
![Cadastro de Relatórios de Universidades](./prints/relatorios.jpg)

4. Novas Candidaturas de Educadores
![Novas Candidaturas de Educadores](./prints/novas_candidaturas_profs.jpg)

5. Novas Matrículas de Alunos
![Novas Matrículas de Alunos](./prints/novas_matriculas.jpg)

6. Educadores Cadastrados
![Educadores Cadastrados](./prints/profs_matric.jpg)

7. Alunos Cadastrados
![Alunos Cadastrados](./prints/alunos_matric.jpg)