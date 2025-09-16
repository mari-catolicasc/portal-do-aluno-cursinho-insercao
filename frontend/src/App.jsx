import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

import Cadastro from './pages/Cadastro';
import LancarNotas from './pages/portal-do-aluno/LancarNotas';
import VerNotas from './pages/portal-do-aluno/VerNotas';

import RecadosGerais from './pages/portal-do-aluno/RecadosGerais';
import Login from './pages/Login';

export default function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/admin" element={<AdminLogin/>}/>
                <Route path='/admin/register' element={<Cadastro/>}/>
                <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
                <Route path="/portal/notas" element={<VerNotas/>}/>
                <Route path="/portal/notas/novo" element={<LancarNotas/>}/>
                <Route path="/portal/recados" element={<RecadosGerais/>}/>
                <Route path="/frontend/src/pages/Login" element={<Login/>}/>
            </Routes>
        </BrowserRouter>
    );
}