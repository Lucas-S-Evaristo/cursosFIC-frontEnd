import { Box } from "@material-ui/core";
import { LocalConvenienceStoreOutlined } from "@mui/icons-material";
import { Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MenuLateral from "../menu/MenuLateral";
import "./hm.css";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "46vh",
  height: "17.9vh",
  bgcolor: 'background.paper',
  boxShadow: 0,
  borderRadius: 10,
  p: 4,
};
function HomeG() {
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
  const data = [
    ["Task", "Hours per Day"],
    ["Adiada", adiada.length],
    ["Concluidas", concluido.length],
    ["Canceladas", cancelada.length],
    ["Abertas", aberto.length],
    ["Ofertadas", ofertada.length],
    ["Fechadas", fechada.length], // CSS-style declaration]
    ["Iniciados", iniciado.length], // CSS-style declaration]
  ];
  const options = {
    pieHole: 0.5,
    is3D: false,
  };

  const msgIdErrado = () => {
    toast.warning("Selecione um curso existente", {
      position: "top-center",
      autoClose: 7500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "dark",
      // faz com que seja possivel arrastar
      draggable: true,
      progress: undefined,
    });
  };



  const msgErro = () => {
    toast.error("Não existe turma aberta!", {
      position: "top-center",
      autoClose: 7500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "dark",
      // faz com que seja possivel arrastar
      draggable: true,
      progress: undefined,
    });
  };

  const msgParametro = () => {
    toast.error("Não existe um parametro cadastrado!", {
      position: "top-center",
      autoClose: 7500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "dark",
      // faz com que seja possivel arrastar
      draggable: true,
      progress: undefined,
    });
  };

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

  const gerarFolderTurma = async () => {
    let result = await fetch("http://localhost:8080/api/folder/turma")

    if (result.status === 409) {

      msgErro()

    } else if (result.status === 208) {

      msgParametro();

    } else {

      window.open("http://localhost:8080/api/folder/turma", '_blank');

    }
  }


  const gerarXls = async () => {

    let result = await fetch("http://localhost:8080/api/folder/xls")

    msgFeito()

    if (result) {

      result = await result.json();

      window.open(`http://localhost:8080/folders/${result.nome}`, '_blank');

    }

  }


  const gerarFolderCurso = async () => {

    let id = document.getElementById("selectFolderC").value;

    let result = await fetch("http://localhost:8080/api/folder/curso/" + id)


    if (id === "selecione") {

      msgIdErrado();

    }

    else if (result.status === 208) {

      msgParametro()

    } else {

      window.open("http://localhost:8080/api/folder/curso/" + id, '_blank');

    }



  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const msgFeito = () => {
    toast.success(
      "Arquivo Gerado com sucesso",
      {
        position: "top-center",

        autoClose: 3000,

        hideProgressBar: false,

        closeOnClick: true,

        pauseOnHover: true,

        theme: "dark",

        // faz com que seja possivel arrastar

        draggable: true,

        progress: undefined,
      }
    );
  };


  return (
    <div className="divHome">
      <MenuLateral />
      <ToastContainer position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="divEstatisticas">
        <section className="secGrafico">
          <h1 className="TitleHome">Estatísticas</h1>

          <Chart
            chartType="PieChart"
            width="200vh"
            height="70vh"
            data={data}
            style={{
              position: "relative",
              left: "6vh",
              top: "3.8vh",
            }}
            options={options}
          />
        </section>

        <section className="secEst">
          <div
            style={{
              paddingLeft: 10,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className="divE">
              <h1 className="pest h1">Turmas existentes</h1>
              <p className="pest pClass">{turmas.length}</p>
            </div>
            <div className="divE">
              <h1 className="pest h1 h1c">Cursos cadastrados</h1>
              <p className="pest pc">{cursos.length}</p>
            </div>
          </div>
        </section>

        <section className="secButtons">
          <button
            style={{ borderRadius: "0.5vh ", backgroundColor: "black" }}
            className="botaoFolderT "
            onClick={gerarFolderTurma}
            variant="contained"
          >
            Folder de Turmas
          </button>



          <section>
            <button
              style={{ borderRadius: "0.5vh ", backgroundColor: "black" }}
              className="botaoFolderC "
              onClick={handleOpen}
              variant="contained"
            >
              Folder de Cursos
            </button>
          </section>

          <section>
            <button
              className="botaoCsv"
              onClick={gerarXls}
              variant="contained"
            >
              Gerar Excel
            </button>
          </section>

          <section>
            <a href="/">
              <button
                style={{ borderRadius: "0.5vh ", backgroundColor: "black" }}
                className="botaoT "
                variant="contained"
              >

                Lista de Turmas


              </button>
            </a>
          </section>
        </section>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <section className="sectFolderC">
            <h1 className="h1Modal">Gerador de folder de Curso</h1>
            <select
              id="selectFolderC"
            >
              <option>selecione</option>
              {cursos.map((obj) => (
                <option value={obj.id}>{obj.nome}</option>
              ))}
            </select>

            <button onClick={gerarFolderCurso} className="btnfolderC"> GERAR </button>
          </section>
        </Box>
      </Modal>
    </div>
  );
}

export default HomeG;
