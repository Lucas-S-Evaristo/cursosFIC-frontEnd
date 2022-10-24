import React, {useEffect} from "react";
import "./login.css"
import api from "../api/api"

import { ToastContainer, toast } from "react-toastify";
import { Redirect } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";

const msgErroLogin = () => {


  toast.error("Informações não encontrada", {
    position: "top-right",

    autoClose: 1500,

    hideProgressBar: false,

    closeOnClick: true,

    pauseOnHover: true,

    theme: "colored",

    // faz com que seja possivel arrastar

    draggable: true,

    progress: undefined,
  });
};


function Login() {
 
 
    const loginToken = async (event) => {
        /* tiras as características de evento evitando Recarregar  a pagina */
        event.preventDefault();
        /* pegar todos  os valores do evento */
        const formData = new FormData(event.target);
        /*formata em um objeto em  json */
        const data = Object.fromEntries(formData);
    
        /* let obgj = {
          nome: data,
        }; */
       
        /* verificar se  requisição foi feita com sucesso */
        let result = await fetch(`http://localhost:8080/api/usuario/login`, {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
        });
       
        console.log("oi result "+result);
        /* verificar se a requisição Retornou um erro 401*/
        if (result.status === 401) {
            msgErroLogin()

          /* verificar se  requisição foi feita com sucesso */
        } else if (result) {
          result = await result.json();
     
          const {  token  } =  result;
        
          localStorage.setItem('token', JSON.stringify(token));
        
          window.location.href = 'http://localhost:3000/instrutores' 
          
          /* mensagem de cadastrar com sucesso */
     
        }
      };


    return(
      
        <div className="divLogin">
              <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
            <header style={{color:"white"}}>
                <img src={require("../login/LogoSenaiOriginal.png")}  className="logo"/>
                <a href="/redefinirSenha" className="afolder">Folders</a>
            </header>
            <div className="divs">
            <div className="div1">
                
                <form className="formLogin" onSubmit={loginToken}>
                   <h1 className="title">Login</h1>
                   <div className="divInput">
                   <input placeholder="NIF" className="inNif inputLogin" name="nif" maxLength="9" minLength="7" required/>
                   <input placeholder="Senha" className="insenha inputLogin" name="senha" type={"password"} required/>
                   <a href="/redefinirSenha" className="aEscSennha">Esqueceu a senha?</a>
                   <div className="divBtn">
                       <button className="btnEntrar" type="submit">
                               <p className="pEntrar">Entrar</p>
                       </button>
                   </div>
               </div>
                   
                </form>
           </div>
           <div className="div2">
                <img src={require("./imgPc.png")} className="imgDiv2"/>
           </div>
            </div>
            
        
            
        </div>
    )
}

export default Login; 