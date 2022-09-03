import { Route, Routes, BrowserRouter } from "react-router-dom";
import Formulario from "./components/cursos/formulario";
import ListaCursos from "./components/cursos/listaCursos";

function Rotas(){

    return (

        <Routes>
            <Route path='/' element={<Formulario/>}/>
            <Route path='/listaCurso' element={<ListaCursos/>}/>

        </Routes>
    )
}

export default Rotas