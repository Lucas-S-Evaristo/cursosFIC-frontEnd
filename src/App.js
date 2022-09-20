import './App.css';


import React from 'react';

import Rotas from './Rotas';
  import { BrowserRouter} from 'react-router-dom';

function App() {

  

  return (
    <div className="app">

      
    <BrowserRouter>
      <Rotas />
    </BrowserRouter>
    

    </div>







  )
}

export default App;
