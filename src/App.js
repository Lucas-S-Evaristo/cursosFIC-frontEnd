import './App.css';
import * as React from 'react';
import { useEffect, useState } from 'react';
import ListaUsuario from './components/Usuario/ListaUsuario';

function App() {

  const usuario = {
    id:0,
    nome:'',
    nif:'',
    email:'',
    senha:'',
    tipo:'',
  }

  const [usuarios, setUsuario] = useState([])

  useEffect(()=>{

    fetch('http://10.92.198.11:8080/api/usuario ')
    .then(resp => resp.json())
    .then(retorno_convertido=> setUsuario(retorno_convertido))

  },[]);

  return (
    <div>
      <p>{JSON.stringify(usuarios)}</p>
      <ListaUsuario vetor={usuarios} />
    </div>
  );
}

export default App;