import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { jwtDecode } from 'jwt-decode';
import styled from 'styled-components';
import Navbar from "../components/reused/Navbar";
import Footer from "../components/reused/Footer";
import Botao from "../components/reused/Botao";

// ========== STYLED COMPONENTS (CSS) ==========

const Container = styled.div`
  font-family: 'Roboto';
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
  padding: 5rem;
`;

const LoginCard = styled.div`
  background-color: #FEF8E9;
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
  color: #E23467;
  margin-bottom: 0.25rem;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.5rem 1rem;
  border: 2px solid #0D76B8;
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

const ErrorMessage = styled.p`
    color: #dc3545;
    margin-top: 1rem;
    text-align: center;
    font-size: 0.9rem;
`;

// ========== COMPONENTE REACT (HTML) ==========

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await api.post('/api/usuarios/login', { email, senha });
            const { token } = response.data;
            localStorage.setItem('user_token', token);

            // --- Decodifica o token ---
            const decodedToken = jwtDecode(token);
            const userType = decodedToken.tipo;

            // --- Pega a url pela qual o usuário está fazendo login ---
            const currentUrl = window.location.pathname;

            // --- Lógica de redirecionamento ---
            if (userType === 1) { 
                // Professor/Admin
                if (currentUrl.includes('/portal')) {
                    navigate('/portal/avaliacoes');
                } else {
                    navigate('/admin/dashboard');
                }
            } 
            else if (userType === 2) { 
                // Aluno só acessa portal
                navigate('/portal/notas');
            } 
            else {
                setError('Tipo de usuário desconhecido.');
            }

        } catch (err) {
            console.error("Erro no login:", err);
            setError(err.response?.data || 'Email ou senha incorretos. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <Container>
            <Navbar />
            <Main>
                <LoginCard>
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
                    <Form onSubmit={handleSubmit}>
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
                        
                        <Botao 
                            type="submit" 
                            text={loading ? 'A entrar...' : 'Logar'} 
                            disabled={loading}
                        />

                        {error && <ErrorMessage>{error}</ErrorMessage>}
                    </Form>
                </LoginCard>
            </Main>
            <Footer/>
        </Container>
    );
};

