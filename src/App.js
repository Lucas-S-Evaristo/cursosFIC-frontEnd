<<<<<<< HEAD


import PgPricipal from './components/PgPricipal'
import  React, { Component} from 'react';
import { useEffect, useState } from 'react';


function App() {

  // obj usuario

  const usuario = {
    id:0,
    nome:'',
    nif:''
  }

  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [usuarios, setUsuario] = useState([])
  const [objUsuario, setObjUsuario] = useState(usuario)

  

  // useEfect

  useEffect(()=>{

    fetch('http://localhost:8080/api/instrutor')
    .then(resp => resp.json())
    .then(retorno_convertido=> setUsuario(retorno_convertido))
     
  },[]);


  // pegando dados do formulario
  const aoDigitar = (e) => {

    setObjUsuario({...objUsuario, [e.target.name]: e.target.value})
  
  }

  // metodo que cadastra um novo usuario
  const cadastrarUsuario = () =>{

    // requisição ao back-end
    fetch('http://10.92.198.11:8080/api/instrutor',{

    method:'post',
    body:JSON.stringify(objUsuario),
    headers:{
      'Content-type': 'application/json',
      'Accept':'application/json'
    }
    }).then(retorno => retorno.json())
    .then(retorno_convertido=>{

      // pegando todos os usuarios da lista e adicionando um novo usuario que vem da promessa do fetch
      setUsuario([...usuarios,retorno_convertido] )
      alert("Usuario cadstrado com sucesso")
      // limpando o form
      limparForm();
    })
    
  }

  // metodo que limpa o formulario após cadastrar um novo usuario
  const limparForm = () =>{

    //  pegando as caracateristicas do usuario 'vazio'
    setObjUsuario(usuario)
  }

  // metodo que seleciona um usuario

  const selecionarUsuario = (indice) =>{

    setObjUsuario(usuarios[indice]);
    setBtnCadastrar(false);

  }
  console.log(usuarios)

  
    return (

      <PgPricipal  vetor={usuarios}/>
        

    
    )
  
    }
    

=======
import './App.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Rotas from './Rotas';

function App() {
  return (
    <div class = "app">
      <BrowserRouter>
        <Rotas />
      </BrowserRouter>
    </div>
  )
}
>>>>>>> usuarios

export default App;