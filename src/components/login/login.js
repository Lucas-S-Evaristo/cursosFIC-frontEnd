import React, {useEffect, useState} from "react";
import "./login.css"
import api from "../api/api"
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from "react-toastify";
import { Redirect } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { Button, TextField } from "@mui/material";
import { AlterarSenha, redefinirSenha, verificarEmail } from "./redefinirSenha";


const msgErroLogin = () => {

  toast.error("Informações não encontrada", {
    position: "top-center",

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

const msgSucessoSenha = () => {
  toast.success("Senha redefinida com sucesso! ", {
    position: "top-center",

    autoClose: 2000,

    hideProgressBar: false,

    closeOnClick: true,

    pauseOnHover: true,

    theme: "colored",

    // faz com que seja possivel arrastar

    draggable: true,

    progress: undefined,
  });
};

const msgMinimoSenha = () => {
  toast.error("Sua senha precisa ter no minimo 4 caracteres! ", {
    position: "top-right",

    autoClose: 2000,

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
 
  const [modalSenha, setShowSenha] = useState(false);

  const abrirModalSenha = () => setShowSenha(true);

  const fecharModalSenha = () => setShowSenha(false);
 
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

        }else if(result.status === 307){
          
          abrirModalSenha()
          

        } else if (result) {
          result = await result.json();
     
          const {  token  } =  result;

          
        
          sessionStorage.setItem('token', JSON.stringify(token));

          console.log("RESUUUUUUUUUUUUUUUUUUUUUULLLLLLLLLLTTTTTTTTTTTTTTTTTTTTTTTTT")

          window.location.href = 'http://localhost:3000/listaInstrutores' 
          
          /* mensagem de cadastrar com sucesso */
     
        }
      };

      const redefinirSenha = async (event) => {
        /* tiras as características de evento evitando Recarregar  a pagina */
        event.preventDefault();
        /* pegar todos  os valores do evento */
        const formData = new FormData(event.target);
        /*formata em um objeto em  json */
        const data = Object.fromEntries(formData);
        console.log(data);
        let result = await fetch(`http://localhost:8080/api/usuario/redefinirSenha`, {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
        });
        if(result.status === 409){
            msgMinimoSenha()

      
        }else{
      
          msgSucessoSenha()
          fecharModalSenha()
          setInterval(function () {window.location.reload();  }, 1500);
      
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
                <a href="folders" className="afolder">Folders</a>

                <a href="/" className="aTurmas">Lista de Turmas</a>
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
            
            <Modal
                show={modalSenha}
                onHide={fecharModalSenha}
                backdrop="static"
                keyboard={false}>
               
                <Modal.Body className="redefinirSenha">
                   <form className="redefinirSenha" onSubmit={redefinirSenha}>

                    <h5 className="tituloRedefinir">Por favor, Redefina sua senha!</h5>
                   <input className="inputRedefinir" name="senha" type="password"/>

                   <div class="parteBotaoRedefinirSenha">
                                <Button variant="contained" color="success" type="submit">Redefinir</Button>

                                </div>
                        
                   </form>

                </Modal.Body>

            </Modal>
            
        </div>
    )
}

export default Login; 