import { Route, Routes } from "react-router-dom";
import CadUsuario from './components/Usuario/CadUsuario';
import CadTurma from "./components/Turma/PageTurma";
import Login from "./components/login/login";

function Rotas(){

    return (
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/usuarios' element={<CadUsuario/>}/>
            <Route path="/turmas" element={<CadTurma/>}/>
        </Routes>
    )
}

export default Rotas