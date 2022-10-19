import {
  Route,
  Routes,
  BrowserRouter,
  Switch,
  Redirect,
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
    const token = localStorage.getItem("token");
    console.log(token);
  }, []);

  const token = localStorage.getItem("token");

  function parseJwt(token) {
    var base64Url = token.split(".")[1];

    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")

        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }
  let payload = parseJwt(token);

  if (payload.tipo_usuario === "Master") {
    console.log("MASTERRRRRRRRRRRRRRRRRRRRRRRRRRRRRR");
  } else {
    console.log("ELSEEEEEEEEEEEEEEEEEEEEEEEEEEE", payload.tipo_usuario);
  }

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Usuario" element={<Usuario />} />
      <Route path="/redefinirSenha" element={<RedefinirSenha />} />
      <Route path="/instrutores" element={<Instrutor />} />
    </Routes>
  );
}

export default Rotas;
