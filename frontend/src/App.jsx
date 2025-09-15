import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import Cadastro from './pages/Cadastro';
import LancarNotas from './pages/portal-do-aluno/LancarNotas';
import VerNotas from './pages/portal-do-aluno/VerNotas';
import CriarAvaliacao from './pages/portal-do-aluno/CriarAvaliacao';

export default function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path='/cadastro' element={<Cadastro/>}/>
                <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
                <Route path="/portal/notas" element={<VerNotas/>}/>
                <Route path="/portal/notas/novo" element={<LancarNotas/>}/>
                <Route path="/portal/avaliacoes/novo" element={<CriarAvaliacao/>}/>
            </Routes>
        </BrowserRouter>
    );
}