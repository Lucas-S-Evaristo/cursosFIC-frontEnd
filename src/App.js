import './App.css';

import ResponsiveDrawer from './components/ResponsiveDrawer'
import React, { Component, useEffect, useState } from 'react';
import Formulario from './components/cursos/formulario';

function App() {

  const curso = {
    id: 0,
    nome: "",
    objetivo: "",
    preRequisito: "",
    conteudoProgramatico: "",
    sigla: "",
    cargaHoraria: 0,
    valor: 0
  }

  const [objCurso, setObjCurso] = useState(curso)

  const post = (e) => {

    console.log(e.target)
    setObjCurso({ ...objCurso, [e.target.name]: e.target.value })
  }

  const cadastrar = () => {
    fetch("http://localhost:8080/api/curso", {
      method: 'post',
      body: JSON.stringify(objCurso),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }

    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      console.log(retorno_convertido)
    })
  }


  return (
    <div class="app">

      <div class="form1">
        <Formulario eventoTeclado={post} cadastrar={cadastrar} />
      </div>

    </div>







  )
}

export default App;
