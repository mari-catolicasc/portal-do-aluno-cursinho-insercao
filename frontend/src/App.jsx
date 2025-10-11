import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// --- Páginas ---
import Home from './pages/Home';
import Cadastro from './pages/Cadastro';
import AdminLogin from './pages/AdminLogin';

// --- Páginas de Administração ---
import GerirBanners from './pages/admin/GerirBanners';
import GerirSecoes from './pages/admin/GerirSecoes';
import GerirRedes from './pages/admin/GerirRedes';
import GerirRelatorioUnis from './pages/admin/GerirRelatorioUnis';
import NovasCandidaturas from './pages/admin/NovasCandidaturas';
import EducadoresCadastrados from './pages/admin/EducadoresCadastrados';

// --- Páginas do Portal do Aluno ---
import DetalhesAvaliacao from './pages/portal-do-aluno/DetalhesAvaliacao';
import GerirAvaliacoes from './pages/portal-do-aluno/GerirAvaliacoes';

// --- Layouts e Componentes de Segurança ---
import AdminLayout from './layouts/AdminLayout';
import PortalLayout from './layouts/PortalLayout';
import ProtectedRoute from './components/ProtectedRoute';
import LancarFrequencia from './pages/portal-do-aluno/LancarFrequencia';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* ========== ROTAS PÚBLICAS ========== */}
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/home" element={<Home />} />
                <Route path="/admin/register" element={<Cadastro />} />
                <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
                <Route path="/admin/login" element={<AdminLogin />} />

                {/* ========== ROTAS PROTEGIDAS DO PAINEL DE ADMINISTRAÇÃO ========== */}
                <Route element={<ProtectedRoute allowedRoles={[1]} />}>
                    <Route element={<AdminLayout />}>
                        <Route path="/admin/dashboard" element={<Navigate to="/admin/secoes" replace />} />
                        <Route path="/admin/secoes" element={<GerirSecoes />} />
                        <Route path="/admin/banners" element={<GerirBanners />} />
                        <Route path="/admin/redes" element={<GerirRedes />} />
                        <Route path="/admin/relatorio-universidades" element={<GerirRelatorioUnis />} />
                        <Route path="/admin/educadores/candidaturas" element={<NovasCandidaturas />} />
                        <Route path="/admin/educadores/cadastrados" element={<EducadoresCadastrados />} />
                    </Route>
                </Route>

                {/* ========== ROTAS PROTEGIDAS DO PORTAL DO ALUNO/PROFESSOR ========== */}
                <Route element={<ProtectedRoute allowedRoles={[1, 2]} />}>
                    <Route element={<PortalLayout/>}>
                        <Route path="/portal/avaliacoes" element={<GerirAvaliacoes />} />
                        <Route path="/portal/avaliacoes/edit" element={<DetalhesAvaliacao />} />
                        <Route path="/portal/avaliacoes/ver" element={<DetalhesAvaliacao />} />
                        <Route path="/portal/lancar-frequencia" element={<LancarFrequencia/>}/>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

