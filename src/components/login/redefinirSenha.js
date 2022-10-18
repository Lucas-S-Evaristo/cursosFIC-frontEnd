import React from "react";
import "./RdfSenha.css"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function RedefinirSenha() {
    return(
        <div className="divLogin">
            <header style={{color:"white"}}>
                <img src={require("../login/LogoSenaiOriginal.png")}  className="logo"/>
            </header>
            <div className="divs">
            <div className="div1">

                <form className="formRDFS">
                    <a href="/" className="aVoltar"><button className="btnVoltar" type={"button"}><ArrowBackIcon className="arrow" fontSize="large"/></button></a>

                   <h1 className="title">Redefinir Senha</h1>
                   <div className="divInput">
                   <input placeholder="Email" className="inEmail inputLogin" type={"email"}  />
                   <input placeholder="Nova senha" type={ "password"} className="insenha inputLogin"  />
                   <div className="divBtn">
                       <button className="btnRedefinir">
                               <p className="pRedefinir">Redefinir</p>
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

export default RedefinirSenha;