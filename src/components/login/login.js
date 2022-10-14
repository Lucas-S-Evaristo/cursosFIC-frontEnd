import React from "react";
import "./login.css"

function Login() {
    return(
        <div className="divLogin">
            <header style={{color:"white"}}>
                <img src={require("../login/LogoSenaiOriginal.png")}  className="logo"/>
            </header>
            <div className="div1">
                
                 <form className="formLogin">
                    <h1>Login</h1>
                    <div className="divInput">
                    <input placeholder="NIF" className="inNif inputLogin"/>
                    <input placeholder="Senha" className="insenha inputLogin"/>
                    <button>Entrar</button>
                    </div>
                    
                 </form>
            </div>
            <div className="div2">
                 
            </div>
        
            
        </div>
    )
}

export default Login;