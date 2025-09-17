import { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Para redirecionar o usuário
import { api } from '../services/api'; // Para chamar o nosso backend
import styled from 'styled-components';
import Navbar from "../components/Navbar";

// ========== STYLED COMPONENTS (CSS) ==========

const Container = styled.div`
  font-family: 'Inter', sans-serif;
  background-color: #FDF9ED;
  color: #E0A76363;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const LoginCard = styled.div`
  background-color: #F2B92424;
  padding: 2.5rem;
  border-radius: 1.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 24rem;
  width: 100%;
`;

const UserIcon = styled.div`
  width: 6rem;
  height: 6rem;
  border-radius: 9999px;
  background-color: #189aa9;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  
  svg {
    color: #00606d;
    width: 4rem;
    height: 4rem;
  }
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
  margin-bottom: 0.25rem;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  outline: none;
  transition: all 0.3s ease;
  font-size: 1rem;
  color: #111827;
  
  &:focus {
    border-color: #f59e0b;
    box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.5);
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  margin-top: 2rem;
  padding: 0.75rem 1.5rem;
  background-color: #F2B924;
  color: #ffffff;
  font-weight: 700;
  font-size: 1.125rem;
  border: none;
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background-color: #eab308; /* Um pouco mais escuro no hover */
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.98);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(242, 185, 36, 0.5);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
    color: #dc3545;
    margin-top: 1rem;
    text-align: center;
    font-size: 0.9rem;
`;

// ========== COMPONENTE REACT (HTML) ==========

export default function AdminLogin() {
    // Estados para controlar os inputs
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    // Novos estados para feedback do usuário
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Hook do React Router para nos permitir navegar entre páginas
    const navigate = useNavigate();

    // Função para lidar com o submit do formulário
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Limpa erros anteriores
        setLoading(true); // Inicia o feedback de carregamento

        try {
            // 1. Chama o nosso endpoint da API
            const response = await api.post('/api/usuarios/login', { email, senha });

            // 2. Extrai o token da resposta
            const { token } = response.data;

            // 3. Guarda o token no localStorage do navegador.
            //    Isto é crucial para que os próximos pedidos à API sejam autenticados.
            localStorage.setItem('user_token', token);

            // 4. Redireciona o usuário para o painel de administração
            navigate('/admin/dashboard');

        } catch (err) {
            // 5. Se o login falhar, mostra uma mensagem de erro
            console.error("Erro no login:", err);
            setError('Email ou senha incorretos. Tente novamente.');
        } finally {
            setLoading(false); // Para o feedback de carregamento, quer tenha sucesso ou falhe
        }
    };

    return (
        <Container>
            <Navbar />
            {/* Seção Principal com o Card de Login */}
            <Main>
                <LoginCard>
                    {/* Ícone do usuário */}
                    <UserIcon>
                        <svg
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </UserIcon>

                    {/* Formulário */}
                    <Form onSubmit={handleSubmit}>
                        {/* Campo de E-mail */}
                        <InputContainer>
                            <Label htmlFor="email">
                                E-mail
                            </Label>
                            <FormInput
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Digite seu e-mail"
                                required
                            />
                        </InputContainer>

                        {/* Campo de Senha */}
                        <InputContainer>
                            <Label htmlFor="senha">
                                Senha
                            </Label>
                            <FormInput
                                type="password"
                                id="senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                placeholder="Digite sua senha"
                                required
                            />
                        </InputContainer>

                        <LoginButton type="submit" disabled={loading}>
                            {loading ? 'A entrar...' : 'Logar'}
                        </LoginButton>

                        {error && <ErrorMessage>{error}</ErrorMessage>}
                    </Form>
                </LoginCard>
            </Main>
        </Container>
    );
};
