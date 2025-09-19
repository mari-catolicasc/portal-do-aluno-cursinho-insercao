import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// --- Páginas Padrão ---
import Home from './pages/Home';
import Cadastro from './pages/Cadastro';


// --- Páginas de Administração ---
import AdminLogin from './pages/AdminLogin';
import GerirBanners from './pages/admin/GerirBanners';
import GerirSecoes from './pages/admin/GerirSecoes';
import NovasCandidaturas from './pages/admin/NovasCandidaturas';
import EducadoresCadastrados from './pages/admin/EducadoresCadastrados';

// --- Páginas do Portal do Aluno ---
import LancarNotas from './pages/portal-do-aluno/LancarNotas';
import VerNotas from './pages/portal-do-aluno/VerNotas';
import CriarAvaliacao from './pages/portal-do-aluno/CriarAvaliacao';

import AdminLayout from './layouts/AdminLayout';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />

                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/admin/register" element={<Cadastro />} />

                <Route path="/admin" element={<AdminLogin />} />

                {/* ========== ROTAS DE ADMINISTRAÇÃO ========== */}
                <Route element={<AdminLayout />}>
                    <Route path="/admin/dashboard" element={<Navigate to="/admin/secoes" replace />} />
                    <Route path="/admin/secoes" element={<GerirSecoes />} />
                    <Route path="/admin/banners" element={<GerirBanners />} />

                    <Route path="/admin/educadores/candidaturas" element={<NovasCandidaturas />} />
                    <Route path="/admin/educadores/cadastrados" element={<EducadoresCadastrados />} />
                </Route>


                {/* ========== ROTAS DO ALUNO/PROFESSOR ========== */}
                <Route path="/portal/notas" element={<VerNotas />} />
                <Route path="/portal/notas/novo" element={<LancarNotas />} />
                <Route path="/portal/avaliacoes/novo" element={<CriarAvaliacao />} />

            </Routes>
        </BrowserRouter>
    );
}

