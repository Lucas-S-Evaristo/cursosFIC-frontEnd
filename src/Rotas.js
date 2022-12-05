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
import Senha from "./components/login/redefinirSenha";
import PaginaLog from "./components/log/paginaLog";

import LogArea from "./components/log/logArea/logArea";
import LogCurso from "./components/log/logCurso/LogCurso";

import LogHorario from "./components/log/logHorario/LogHorario";

import LogInstrutor from "./components/log/logInstrutor/LogInstrutor";
import HomeG from "./components/home/home";
import LogTurma from "./components/log/logTurma/LogTurma";

import LogUsuario from "./components/log/logUsuario/LogUsuario";
import ListaParametro from "./components/parametros/Parametro";

import LinhaDoTempo from "./components/LinhaDoTempo/PageLinhaTempo"
import PaginaNaoEncontrada from "./PaginaNaoEncontrada";

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

    function PrivadaRotasCursos() {
      
      let p = sessionStorage.getItem("payload");
      p = JSON.parse(p);
      
        if(token != null){

          if ( p.tipo_usuario === "Master" || p.tipo_usuario === "Opp" || p.tipo_usuario === "Secretária" ) {
          
            return <ListaCursos/>
          } else {
    
            return <Navigate to="/login" />
          }

        }else{

          return <Navigate to="/login" />
        }
    }

    function PrivadaRotasLogs() {
      
      let p = sessionStorage.getItem("payload");
      p = JSON.parse(p);
      
        if(token != null){

          if ( p.tipo_usuario === "Master" ) {
          
            return <PaginaLog/>
          } else {
    
            return <Navigate to="/login" />
          }

        }else{

          return <Navigate to="/login" />
        }
    }

    function PrivadaRotasLogArea() {
      
      let p = sessionStorage.getItem("payload");
      p = JSON.parse(p);
      
        if(token != null){

          if ( p.tipo_usuario === "Master" ) {
          
            return <LogArea/>
          } else {
    
            return <Navigate to="/login" />
          }

        }else{

          return <Navigate to="/login" />
        }
    }

    function PrivadaRotasLogCurso() {
      
      let p = sessionStorage.getItem("payload");
      p = JSON.parse(p);
      
        if(token != null){

          if ( p.tipo_usuario === "Master" ) {
          
            return <LogCurso/>
          } else {
    
            return <Navigate to="/login" />
          }

        }else{

          return <Navigate to="/login" />
        }
    }

    function PrivadaRotasLogHorario() {
      
      let p = sessionStorage.getItem("payload");
      p = JSON.parse(p);
      
        if(token != null){

          if ( p.tipo_usuario === "Master" ) {
          
            return <LogHorario/>
          } else {
    
            return <Navigate to="/login" />
          }

        }else{

          return <Navigate to="/login" />
        }
    }

    function PrivadaRotasLogInstrutor() {
      
      let p = sessionStorage.getItem("payload");
      p = JSON.parse(p);
      
        if(token != null){

          if ( p.tipo_usuario === "Master" ) {
          
            return <LogInstrutor/>
          } else {
    
            return <Navigate to="/login" />
          }

        }else{

          return <Navigate to="/login" />
        }
    }

    function PrivadaRotasLogTurma() {
      
      let p = sessionStorage.getItem("payload");
      p = JSON.parse(p);
      
        if(token != null){

          if ( p.tipo_usuario === "Master" ) {
          
            return <LogTurma/>
          } else {
    
            return <Navigate to="/login" />
          }

        }else{

          return <Navigate to="/login" />
        }
    }

    function PrivadaRotasLogUsuario() {
      
      let p = sessionStorage.getItem("payload");
      p = JSON.parse(p);
      
        if(token != null){

          if ( p.tipo_usuario === "Master" ) {
          
            return <LogUsuario/>
          } else {
    
            return <Navigate to="/login" />
          }

        }else{

          return <Navigate to="/login" />
        }
    }

    function PrivadaRotasParametro() {
      
      let p = sessionStorage.getItem("payload");
      p = JSON.parse(p);
      
        if(token != null){

          if ( p.tipo_usuario === "Master" || p.tipo_usuario === "Opp" ) {
          
            return <ListaParametro/>
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
        <Route path="/home" element={<HomeG/>}/>
        <Route path="/linhaTempo" element={<LinhaDoTempo/>}/>
        <Route path="*" element={<PaginaNaoEncontrada/>}/>
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

        <Route path="listaCurso" element={

          <PrivadaRotasCursos>      

          <ListaCursos/>

        </PrivadaRotasCursos>

        }/>

       


        <Route path="/logs" element={
        
        <PrivadaRotasLogs>
        
        <PaginaLog/>
        
        </PrivadaRotasLogs>
        } />

        <Route path="/logArea" element={

          <PrivadaRotasLogArea>
        
        <LogArea/>

        </PrivadaRotasLogArea>
        
        } />

        <Route path="/logCurso" element={

          <PrivadaRotasLogCurso>
        
        <LogCurso/>

        </PrivadaRotasLogCurso>
        
        } />

        <Route path="/logHorario" element={
        
        <PrivadaRotasLogHorario>

        <LogHorario/>

        </PrivadaRotasLogHorario>
        
        } />

        <Route path="/logInstrutor" element={

          <PrivadaRotasLogInstrutor>
        
        <LogInstrutor/>

        </PrivadaRotasLogInstrutor>
        
        } />

        <Route path="/logTurma" element={

          <PrivadaRotasLogTurma>
        
        <LogTurma/>

        </PrivadaRotasLogTurma>
        
        } />

        <Route path="/logUsuario" element={

          <PrivadaRotasLogUsuario>
        
        <LogUsuario/>

        </PrivadaRotasLogUsuario>

        } />

        <Route path="/listaParametros" element={

          <PrivadaRotasParametro>

          <ListaParametro/>

          </PrivadaRotasParametro>
                  
        }/>

      </Routes>
    );
  
}

export default Rotas;
