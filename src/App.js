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

export default App;