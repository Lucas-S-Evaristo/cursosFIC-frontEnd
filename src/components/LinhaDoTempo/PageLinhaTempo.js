import React, { useEffect } from "react";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./linhaTempo.css";

import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import RadioButtonUncheckedTwoToneIcon from '@mui/icons-material/RadioButtonUncheckedTwoTone';

function LinhaTempo() {
  // variavel que tem acesso a um array com todas as turmas
  const [turmas, setTurma] = useState([]);
  const moment = require("moment");

  const getTurma = async () => {
    let id = localStorage.getItem("idLT")
    let result = await fetch(`http://localhost:8080/api/turma/${id}`);
    result = await result.json();
    setTurma(result);
  };

  const addAction = async (id) => {
    // requisição ao back-end
    let resultado = await fetch("http://localhost:8080/api/linhaDoTempo/" + id, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    });

    // verifica se existe resultado
    if (resultado.status === 200) {
      getTurma()
    }
  };

  // REQUISIÇÃO GET PARA PUXAR TODAS AS TURMAS
  useEffect(() => {
    let id = localStorage.getItem("idLT")
    console.log(id)
    fetch(`http://localhost:8080/api/turma/${id}`)
      .then((resp) => resp.json())
      .then((retorno_convertido) => setTurma(retorno_convertido)); //lista de turmas
  }, []);

  return (
    <>
      <div style={{ scrollbarColor: "red" }} className="conteudoLinha">
        <div className="tabelaContainer">
          <div className="position">
            {console.log(turmas)}
            {turmas.map((obj) => (
              <div class="wrapper">
                {
                obj.status === true ? <div style={{backgroundColor: "rgb(0, 173, 0)"}} class="center-line"> {/* linha */}
                  <a class="scroll-icon">
                  {
                    obj.status === true ? <button className="botaoCheckok"> <CheckCircleOutlineOutlinedIcon /></button> : <button className="botaoCheck" onClick={() => addAction(obj.id)}> <CheckCircleOutlineOutlinedIcon /></button>
                  }
                  </a>
                </div>
                :
                <div class="center-line"> {/* linha */}
                  <a class="scroll-icon">
                  {
                    obj.status === true ? <button className="botaoCheckok"> <CheckCircleOutlineOutlinedIcon /></button> : <button className="botaoCheck" onClick={() => addAction(obj.id)}> <CheckCircleOutlineOutlinedIcon /></button>
                  }
                  </a>
                </div>
                }
                <div class="row row-1">
                  <section>
                    <div class="details">
                      <span class="title2">{obj.acoesdaLinhaDoTempo}</span>
                    </div>
                    <p>
                      {moment(obj.dataPrevista).format('DD/MM/YYYY')}
                    </p>
                    {console.log(obj.status)}
                    {
                      obj.status === true ? <p>Concluído</p> : <p>Não concluído</p>
                    }
                  </section>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default LinhaTempo;
