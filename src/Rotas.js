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

import ListaCursos from "./components/curso/listaCursos";
import Folder from "./components/folders/Folder";

function Rotas() {

  useEffect(() => {
    const token = localStorage.getItem('token');


  }, []);


  const token = localStorage.getItem("token");
  {console.log(token)}






  if (token != null) {

    function parseJwt(token) {

      var base64Url = token.split(".")[1];

      var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

      var jsonPayload = decodeURIComponent(

        atob(base64).split("").map(function (c) {

          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);

        })
          .join("")
      );

      return JSON.parse(jsonPayload);
    }
     let payload = parseJwt(token);

    localStorage.setItem('payload', JSON.stringify(payload)); 
    
  }
    function PrivadaRotasInstrutores() {

      let p = localStorage.getItem("payload");
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
      
      let p = localStorage.getItem("payload");
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
      
      let p = localStorage.getItem("payload");
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
      
      let p = localStorage.getItem("payload");
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
      
      let p = localStorage.getItem("payload");
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


        <Route path="/redefinirSenha" element={<RedefinirSenha />} />

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
          
      </Routes>
    );
  
}

export default Rotas;
