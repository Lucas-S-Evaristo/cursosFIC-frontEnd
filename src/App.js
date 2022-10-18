



import  React, { Component} from 'react';
import { useEffect, useState } from 'react';
import Rotas from './Rotas';
import { BrowserRouter} from 'react-router-dom';


function App() {


    return (

     <BrowserRouter>
       
        <Rotas/>
    
     </BrowserRouter>
        

    
    )
  
    }
    


export default App;
