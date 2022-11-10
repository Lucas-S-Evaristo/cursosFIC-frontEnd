import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

import "./hm.css";
function Home() {
  // variavel que tem acesso a um array com todos os cursos
  const [cursos, setCursos] = useState([]);
  // variavel que tem acesso a um array com todas as turmas
  const [turmas, setTurma] = useState([]);

  const [aberto, setAberto] = useState([]);
  const [fechada, setFechada] = useState([]);
  const [cancelada, setCancelada] = useState([]);
  const [concluido, setConcluido] = useState([]);
  const [iniciado, setIniciado] = useState([]);
  const [ofertada, setOfertada] = useState([]);
  const [adiada, setAdiada] = useState([]);

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
  useEffect(() => {
    fetch("http://localhost:8080/api/turma/BuscarTG/aberto")
      .then((resp) => resp.json())
      .then((retorno_convertido) => setAberto(retorno_convertido)); //lista de turmas
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/turma/BuscarTG/fechada")
      .then((resp) => resp.json())
      .then((retorno_convertido) => setFechada(retorno_convertido)); //lista de turmas
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/turma/BuscarTG/cancelada")
      .then((resp) => resp.json())
      .then((retorno_convertido) => setCancelada(retorno_convertido)); //lista de turmas
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/turma/BuscarTG/concluido")
      .then((resp) => resp.json())
      .then((retorno_convertido) => setConcluido(retorno_convertido)); //lista de turmas
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/turma/BuscarTG/iniciado")
      .then((resp) => resp.json())
      .then((retorno_convertido) => setIniciado(retorno_convertido)); //lista de turmas
  }, []);
  useEffect(() => {
    fetch("http://localhost:8080/api/turma/BuscarTG/ofertada")
      .then((resp) => resp.json())
      .then((retorno_convertido) => setOfertada(retorno_convertido)); //lista de turmas
  }, []);
  useEffect(() => {
    fetch("http://localhost:8080/api/turma/BuscarTG/adiada")
      .then((resp) => resp.json())
      .then((retorno_convertido) => setAdiada(retorno_convertido)); //lista de turmas
  }, []);

  const data = [
    ["Task", "Hours per Day"],
    ["abertas", aberto.length],
    ["fechadas", fechada.length],
    ["concluidas",concluido.length],
    ["canceladas", cancelada.length],
    ["iniciadas", iniciado.length],
    ["ofertadas", ofertada.length],
    ["adiadas",adiada.length]
  ];
  

  return (
    <div className="divHome">
      <header className="headHome">
        <img src={require("./logoSenaiOrigin.png")} className="logoHome" />
        <button className="btLoginH">LOGIN</button>
      </header>
      <div className="divEstatisticas">
        <section className="secC">
          <h1 className="titleC">Cursos disponiveis</h1>
          <h1 className="estCursos">{cursos.length}</h1>
        </section>
        <section className="secT">
          <h1 className="titleT">Turmas Existentes</h1>
          <h1 className="estTurmas">{turmas.length}</h1>
          <article className="artStatus">
            <div>
              <section className="secStatus">
                

                <h1 className="status">Abertas</h1>

                <h2 className="estStatus">{aberto.length}</h2>
              </section>

              <section className="secStatus">
                

                <h1 className="status">Fechadas</h1>

                <h2 className="estStatus">{fechada.length}</h2>
              </section>

              <section className="secStatus">
                

                <h1 className="status">Concluidas</h1>

                <h2 className="estStatus">{concluido.length}</h2>
              </section>

              <section className="secStatus">
                
                <h1 className="status">Canceladas</h1>

                <h2 className="estStatus">{cancelada.length}</h2>
              </section>

              <section className="secStatus">
                

                <h1 className="status">Iniciadas</h1>

                <h2 className="estStatus">{iniciado.length}</h2>
              </section>

              <section className="secStatus">
                

                <h1 className="status">Ofertadas</h1>

                <h2 className="estStatus">{ofertada.length}</h2>
              </section>

              <section className="secStatus">
               
                <h1 className="status">Adiadas</h1>

                <h2 className="estStatus">{adiada.length}</h2>
              </section>
            </div>
          </article>
          <Chart
            chartType="PieChart"
            data={data}
            width={"110vh"}
            height={"70vh"}
            rows={100}
            className="grafico"
          />
        </section>
        <section className="secF">
          section dos botoes de exportações de folders.
        </section>
      </div>
    </div>
  );
}

export default Home;
