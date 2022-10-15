import React from "react";
import "./login.css"

function Login() {
    return(
        <div className="divLogin">
            <header style={{color:"white"}}>
                <img src={require("../login/LogoSenaiOriginal.png")}  className="logo"/>
                <a href="/redefinirSenha" className="afolder">Folders</a>
            </header>
            <div className="divs">
            <div className="div1">
                
                <form className="formLogin">
                   <h1 className="title">Login</h1>
                   <div className="divInput">
                   <input placeholder="NIF" className="inNif inputLogin" maxLength="9" minLength="7" required/>
                   <input placeholder="Senha" className="insenha inputLogin" type={"password"} required/>
                   <a href="/redefinirSenha" className="aEscSennha">Esqueceu a senha?</a>
                   <div className="divBtn">
                       <button className="btnEntrar">
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