import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Cadastro from './pages/Cadastro';
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
                <Route path="/portal/recados" element={<RecadosGerais/>}/>
                <Route path="/frontend/src/pages/Login" element={<Login/>}/>

            </Routes>
        </BrowserRouter>
    );
}