import './App.css';
import * as React from 'react';
import { useEffect, useState } from 'react';
import ListaUsuario from './components/Usuario/ListaUsuario';
import CadUsuario from './components/Usuario/CadUsuario';

function App() {

  const usuario = {
    id:0,
    nome:'',
    nif:'',
    email:'',
    senha:'',
    tipo:'',
  }

  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [usuarios, setUsuario] = useState([])
  const [objUsuario, setObjUsuario] = useState(usuario)

  useEffect(()=>{

    fetch('http://10.92.198.11:8080/api/usuario ')
    .then(resp => resp.json())
    .then(retorno_convertido=> setUsuario(retorno_convertido))

  },[]);

  const aoDigitar = (e) => {

    setObjUsuario({...objUsuario, [e.target.name]: e.target.value})
    console.log(e)
  
  }

  const cadastrarUsuario = () =>{

    fetch('http://localhost:8080/api/usuario',{

    method:'post',
    body:JSON.stringify(objUsuario),
    headers:{
      'Content-type': 'application/json',
      'Accept':'application/json'
    }
    }).then(retorno => retorno.json())
    .then(retorno_convertido=>{

      limparForm();
    })
    
  }

  const limparForm = () =>{

    setObjUsuario(usuario)
  }


  return (
    <div>
      <p>{JSON.stringify(usuarios)}</p>
      <CadUsuario objeto={objUsuario} cadastrar={cadastrarUsuario} eventoTeclado={aoDigitar} botao={btnCadastrar}/>
      <ListaUsuario vetor={usuarios} />
    </div>
  );
}

export default App;