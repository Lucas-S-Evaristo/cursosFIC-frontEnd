import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableFooter from "@mui/material/TableFooter";
import TableCell from "@mui/material/TableCell";
import Fab from "@mui/material/Fab";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { toast, ToastContainer, cssTransition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateIcon from "@mui/icons-material/Create";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuLateral from "../menu/MenuLateral";
import { width } from "@mui/system";



const msgDeletadoerror = () => {
  toast.warning(" Não e possível deletar Curso porque ele está associado a uma Turma ", {
    position: "top-center",

    autoClose: 4500,

    hideProgressBar: false,

    closeOnClick: true,

    pauseOnHover: true,

    theme: "dark",

    // faz com que seja possivel arrastar

    draggable: true,

    progress: undefined,
  });
};

let token = sessionStorage.getItem("token")

function ListaCurso() {
  //  USE ESTATE USADO PARA CONTROLAR O ESTADO DE UMA VARIAVEL
  // estado da modal
  const [openModal, setOpenModal] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [modalAlt, setModalAlt] = useState(false);
  const [niveis, setNiveis] = useState([]);
  // metodo que abre a modal
  // metodo que fecha a modal
  const handleClose = () => setOpenModal(false);
  // variavel que tem acesso a um array com todos os cursos
  const [cursos, setCursos] = useState([]);
  // variavel que tem acesso a um array com todos os tipos de area
  const [tipoArea, setTipoArea] = useState([]);
  const [open, setOpen] = useState(false);
  const [tipoAtendimentos, setTipoAtendimentos] = useState([]);
  const [id, setId] = useState();
  const [nome, setNome] = useState();
  const [objetivo, setObjetivo] = useState();
  const [preRequisito, setPreRequisito] = useState();
  const [conteudoProgramatico, setConteudoProgramtico] = useState();
  const [sigla, setSigla] = useState();
  const [tipoAtendimento, setTipoAtendimento] = useState();
  const [nivel, setNivel] = useState();
  const [cargaHoraria, setCargaHoraria] = useState();
  const [area, setArea] = useState();
  const [valor, setValor] = useState();

  const [idCurso, setIdCurso] = useState()

  const [modalAlterar, setShow] = useState(false);

  const [modalCadastrar, setShowCadastrar] = useState(false);

  const [modalExcluir, setShowExcluir] = useState(false);

  const abrirModalExcluir = (id) => {
    setShowExcluir(true)
    setIdCurso(id)
  

  } ;

  const fecharModalExcluir = () => setShowExcluir(false);

  //quando handleClose é chamado ele da um false no show e fecha a modal
  const fecharModalAlterar = () => setShow(false);
  //quando handleShow é chamado ele da um true no show e abre a modal
  const abrirModalAlterar = () => setShow(true);
  

  const abrirModalCadastrar = () => setShowCadastrar(true);

  const fecharModalCadastrar = () => setShowCadastrar(false);

  // metodo que captura informações do input

  const capturarDados = (e) => {
    setCursos({ ...cursos, [e.target.name]: e.target.value });
  };

  const handleChangePage = (event, newPage) => {

    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // REQUISIÇÃO GET PARA PUXAR TODOS OS cursos
  useEffect(() => {
    fetch("http://localhost:8080/api/curso")
      .then((resp) => resp.json())
      .then((retorno_convertido) => setCursos(retorno_convertido)); //lista de cursos
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/enum/nivel")
      .then((resp) => resp.json())
      .then((retorno_convertido) => setNiveis(retorno_convertido)); //lista de niveis
  }, []);

  // REQUISIÇÃO GET PARA PUXAR TODOS OS TIPOS DE AREA
  useEffect(() => {
    fetch("http://localhost:8080/api/area")
      .then((resp) => resp.json())
      .then((retorno_convertido) => setTipoArea(retorno_convertido)); //lista de areas
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/enum/tipoAtendimento")
      .then((resp) => resp.json())
      .then((retorno_convertido) => setTipoAtendimentos(retorno_convertido)); //lista de tipo de atendimento
  }, []);

  // função que espera receber um id
  const alterar = async (id) => {
    let objetivo = document.getElementById("objetivo").value;
    let nome = document.getElementById("nome").value;
    let preRequisito = document.getElementById("preRequisito").value;
    let conteudoProgramatico = document.getElementById(
      "conteudoProgramatico"
    ).value;
    let tipoAtendimento = document.getElementById("tipoAtendimento").value;
    let nivel = document.getElementById("nivel").value;
    let cargaHoraria = document.getElementById("cargaHoraria").value;
    let area = document.getElementById("area").value;
    let valor = document.getElementById("valor").value;
    let justificativa = document.getElementById("justificativa").value

    console.log(justificativa)

    if(justificativa === ""){

      motivoAlteracao()

    }else{

    

    const cursoAlt = {
      id: id,
      objetivo: objetivo,
      nome: nome,
      preRequisito: preRequisito,
      conteudoProgramatico: conteudoProgramatico,
      tipoAtendimento: tipoAtendimento,
      nivel: nivel,
      cargaHoraria: cargaHoraria,
      area: { id: area },
      valor: valor,
      justificativa: justificativa
    };

    // requisição ao back-end
    let resultado = await fetch("http://localhost:8080/api/curso/" + id, {
      method: "PUT",
      body: JSON.stringify(cursoAlt),
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        "Authorization": token
      },
    });

    if (resultado) {
       // atualiza a lista com o curso alterado
       atualizaLista();
       // fecha a modal de alterar
       setShow(false);
       // exibe a msg de alteração concluida
       msgAlteracao();
    }
  }
  };

  // metodo que efetua o cadastro do curso
  const cadastrar = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const cursoCad = {
      objetivo: data.objetivo,
      nome: data.nome,
      preRequisito: data.preRequisito,
      conteudoProgramatico: data.conteudoProgramatico,
      tipoAtendimento: data.tipoAtendimento,
      nivel: data.nivel,
      cargaHoraria: data.cargaHoraria,
      area: { id: data.area },
      valor: data.valor,
    };


    fetch("http://localhost:8080/api/curso", {
      method: "post",
      body: JSON.stringify(cursoCad),
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        "Authorization": token
      },
    }).then((retorno) => {
      //se o input estiver vazio, passar uma resposta de erro e enviar mensagem de erro
      if (retorno.status === 500 || retorno.status === 400) {
        msgCamposVazio();
      } else {
        //faz o processo de cadastro
        retorno.json().then((retorno_convertido) => {
          //exibir notificação de sucesso
          msgCadastro();
          atualizaLista();
          //atualiza a página depois de um tempo
          setShowCadastrar(false);
        });
      }
    });
  };
  // metodo que capta o curso que foi selecionado
  const selecionarCurso = (
    id,
    valor,
    nome,
    objetivo,
    preRequisito,
    conteudoProgramatico,
    sigla,
    tipoAtendimento,
    nivel,
    cargaHoraria,
    area
  ) => {
    //setando os valores, que serão chamados na modal de alterar
    setId(id);
    setValor(valor);
    setNome(nome);
    setObjetivo(objetivo);
    setPreRequisito(preRequisito);
    setConteudoProgramtico(conteudoProgramatico);
    setSigla(sigla);
    setTipoAtendimento(tipoAtendimento);
    setNivel(nivel);
    setArea(area.id);
    setCargaHoraria(cargaHoraria);
  };

  const btnAlterar = {
    backgroundColor: "#caf0f8",
  };

  const btnExcluir = {
    backgroundColor: "#f9564f",
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  // metodo que atualiza a lista, puxando todos os curso da rest api
  const atualizaLista = async () => {
    const result = await fetch("http://localhost:8080/api/curso"); // await = espera uma promessa
    const resultado = await result.json();
    setCursos(resultado);
  };

  const [descricaoLog, setDescricaoLog] = useState()

  // metodo que deleta o curso
  const deletar = async (id) => {

    if(descricaoLog.length === 0 || descricaoLog === undefined){

      motivoExclusao()

  }else{

    let result = await fetch(`http://localhost:8080/api/curso/${id}`, {
      method: "DELETE",
      body: JSON.stringify(descricaoLog),
      headers: {
        "Authorization": token
      }
    });
    // caso exista um curso a ser deletado, ele atualiza a lista assim removendo o curso deletado
    if (result.status === 409) {
      msgDeletadoerror();

    } else if (result) {
      atualizaLista();
      msgExclusao();
    }
  }
  };

  // metodo que limpa os inputs do form
  const limparForm = () => {
    setId("");
    setValor("");
    setNome("");
    setObjetivo("");
    setPreRequisito("");
    setConteudoProgramtico("");
    setSigla("");
    setTipoAtendimento("");
    setNivel("");
    setArea("");
    setCargaHoraria("");
  };

  const mdTheme = createTheme();

  // metodo que busca um curso
  const buscaCurso = async (event) => {
    // valor que esta sendo digitado no input de pesquisa
    let key = event.target.value;


    // verifica se existe 'valor'
    if (key) {
      // fazendo uma requisição na api de buscar e passando a key
      let result = await fetch(
        "http://localhost:8080/api/curso/buscarCurso/", {
          
          method: "post",

          body: JSON.stringify(key),

          headers: {

            "Content-type": "application/json",

            Accept: "application/json",
        }
      }
      );
      // tranformando a promessa em json
      result = await result.json();


      // verifica se existe algum resultado
      if (result) {
        // setando os cursos que a api retornou de sua resposta de busca
        setCursos(result);
      }

      // caso não exista chave, atualiza a lista
    } else {
      atualizaLista();
    }
  };

  // toda vez que a modal é chamada, ela sera limpa e fechada
  const clearClose = () => {
    handleClose();
    limparForm();
  };

  // metodo de msg de cadastro efetuado com sucesso
  const msgCadastro = () => {
    toast.success("Curso Cadastrado com Sucesso", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "dark",
      // faz com que seja possivel arrastar
      draggable: true,
      progress: undefined,
    });
  };

  const msgCamposVazio = () => {
    toast.warn("Preencha os Campos Corretamente", {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "dark",
      // faz com que seja possivel arrastar
      draggable: true,
      progress: undefined,
    });
  };

  // metodo de msg de exclusão feita com sucesso
  const msgExclusao = () => {
    toast.success("Curso Removido com Sucesso", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "dark",
      // faz com que seja possivel arrastar
      draggable: true,
      progress: undefined,
    });
  };

  // metodo de msg de alteração feita com sucesso
  const msgAlteracao = () => {
    toast.success("Curso Alterado com Sucesso", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "dark",
      // faz com que seja possivel arrastar
      draggable: true,
      progress: undefined,
    });
  };

  const motivoExclusao = () => {
    toast.error("Por favor, informe o motivo da exclusão.", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "dark",
      draggable: true,
      progress: undefined,
    });
  };

  const motivoAlteracao = () => {
    toast.error("Por favor, informe o motivo da alteração.", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "dark",
      draggable: true,
      progress: undefined,
    });
  };


  function gerarFolderCurso() {
    let id = document.getElementById("selectFolder").value;

    window.location.href = "http://localhost:8080/api/folder/curso/" + id;
  }
  return (
    <>
      <MenuLateral />

      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          marginLeft: "300px",
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
          marginLeft: "90px",
        }}
      >
        <Toolbar />

        <div
          style={{
            margin: 0,
            position: "fixed",
            top: 0,
            left: "15%",
            width: "100%",
            height: "65px",
            backgroundColor: "rgb(0,0,0,0.0)",
          }}
        >
          <Tooltip title="Adicionar Curso" arrow placement="top-start">
            <Button
              variant="contained"
              color="primary"
              sx={{
                top: 13,
                marginLeft: "2vh",
                float: "left",
              }}
              onClick={() => abrirModalCadastrar()}
            >
              <i className="bi bi-plus-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-plus-lg"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                  />
                </svg>
              </i>
              NOVO
            </Button>
          </Tooltip>

          <section
            style={{
              display: "flex",
              flexDirection: "row",
              // backgroundColor:"cyan",
              width: 220,
              position: "absolute",
              left: "38%",
              float: "left",
              top: 6,
              padding: 10,
            }}
          >
            <input
              type="text"
              placeholder="Busque por um curso"
              onChange={buscaCurso}
              style={{
                width: 195,
                border: "none",
                borderBottom: "1px solid black",
                backgroundColor: "transparent",
                paddingLeft: 27,
              }}
            />
            <SearchIcon style={{ position: "absolute", top: 15, left: 7 }} />
          </section>
          <section className="sectFolder" style={{position:"relative", left:"10vh"}}>
          <select
        id="selectFolder"
        >
              <option>Selecione um curso para gerar o folder</option>
                    {cursos.map((obj) => (
                      <option value={obj.id}>{obj.nome}</option>
                    ))}
         </select>

        <button onClick={gerarFolderCurso} className="btnfolder"> GERAR </button>
          </section>
          
        </div>
        <TableContainer
          sx={{
            width: "85%",
            textAlign: "center",
            position: "fixed",
            left: "31.7vh",
            //backgroundColor:"gray",
            boxShadow: 0,
          }}
          component={Paper}
        >
          <Table size="medium" style={{ width: "100%" }}>
            <TableHead sx={{ backgroundColor: "#000814", height: "80px" }}>
              <TableRow>
                <TableCell sx={{ color: "#fff" }} align="left">
                  Nome
                </TableCell>
                <TableCell sx={{ color: "#fff" }} align="left">
                  Objetivo
                </TableCell>
                <TableCell sx={{ color: "#fff" }} align="left">
                  Pré Requisito
                </TableCell>
                <TableCell sx={{ color: "#fff" }} align="left">
                  Conteúdo Programático
                </TableCell>
                <TableCell sx={{ color: "#fff" }} align="center">
                  Sigla
                </TableCell>
                <TableCell sx={{ color: "#fff" }} align="left">
                  Tipo Atendimento
                </TableCell>
                <TableCell sx={{ color: "#fff" }} align="left">
                  Nível
                </TableCell>
                <TableCell sx={{ color: "#fff" }} align="left">
                  Carga Horaria
                </TableCell>
                <TableCell sx={{ color: "#fff" }} align="left">
                  Área
                </TableCell>
                <TableCell sx={{ color: "#fff" }} align="left">
                  Valor
                </TableCell>
                <TableCell sx={{ color: "#fff" }} align="left">
                  Alterar
                </TableCell>
                <TableCell sx={{ color: "#fff" }} align="left">
                  Excluir
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{}}>
              {cursos
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(
                  ({
                    id,
                    nome,
                    objetivo,
                    valor,
                    preRequisito,
                    conteudoProgramatico,
                    sigla,
                    tipoAtendimento,
                    nivel,
                    cargaHoraria,
                    area,
                  }) => (
                    <TableRow
                      hover
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                        cursor: "pointer",
                      }}
                    >
                      <TableCell
                        className="row"
                        align="left"
                        component="th"
                        scope="row"
                      >
                        {nome}
                      </TableCell>
                      <TableCell align="left" component="th" scope="row">
                        {objetivo}
                      </TableCell>
                      <TableCell align="left" component="th" scope="row">
                        {preRequisito}
                      </TableCell>
                      <TableCell align="left" component="th" scope="row">
                        {conteudoProgramatico}
                      </TableCell>
                      <TableCell align="left" component="th" scope="row">
                        {sigla}
                      </TableCell>
                      <TableCell align="left" component="th" scope="row">
                        {tipoAtendimento}
                      </TableCell>
                      <TableCell align="left" component="th" scope="row">
                        {nivel}
                      </TableCell>
                      <TableCell align="left" component="th" scope="row">
                        {cargaHoraria}
                      </TableCell>

                      <TableCell align="left">{area.nome}</TableCell>
                      <TableCell align="left" component="th" scope="row" s>
                        {valor}
                      </TableCell>
                      <Tooltip
                        sx={{ paddingTop: "10px" }}
                        title="Alterar"
                        arrow
                        placement="top-start"
                      >
                        <Fab
                          sx={{
                            marginLeft: "7px",
                            marginTop: "1.2em",
                            borderRadius: 2,
                            width: 60,
                            height: 10,
                            backgroundColor: "yellow",
                          }}
                          variant="circular"
                          onClick={() => {
                            selecionarCurso(
                              id,
                              valor,
                              nome,
                              objetivo,
                              preRequisito,
                              conteudoProgramatico,
                              sigla,
                              tipoAtendimento,
                              nivel,
                              cargaHoraria,
                              area
                            );
                            abrirModalAlterar();
                          }}
                          size="small"
                          aria-label="edit"
                        >
                          <img src={require("../curso/updateIcon.png")} />
                        </Fab>
                      </Tooltip>

                      <TableCell>
                        <Tooltip title="Deletar" arrow placement="top-start">
                          <Fab
                            sx={{
                              marginLeft: "7px",
                              borderRadius: 2,
                              width: 60,
                              height: 10,
                            }}
                            variant="circular"
                            onClick={() => {
                              abrirModalExcluir(id)
                            }}
                            size="small"
                            color="error"
                            aria-label="edit"
                          >
                            <DeleteIcon />
                          </Fab>
                        </Tooltip>
                        <Modal
                          show={modalExcluir}
                          onHide={fecharModalExcluir}
                          backdrop="static"
                          aria-labelledby="contained-modal-title-vcenter"
                          centered>


                          <Modal.Header closeButton className="bodyExcluir">
                            <Modal.Title className='tituloExcluir'>ALERTA!</Modal.Title>
                          </Modal.Header>
                          <form>
                          <Modal.Body>
                            <h4 className="textoExcluir">Tem Certeza que deseja excluir?</h4>
                            
                         
                            <TextField
                              id="outlined-multiline-static"
                             
                              label="Justificativa:"
                              hiddenLabel
                              required
                              className="textAreaExcluir"
                              multiline
                              rows={4}
                              value={descricaoLog}
                              onChange={(e) => {
                                setDescricaoLog(e.target.value)
                              }}
                              
                            />
                          </Modal.Body>


                          <Modal.Footer className="botaoModalExcluir">
                            <Button variant="contained" color="error" className="botaoModalSim" onClick={fecharModalExcluir}>
                              Não
                            </Button>
                            <Button variant="contained" color="success" onClick={() => {
                              //excluir a turma pelo id
                              deletar(idCurso)
                              
                            }}>
                              Sim
                            </Button>
                          </Modal.Footer>
                          </form>

                        </Modal>

                      </TableCell>
                    </TableRow>
                  )
                )}
            </TableBody>
          </Table>
          <TableFooter>
            <TableRow>
              <TablePagination
                SelectProps={{
                  inputProps: {
                    "aria-label": "Linhas Por Páginas",
                  },
                  native: true,
                }}
                sx={{
                  marginTop: "40px",
                  alignItems: "center",
                  textAlign: "center",
                }}
                rowsPerPageOptions={[3, 5, 10, 15]}
                component="div"
                colSpan={3}
                count={cursos.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </TableContainer>
      </Box>

      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Modal
        show={modalAlterar}
        onHide={fecharModalAlterar}
        size="xl"
        aria-labelledby="example-custom-modal-styling-title"
        scrollable={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Alterar</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ height: 610 }}>
          <div>
            <img
              className="imagemModal"
              src={require("./imagemModal.png")}
            ></img>
          </div>
          
          <div>
          <form
              style={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "nowrap",
                justifyContent: "center",
                width: "60%",
                height: "80%",
                position: "absolute",
                top: "-1em"
              }}
            >
              <section className="sectionComponents">
                <TextField
                  autoFocus
                  id="nome"
                  sx={styleTextField}
                  defaultValue={nome}
                  className="textField"
                  name="nome"
                  type="text"
                  label="Nome"
                  variant="outlined"
                />

                <TextField
                  autoFocus
                  id="objetivo"
                  defaultValue={objetivo}
                  sx={styleTextField}
                  className="textField"
                  name="objetivo"
                  type="text"
                  label="Objetivo"
                  variant="outlined"
                />
              </section>

              <section className="sectionComponents">
                <TextField
                  autoFocus
                  id="preRequisito"
                  defaultValue={preRequisito}
                  sx={styleTextField}
                  className="textField"
                  name="preRequisito"
                  type="text"
                  label="Pré requisito"
                  variant="outlined"
                />
                <TextField
                  autoFocus
                  id="valor"
                  sx={styleTextField}
                  defaultValue={valor}
                  className="textField"
                  name="valor"
                  type="number"
                  label="Valor"
                  variant="outlined"
                />

              </section>

              <section className="sectionComponents">
                <TextField
                  autoFocus
                  id="cargaHoraria"
                  defaultValue={cargaHoraria}
                  sx={styleTextField}
                  className="textField"
                  name="cargaHoraria"
                  type="number"
                  label="Carga Horaria"
                  variant="outlined"
                />


                <TextField
                  name="conteudoProgramatico"
                  id="conteudoProgramatico"
                  label="Conteúdo programático"
                  multiline
                  defaultValue={conteudoProgramatico}
                  sx={styleTextFieldConteudoProg}
                  rows={4}
                />

                <TextField
                  id="justificativa"
                  name="justificativa"
                  label="justifique sua alteração"
                  multiline
                  sx={styleTextFieldConteudoProgAlt}
                  rows={4}
                />

              </section>
              
              <section className="sectionComponentsSelect" style={{
                position: "absolute",
                top: "15.5em",
                left: "0.5em",
               
              }}>

                <InputLabel id="demo-simple-select-label">Tipo Área</InputLabel>
                <select id="area" style={styleSelect} className="form-control">
                  <option>Selecione:</option>

                  {tipoArea.map((obj) => (
                    <option selected={area === obj.id} value={obj.id}>
                      {obj.nome}
                    </option>
                  ))}
                </select>

                <InputLabel id="demo-simple-select-label">
                  Tipo Atendimento
                </InputLabel>

                <select
                  defaultValue={tipoAtendimento}
                  id="tipoAtendimento"
                  style={styleSelect}
                  className="form-control"
                >
                  <option>Selecione:</option>

                  {tipoAtendimentos.map((obj) => (
                    <option key={obj}>{obj}</option>
                  ))}
                </select>

              <InputLabel id="demo-simple-select-label">Nivel</InputLabel>

              <select
                  id="nivel"
                  style={styleSelect}
                  className="form-control"
                  defaultValue={nivel}
                >
                  <option>Selecione:</option>

                  {niveis.map((obj) => (
                    <option key={obj}>{obj}</option>
                  ))}
                </select>

              </section>

              <div
                style={{ position: "absolute", top: "33em" }}
              >
                <Button
                  variant="contained"
                  style={btnCad}
                  onClick={() => {
                    alterar(id);
                  }}
                >
                  <CreateIcon
                    sx={{
                      color: "#ffff",
                      width: "100",
                      border: "none",
                      marginRight: "10px",
                    }}
                  />
                  Alterar
                </Button>


                <Button
                  variant="contained"
                  color="error"
                  style={btnClose}
                  onClick={() => {
                    limparForm();
                    fecharModalAlterar();
                  }}
                >
                  <CancelPresentationIcon sx={{ marginRight: "10px" }} />
                  Fechar
                </Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={modalCadastrar}
        onHide={fecharModalCadastrar}
        size="xl"
        aria-labelledby="example-custom-modal-styling-title"
        scrollable={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ height: 610 }}>
          <div>
            <img
              className="imagemModal"
              src={require("./imagemModal.png")}
            ></img>
          </div>
          <div>
            <form
              onSubmit={cadastrar}
              style={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "nowrap",
                justifyContent: "center",
                width: "60%",
                height: "80%",
                position: "absolute",
                top: "-6em"
              }}
            >
              <section className="sectionComponents">
                <TextField
                  autoFocus
                  id="nomeCad"
                  sx={styleTextField}
                  className="textField"
                  name="nome"
                  type="text"
                  label="Nome"
                  variant="outlined"
                />

                <TextField
                  autoFocus
                  id="objetivoCad"
                  sx={styleTextField}
                  className="textField"
                  name="objetivo"
                  type="text"
                  label="Objetivo"
                  variant="outlined"
                />
              </section>

              <section className="sectionComponents">
                <TextField
                  autoFocus
                  id="preRequisitoCad"
                  sx={styleTextField}
                  className="textField"
                  name="preRequisito"
                  type="text"
                  label="Pré requisito"
                  variant="outlined"
                />
                <TextField
                  autoFocus
                  id="valorCad"
                  sx={styleTextField}
                  className="textField"
                  name="valor"
                  type="number"
                  label="Valor"
                  variant="outlined"
                />

              </section>

              <section className="sectionComponents">
                <TextField
                  autoFocus
                  id="cargaHorariaCad"
                  sx={styleTextField}
                  className="textField"
                  name="cargaHoraria"
                  type="number"
                  label="Carga Horaria"
                  variant="outlined"
                />


                <TextField
                  id="outlined-multiline-static"
                  name="conteudoProgramatico"
                  label="Conteúdo programático"
                  multiline
                  sx={styleTextFieldConteudoProg}
                  rows={4}

                />
              </section>
              
              <section className="sectionComponentsSelect" style={{
                position: "absolute",
                top: "21em",
                left: "0.5em",
               
              }}>

                <InputLabel id="demo-simple-select-label">Tipo Área</InputLabel>
                <select
                  id="areaCad"
                  style={styleSelect}
                  name="area"
                  required
                  className="form-control"
                >
                  <option>Selecione:</option>

                  {tipoArea.map((obj) => (
                    <option value={obj.id}>{obj.nome}</option>
                  ))}
                </select>
                <InputLabel id="demo-simple-select-label">
                  Tipo Atendimento
                </InputLabel>
                <select
                  id="tipoAtendimentoCad"
                  style={styleSelect}
                  name="tipoAtendimento"
                  required
                  className="form-control"
                >
                  <option>Selecione:</option>

                  {tipoAtendimentos.map((obj) => (
                    <option key={obj}>{obj}</option>
                  ))}
                </select>

              <InputLabel id="demo-simple-select-label">Nivel</InputLabel>

              <select
                id="nivelCad"
                style={styleSelect}
                name="nivel"
                required
                className="form-control"
              >
                <option>Selecione:</option>

                {niveis.map((obj) => (
                  <option key={obj}>{obj}</option>
                ))}
              </select>

              </section>

              <div
                style={{ position: "absolute", top: "39em" }}
              >
                <Button
                  variant="contained"
                  color="success"
                  //onClick={() => cadastrar(objTurma.id)}
                  type="submit"
                >
                  cadastrar
                </Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

