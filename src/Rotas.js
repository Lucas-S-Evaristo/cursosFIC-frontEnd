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


function Rotas() {

  useEffect(() => {
    const token = localStorage.getItem('token');


  }, []);


  const token = localStorage.getItem("token");

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

    localStorage.removeItem('token');
 localStorage.removeItem('payload');

    console.log("Payload!!!!!!!!!!!!!!!!!: ", payload)

    if (payload.tipo_usuario === "Master") {
      console.log("MASTERRR");


    } else if (payload.tipo_usuario === "Opp") {

      console.log("Opp")

    } else {
      console.log("ELSEEEEE", payload.tipo_usuario);
    }
    localStorage.setItem('payload', JSON.stringify(payload));
    
  }
    function PrivadaRotasInstrutores() {


      let p = localStorage.getItem("payload");
      p = JSON.parse(p);
      
      console.log("payload.QQQQQQQQQQQQQQ: ", p );
     
      console.log("payload: tipo_usuarioooooooooooooooooo  ", p );

      


        if(p != null){
          if (p.tipo_usuario === "Master" || p.tipo_usuario === "Opp" ) {

            console.log("AAAAAAAAAUTORIZADOOOO!!!!")
            
    
            return <Instrutor />
          } else {
    
            console.log("INAUTORIZADOOOO!!!!")
    
            return <Navigate to="/" />
          }

        }else{


          console.log("NULOOOOOOOOOOOOOOOOO")

          return <Navigate to="/" />
        }

     
    }


    function PrivadaRotasUsuarios() {


      let p = localStorage.getItem("payload");
      p = JSON.parse(p);
      
      console.log("payload.QQQQQQQQQQQQQQ: ", p );
     
      console.log("payload: tipo_usuarioooooooooooooooooo  ", p );

      


        if(p != null){
          if (p.tipo_usuario === "Opp") {

            console.log("AAAAAAAAAUTORIZADOOOO!!!!")
            
    
            return <Usuario/>
          } else {
    
            console.log("INAUTORIZADOOOO!!!!")
    
            return <Navigate to="/" />
          }

        }else{


          console.log("NULOOOOOOOOOOOOOOOOO")

          return <Navigate to="/" />
        }

     
    }

    


    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Usuario" element={
        <PrivadaRotasUsuarios>
            <Usuario/>

          </PrivadaRotasUsuarios>
          } />

        <Route path="/redefinirSenha" element={<RedefinirSenha />} />


        <Route path="/instrutores" element={

          <PrivadaRotasInstrutores>

            <Instrutor />

          </PrivadaRotasInstrutores>} />
      </Routes>
    );
  
}

export default Rotas;
