import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Pages
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import Cadastro from './pages/Cadastro';
import RecadosGerais from './pages/portal-do-aluno/RecadosGerais';
import Login from './pages/Login';

// Importa as novas páginas de gestão
import GerirBanners from './pages/admin/GerirBanners';
import GerirSecoes from './pages/admin/GerirSecoes';

// Layouts
import AdminLayout from './layouts/AdminLayout';

export default function App(){
    return(
        <BrowserRouter>
            <Routes>
<<<<<<< HEAD
                {/* --- Rotas Públicas --- */}
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/register" element={<Cadastro />} />

                {/* --- Rotas da Área de Administração com Layout --- */}
                <Route element={<AdminLayout />}>
                    
                    {/* Rota principal do dashboard redireciona para a gestão de seções */}
                    <Route path="/admin/dashboard" element={<Navigate to="/admin/secoes" replace />} />
                    
                    {/* Rotas específicas para cada funcionalidade */}
                    <Route path="/admin/secoes" element={<GerirSecoes />} />
                    <Route path="/admin/banners" element={<GerirBanners />} />
                    
                    {/*Aqui ficará o restante das páginas admin que falta*/}
                </Route>
=======
                <Route path="/" element={<Home/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/admin" element={<AdminLogin/>}/>
                <Route path='/admin/register' element={<Cadastro/>}/>
                <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
                <Route path="/portal/recados" element={<RecadosGerais/>}/>
                <Route path="/frontend/src/pages/Login" element={<Login/>}/>

>>>>>>> main
            </Routes>
        </BrowserRouter>
    );
}



