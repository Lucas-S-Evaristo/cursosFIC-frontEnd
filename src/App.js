import './App.css';
import React from 'react';
import ListaUsuario from './components/Usuario/ListaUsuario';
import FormUsuario from './components/Usuario/FormUsuario';

function App() {
  return (
    <div>
      <FormUsuario />
      <ListaUsuario />
    </div>
  )
}

export default App;