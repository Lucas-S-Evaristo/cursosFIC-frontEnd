import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ClassIcon from '@mui/icons-material/Class';
import PeopleIcon from '@mui/icons-material/People';

import "./hm.css";
function Home() {
  // variavel que tem acesso a um array com todos os cursos
  const [cursos, setCursos] = useState([]);
  // variavel que tem acesso a um array com todas as turmas
  const [turmas, setTurma] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/curso")
      .then((resp) => resp.json())
      .then((retorno_convertido) => setCursos(retorno_convertido)); //lista de cursos
  }, []);
  useEffect(() => {
    fetch("http://localhost:8080/api/turma")
      .then((resp) => resp.json())
      .then((retorno_convertido) => setTurma(retorno_convertido)); //lista de turmas
  }, []);

  return (
    <div className="divHome">
      <header className="headHome">
        <img src={require("./logoSenaiOrigin.png")} className="logoHome" />
        <button className="btLoginH">LOGIN</button>
      </header>
      <div className="divEstatisticas">
        <section className="secEst">
          <ClassIcon/>
          <h1 className="subtitleSec">Totais cursos disponiveis</h1>
          <p className="pEST" style={{ position: "relative", left: "30.2vh" }}>
            {cursos.length}
          </p>
        </section>
        <section className="secEst">
          <PeopleIcon/>
          <h1 className="subtitleSec">Totais turmas existentes</h1>
          <p className="pEST">{turmas.length}</p>
        </section>
      </div>
     
      <div className="divEstatisticas divEst">
        <section className="secEst sec2">
          <h1 className="subtitleSec ">Turmas Abertas</h1>
          <p>20</p>
        </section>
        <section className="secEst sec2">
          <h1 className="subtitleSec">Turmas Abertas</h1>
          <p>20</p>
        </section>
        <section className="secEst sec2">
          <h1 className="subtitleSec">Turmas Abertas</h1>
          <p>20</p>
        </section>

        <section className="secEst sec2">
          <h1 className="subtitleSec ">Turmas Abertas</h1>
          <p>20</p>
        </section>
        <section className="secEst sec2">
          <h1 className="subtitleSec">Turmas Abertas</h1>
          <p>20</p>
        </section>
        <section className="secEst sec2">
          <h1 className="subtitleSec">Turmas Abertas</h1>
          <p>20</p>
        </section>

        <section className="secEst sec2">
          <h1 className="subtitleSec ">Turmas Abertas</h1>
          <p>20</p>
        </section>
        <section className="secEst sec2">
          <h1 className="subtitleSec">Turmas Abertas</h1>
          <p>20</p>
        </section>
        <section className="secEst sec2">
          <h1 className="subtitleSec">Turmas Abertas</h1>
          <p>20</p>
        </section>

        
 
      </div>
    </div>
  );
}

export default Home;
