import { Route, Routes } from "react-router-dom";
import ListaUsuario from './components/Usuario/ListaUsuario';
import FormUsuario from './components/Usuario/FormUsuario';

function Rotas(){

    return (
        <Routes>
            <Route path='/' element={<FormUsuario/>}/>
            <Route path='/listaUsuario' element={<ListaUsuario/>}/>
        </Routes>
    )
}

export default Rotas