import { Route, Routes } from "react-router-dom";
import CadUsuario from './components/Usuario/CadUsuario';

function Rotas(){

    return (
        <Routes>
            <Route path='/' element={<CadUsuario/>}/>
        </Routes>
    )
}

export default Rotas