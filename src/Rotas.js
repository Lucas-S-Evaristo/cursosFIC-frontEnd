import { Route, Routes } from "react-router-dom";
import CadUsuario from './components/Usuario/CadUsuario';
import CadTurma from './componentes/PageTurma';

function Rotas(){

    return (
        <Routes>
            <Route path='/' element={<CadUsuario/>}/>
            <Route path='/cadTurma' element={<CadTurma/>}/>
        </Routes>
    )
}

export default Rotas