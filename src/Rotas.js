import {
  Route,
  Routes,
  BrowserRouter,
  Switch,
  Redirect,
  Navigate,
} from "react-router-dom";
import react, { useEffect, useState } from "react";

import Instrutor from "./components/instrutor/PgPricipal";

import Teste from "./components/menu/MenuLateral";

import Teste1 from "./components/instrutor/teste1";

import Usuario from "./components/Usuario/CadUsuario";

import Login from "./components/login/login";

import RedefinirSenha from "./components/login/redefinirSenha";

import Area from "./components/area/paginaArea"

import CadTurma from "./components/Turma/PageTurma"

import MenuLateral from "./components/menu/MenuLateral"

import Tarefas from "./components/Turma/tarefas"

import PgHorario from "./components/horario/PgHorario";

import ListaArea from "./components/area/paginaArea";

import ListaCursos from "./components/curso/PageCurso";
import Folder from "./components/folders/Folder";
import Senha from "./components/login/redefinirSenha";
import Home from "./components/home/home";
import PaginaLog from "./components/log/paginaLog";

import LogArea from "./components/log/logArea/logArea";
import LogCurso from "./components/log/logCurso/LogCurso";

import LogHorario from "./components/log/logHorario/LogHorario";

import LogInstrutor from "./components/log/logInstrutor/LogInstrutor";

import LogTurma from "./components/log/logTurma/LogTurma";

import LogUsuario from "./components/log/logUsuario/LogUsuario";
function Rotas() {

  useEffect(() => {
    const token = sessionStorage.getItem('token');


  }, []);


  const token = sessionStorage.getItem("token");
 





  
    function PrivadaRotasInstrutores() {

      let p = sessionStorage.getItem("payload");
      p = JSON.parse(p);
      
        if(token != null){

          if (p.tipo_usuario === "Master" || p.tipo_usuario === "Opp" ) {

    
            return <Instrutor />
          } else {
    
            return <Navigate to="/login" />
          }

        }else{

          return <Navigate to="/login" />
        }
    }

    function PrivadaRotasUsuarios() {
      
      let p = sessionStorage.getItem("payload");
      p = JSON.parse(p);
      
        if(token != null){

          if ( p.tipo_usuario === "Master") {
          
            return <Usuario/>
          } else {
    
            return <Navigate to="/login" />
          }

        }else{

          return <Navigate to="/login" />
        }
    }
    
    function PrivadaRotasHorario() {
      
      let p = sessionStorage.getItem("payload");
      p = JSON.parse(p);
      
        if(token != null){

          if ( p.tipo_usuario === "Master" || p.tipo_usuario === "Opp") {
          
            return <PgHorario/>
          } else {
    
            return <Navigate to="/login" />
          }

        }else{

          return <Navigate to="/login" />
        }
    }

    function PrivadaRotasArea() {
      
      let p = sessionStorage.getItem("payload");
      p = JSON.parse(p);
      
        if(token != null){

          if ( p.tipo_usuario === "Master" || p.tipo_usuario === "Opp") {
          
            return <Area/>
          } else {
    
            return <Navigate to="/login" />
          }

        }else{

          return <Navigate to="/login" />
        }
    }

    function PrivadaRotasTurma() {
      
      let p = sessionStorage.getItem("payload");
      p = JSON.parse(p);
      
        if(token != null){

          if ( p.tipo_usuario === "Master" || p.tipo_usuario === "Opp") {
          
            return <CadTurma/>
          } else {
    
            return <Navigate to="/login" />
          }

        }else{

          return <Navigate to="/login" />
        }
    }

    return (
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/listaUsuario" element={

        <PrivadaRotasUsuarios>

            <Usuario/>

          </PrivadaRotasUsuarios>
          } />


        <Route path="/redefinirSenha" element={<Senha />} />

        <Route path="/listaInstrutores" element={

          <PrivadaRotasInstrutores>

            <Instrutor />

          </PrivadaRotasInstrutores>} />

     
        <Route path='/' element={

        <CadTurma/>

       
        }/>

        <Route path='/tarefa' element={
          <Tarefas/>
      
      }/>

        <Route path='/listaHorario' element={

          <PrivadaRotasHorario>
        
            <PgHorario/>
        
        </PrivadaRotasHorario>}
        
        />

        <Route path='listaArea' element={

          <PrivadaRotasArea>
        
          <ListaArea/>
        
        </PrivadaRotasArea>

        }/>

        <Route path="listaCurso" element={<ListaCursos/>}/>

        <Route path="folders" element={<Folder/>}/>

        <Route path="/home" element={<Home/>}/>

        <Route path="/logs" element={<PaginaLog/>} />

        <Route path="/logArea" element={<LogArea/>} />

        <Route path="/logCurso" element={<LogCurso/>} />

        <Route path="/logHorario" element={<LogHorario/>} />

        <Route path="/logInstrutor" element={<LogInstrutor/>} />

        <Route path="/logTurma" element={<LogTurma/>} />

        <Route path="/logUsuario" element={<LogUsuario/>} />
      </Routes>
    );
  
}

export default Rotas;
