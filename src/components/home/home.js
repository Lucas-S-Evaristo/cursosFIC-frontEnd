import React from "react";
import Button from "@mui/material/Button";

import "./hm.css";
function Home() {
  return (
    <div className="divHome">
      <header className="headHome">
        <img
          src={require("./logoSenaiOrigin.png")}
          className="logoHome"
        />
        <button
        className="btLoginH"
        >LOGIN</button>
      </header>
      <div className="divEstatisticas">
        <section className="secEst">
             Cursos
            
            <h1 className="subtitleSec">
              Totais cursos disponiveis
            </h1>
            <p className="pEST">20</p>
        </section>
        <section className="secEst">
            Turmas
            <h1 className="subtitleSec" >
              Totais turmas existentes
            </h1>
            <p className="pEST">20</p>
        </section >
      </div>
      <p style={{position:"absolute",top:"10%",left:"50%", backgroundColor:"red"}}>.</p>
    </div>
  );
}

export default Home;