const imgStyle = {
  border: "none",
  width: "400px",
  height: "400px",
  margin: "50px auto",
  position: "center",
};

const styleTextField = {
  margin: 1,
  backgroundColor: "trans",
};

const styleTextFieldConteudoProg = {
  margin: 1,
  backgroundColor: "trans",
  width: 227

}

const styleTextFieldConteudoProgAlt = {
  margin: 1,
  backgroundColor: "trans",
  width: 227,
  marginLeft: "15.5em"
}

const styleSelect = {
  width: "123.5%",
  height: "3em",
  marginBottom: "30px",
};

const styleSelect2 = {
  width: "34.3%",
  height: "3em",
  marginBottom: "30px",
};

const styleTitle = {
  textAlign: "center",
  marginBottom: "30px",
  color: "blue",
};

const titleModal = {
  color: "#000814",
  marginBottom: "65px",
  boxShadow: 24,
};
const btnCad = {
  marginTop: "20px",
  borderRadius: "10px",
  color: "#ffff",
  backgroundColor: "#000814",
};

const btnClose = {
  marginTop: "20px",
  marginLeft: "20px",
  borderRadius: "10px",
  color: "#ffff",
  backgroundColor: "#f25c54",
};

const imgLogo = {
  width: "200px",
  borderRadius: "20px",
};

const style = {
  position: "absolute",
  top: "50%",
  display: "block",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  height: "100%",
  bgcolor: "background.paper",
  borderRadius: "37px",
  border: "3px solid #8d99ae",
  boxShadow: 240,
  p: 4,
};
export default ListaCurso;
