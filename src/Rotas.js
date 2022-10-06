import { Route, Routes, BrowserRouter } from "react-router-dom";

import Instrutor from "./components/PgPricipal";

import Teste from "./components/menu/MenuLateral";

import Teste1 from "./components/teste1";



function Rotas(){



    return (



        <Routes>

            <Route path='/' element={<Teste/>}/>

            <Route path='/instrutores' element={<Instrutor/>}/>

            <Route path='/teste' element={<Teste1/>}/>



        </Routes>

    )

}



export default Rotas