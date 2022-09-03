import './App.css';

import ResponsiveDrawer from './components/ResponsiveDrawer'
import React, { Component, useEffect, useState } from 'react';
import Formulario from './components/cursos/formulario';
import Rotas from './Rotas';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {

  

  return (
    <div class="app">

      
    <BrowserRouter>
      <Rotas />
    </BrowserRouter>
    

    </div>







  )
}

export default App;
