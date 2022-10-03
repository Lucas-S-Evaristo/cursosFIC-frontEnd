import { Route, Routes, BrowserRouter } from "react-router-dom";
import Formulario from "./components/cursos/formulario";
import ListaCursos from "./components/cursos/listaCursos";
import Area from "./components/area/paginaArea";
import CadTurma from "./components/Turma/PageTurma";


function Rotas(){

    return (

        <Routes>
          
            <Route path='/' element={<ListaCursos/>}/>
            <Route path='/listaArea' element={<Area/>}/>
            <Route path='/listaTurma' element={<CadTurma/>}/>


        </Routes>
    )
}

export default Rotas