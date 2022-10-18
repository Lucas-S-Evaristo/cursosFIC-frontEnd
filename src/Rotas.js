import { Route, Routes, BrowserRouter } from "react-router-dom";

import Instrutor from "./components/instrutor/PgPricipal";

import Teste from "./components/menu/MenuLateral";

import Teste1 from "./components/instrutor/teste1";

import Usuario from "./components/Usuario/CadUsuario"

import Login from "./components/login/login"

import RedefinirSenha from "./components/login/redefinirSenha"



function Rotas(){



    return (



        <Routes>

            <Route path='/' element={<Login/>}/>
             

            <Route path='/Usuario' element={<Usuario/>}/>
            <Route path='/redefinirSenha' element={<RedefinirSenha/>}/>

            <Route path='/instrutores' element={<Instrutor/>}/>


         



        </Routes>

    )

}



export default Rotas