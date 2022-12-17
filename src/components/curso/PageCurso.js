import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableFooter from "@mui/material/TableFooter";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
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
import "./styles.css"
import Folder from "./folder";
import { makeStyles } from "@material-ui/core";
import { Chip, InputAdornment } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import FolderIcon from '@mui/icons-material/Folder';
import Load from "../load";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";

const tema = createTheme({
  palette: {
    primary: {
      main: "#DADADA"
    }
  }
})

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: tema.palette.primary.main,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const drawerWidth = 240;

const styles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const msgWarning = () => {
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

const ListaCurso = () => {
  //  USE ESTATE USADO PARA CONTROLAR O ESTADO DE UMA VARIAVEL
  // estado da modal
  const [openModal, setOpenModal] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [modalAlt, setModalAlt] = useState(false);
  const [niveis, setNiveis] = useState([]);

  const classes = useStyles();
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

  const [tipoAtendOrdinal, setTipoAtendOrdinal] = useState();
  const [nivelOrdinal, setNivelOrdinal] = useState();

  const [removeLoad, setRemoveLoad] = useState(false)

  const [idCurso, setIdCurso] = useState()

  const [modalAlterar, setShow] = useState(false);

  const [modalCadastrar, setShowCadastrar] = useState(false);

  const [modalExcluir, setShowExcluir] = useState(false);

  const abrirModalExcluir = (id) => {
    setShowExcluir(true)
    setIdCurso(id)

  };

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
    setTimeout(() => {


      fetch("http://localhost:8080/api/curso")
        .then((resp) => resp.json())
        .then((retorno_convertido) => setCursos(retorno_convertido)); //lista de cursos

      setRemoveLoad(true)
    }, 500  )
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

    if (justificativa === "") {

      motivoAlteracao()

    } else {



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
      const resultado = await fetch("http://localhost:8080/api/curso/" + id, {
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
  const cadastrar = async (event) => {
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

          //atualiza a página depois de um tempo
          setShowCadastrar(false);
          atualizaLista();

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
    area,
    tipoAtendOrdinal,
    nivelOrdinal
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
    setCargaHoraria(cargaHoraria);
    setArea(area.id);
    setTipoAtendOrdinal(tipoAtendOrdinal)
    setNivelOrdinal(nivelOrdinal)

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

    if (descricaoLog.length === 0 || descricaoLog === undefined) {

      motivoExclusao()

    } else {

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

  const [openfol, setOpenFol] = React.useState(false);
  const handleOpenFol = () => setOpenFol(true);
  const handleCloseFol = () => setOpenFol(false);
  return (
    <>
      <MenuLateral />

      <Box sx={{ display: "flex", marginLeft: "40px" }}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >

          <Toolbar />

          <Button
            style={{ margin: 10, fontWeight: "bold", backgroundColor: "black", borderRadius: "2em" }}
            variant="contained"
            size="large"
            onClick={() => abrirModalCadastrar()}
            className={classes.button, "botaoTarefaTurma"}
            startIcon={<AssignmentIcon />}
          >
            Novo
          </Button>

          <TextField
            fullWidth
            onChange={buscaCurso}
            style={{ marginBottom: 25, width: "37em", marginLeft: "5em" }}
            label="buscar Cursos"
            id="fullWidth"
            type="curso"
            name="parametro"
            required="required"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),

              inputMode: "email",
            }}
          />
          <Folder />

          <TableContainer component={Paper} >
            <Table size="medium"  sx={{width:2000}}>
              <TableHead sx={{ backgroundColor: "#000814", height: "80px" }}>
                <TableRow>
                <TableCell sx={{ color: "#fff" }} align="center" width={100}>
                    Sigla
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }} align="left" width={100} >
                    Nome
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }} align="left" width={100}>
                    Objetivo
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }} align="left" width={100}>
                    Pré Requisito
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }} align="left" width={100}>
                    Conteúdo Programático
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }} align="left" width={100}>
                    Tipo Atendimento
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }} align="left" width={100}>
                    Nível
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }} align="left" width={100}>
                    Carga Horaria
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }} align="left" width={100}>
                    Área
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }} align="left" width={100}>
                    Valor
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }} align="left" width={100}>
                    Alterar
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }} align="left" width={100}>
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
                      valor,
                      nome,
                      objetivo,
                      preRequisito,
                      conteudoProgramatico,
                      sigla,
                      tipoAtendimento,
                      nivel,
                      cargaHoraria,
                      area,
                      tipoAtendOrdinal,
                      nivelOrdinal,
                      tipoAtendString,
                      nivelString,


                    }) => (
                      <StyledTableRow
                        hover
                        sx={{
                          "&:last-child td, &:last-child th": {
                            border: 0,

                          },
                          cursor: "pointer",
                        }}
                      >
                         <TableCell align="left" component="th" scope="row" width={10}>
                        <Chip label={sigla} style={{backgroundColor: "#171119", color: "white" }}/>
                        </TableCell>

                        <TableCell
                          className="row"
                          align="left"
                          component="th"
                          scope="row"
                        >
                          {nome}
                        </TableCell>
                        <TableCell align="left" component="th" scope="row" width={10}>
                          <textarea className="txtArea" value={objetivo} disabled></textarea>
                        </TableCell>
                        <TableCell align="left" component="th" scope="row" width={10}>
                          <textarea disabled className="txtArea" value={preRequisito} ></textarea>
                        </TableCell>
                        <TableCell align="left" component="th" scope="row" width={10}>
                          <textarea disabled className="txtArea" value={conteudoProgramatico} ></textarea>
                        </TableCell>
                       
                        <TableCell align="left" component="th" scope="row" width={10}>
                          {tipoAtendString}
                        </TableCell>
                        <TableCell align="left" component="th" scope="row" width={10}>
                          {nivelString}
                        </TableCell>
                        <TableCell align="left" component="th" scope="row" width={10}>
                          {cargaHoraria}
                        </TableCell>

                        <TableCell align="left">{area.nome}</TableCell>
                        <TableCell align="left" component="th" scope="row">
                        <Chip label= {valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                         style={{backgroundColor: "#008000", color: "white" }}/>
                         
                        </TableCell>
                        <Tooltip
                          sx={{ paddingTop: "10px" }}
                          title="Alterar"
                          arrow
                          placement="top-start"
                        >
                          <Fab
                            sx={{
                              marginLeft: "2vh",
                              marginTop: "5vh",
                              borderRadius: 80,
                              width: 50,
                              height: 30,
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
                                area,
                                tipoAtendOrdinal,
                                nivelOrdinal

                              );
                              abrirModalAlterar();
                            }}
                            size="small"
                            aria-label="edit"
                          >
                            <ModeEditOutlinedIcon/>
                          </Fab>
                        </Tooltip>

                        <TableCell>
                          <Tooltip title="Deletar" arrow placement="top-start">
                            <Fab
                              sx={{
                                marginLeft: "7px",
                                borderRadius: 80,
                                width: 50,
                                backgroundColor: "red",
                                height: 30,
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



                              <Modal.Footer className="botaoModalExcluir">
                                <Button variant="contained" color="error" className="botaoModalSim" onClick={fecharModalExcluir}>
                                  Não
                                </Button>
                                <Button variant="contained" color="success" onClick={() => {
                                  //excluir a turma pelo id
                                  deletar(idCurso)
                                  setShowExcluir(false)
                                  setDescricaoLog("")

                                }}>
                                  Sim
                                </Button>
                              </Modal.Footer>
                            </form>

                          </Modal>

                        </TableCell>
                      </StyledTableRow>
                    )
                  )}
              </TableBody>
              {!removeLoad && <Load />}
            </Table>
            <TablePagination
              sx={{
                marginTop: "40px",

                alignItems: "center",

                textAlign: "center",
              }}
              rowsPerPageOptions={[3, 5, 10, 15]}
              component="div"
              count={cursos.length}
              labelRowsPerPage='Linhas por páginas'
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Box>
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

        <Modal.Body>
          <div>
            <img
              className="imagemModalAltCurso"
              src={require("../../imagens/altCurso.png")}
            ></img>
          </div>

          <form>
            <div className="divGlobalFormAltCurso">
              <div className="sectionModalAltCurso1">
                <TextField
                  autoFocus
                  required
                  id="nome"
                  defaultValue={nome}
                  className="inputAlterarCurso"
                  name="nome"
                  type="text"
                  label="Nome"
                  variant="outlined"
                />
                <TextField
                  autoFocus
                  required
                  id="valor"
                  defaultValue={valor}
                  name="valor"
                  type="number"
                  label="Valor"
                  variant="outlined"
                  className="inputAlterarCurso"
                />

                <TextField
                  autoFocus
                  required
                  className="inputAlterarCurso"
                  id="cargaHoraria"
                  defaultValue={cargaHoraria}
                  name="cargaHoraria"
                  type="number"
                  label="Carga Horaria"
                  variant="outlined"
                />

                <InputLabel className="labelInput" id="demo-simple-select-label">Tipo Área</InputLabel>
                <select required id="area" className="form-control">
                  <option>Selecione:</option>

                  {tipoArea.map((obj) => (
                    <option selected={area === obj.id} value={obj.id}>
                      {obj.nome}
                    </option>
                  ))}
                </select>


                <InputLabel className="labelInput" id="demo-simple-select-label">
                  Tipo Atendimento
                </InputLabel>

                <select
                  required
                  id="tipoAtendimento"
                  className="form-control"
                  defaultValue={tipoAtendOrdinal}
                >
                  <option>Selecione:</option>

                  {tipoAtendimentos.map((obj, indice) => (

                    <option value={indice} key={obj}>{obj}</option>
                  ))}
                </select>

                <InputLabel className="labelInput" id="demo-simple-select-label">Nivel</InputLabel>

                <select
                  required
                  id="nivel"
                  className="form-control"
                  defaultValue={nivelOrdinal}
                >
                  <option>Selecione:</option>

                  {niveis.map((obj, indice) => (
                    <option value={indice} key={obj}>{obj}</option>
                  ))}
                </select>

                <TextField
                  id="objetivo"
                  className="textAreaCurso"
                  name="objetivo"
                  defaultValue={objetivo}
                  sx={{ width: 200 }}
                  label="Objetivo"
                  multiline
                  rows={4}
                />

              </div>

              <div className="sectionModalAltCurso2">

                <TextField
                  name="conteudoProgramatico"
                  id="conteudoProgramatico"
                  defaultValue={conteudoProgramatico}
                  label="Conteúdo programático"
                  required
                  multiline
                  style={{ width: "150%" }}
                  rows={4}
                />

                <TextField
                  id="justificativa"
                  className="textAreaCurso"
                  name="justificativa"
                  label="justifique sua alteração"
                  multiline
                  rows={4}
                />

                <TextField
                  autoFocus
                  required
                  id="preRequisito"
                  defaultValue={preRequisito}
                  multiline
                  rows={4}
                  className="textAreaCurso"
                  name="preRequisito"
                  type="text"
                  label="Pré requisito"
                  variant="outlined"
                />

              </div>
            </div>

            <div>
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
              src={require("../../imagens/cadCurso.png")}
            ></img>
          </div>
          <div>
            <form onSubmit={cadastrar}>
              <div className="divGlobalFormAltCurso">
                <div className="sectionModalAltCurso1">
                  <TextField
                    autoFocus
                    required
                    id="nome"

                    className="inputAlterarCurso"
                    name="nome"
                    type="text"
                    label="Nome"
                    variant="outlined"
                  />
                  <TextField
                    autoFocus
                    required
                    id="valor"

                    name="valor"
                    type="number"
                    label="Valor"
                    variant="outlined"
                    className="inputAlterarCurso"
                  />
                  <TextField
                    autoFocus
                    required
                    className="inputAlterarCurso"
                    id="cargaHoraria"

                    name="cargaHoraria"
                    type="number"
                    label="Carga Horaria"
                    variant="outlined"
                  />

                  <InputLabel className="labelInput" id="demo-simple-select-label">Tipo Área</InputLabel>
                  <select required id="area" className="form-control" name="area">
                    <option>Selecione:</option>

                    {tipoArea.map((obj) => (
                      <option value={obj.id}>
                        {obj.nome}
                      </option>
                    ))}
                  </select>


                  <InputLabel className="labelInput" id="demo-simple-select-label">
                    Tipo Atendimento
                  </InputLabel>

                  <select
                    required
                    id="tipoAtendimento"
                    className="form-control"
                    name="tipoAtendimento"
                  >
                    <option>Selecione:</option>

                    {tipoAtendimentos.map((obj, indice) => (

                      <option value={indice} key={obj}>{obj}</option>
                    ))}
                  </select>

                  <InputLabel className="labelInput" id="demo-simple-select-label">Nivel</InputLabel>

                  <select
                    required
                    id="nivel"
                    className="form-control"
                    name="nivel"
                  >
                    <option>Selecione:</option>

                    {niveis.map((obj, indice) => (
                      <option value={indice} key={obj}>{obj}</option>
                    ))}
                  </select>

                </div>

                <div className="sectionModalAltCurso2">

                  <TextField
                    name="conteudoProgramatico"
                    id="conteudoProgramatico"

                    label="Conteúdo programático"
                    required
                    multiline
                    style={{ width: "150%" }}
                    rows={4}
                  />

                  <TextField
                    id="objetivo"
                    className="textAreaCurso"
                    name="objetivo"
                    label="Objetivo"
                    multiline
                    rows={4}
                  />

                  <TextField
                    autoFocus
                    required
                    id="preRequisito"

                    multiline
                    rows={4}
                    className="textAreaCurso"
                    name="preRequisito"
                    type="text"
                    label="Pré requisito"
                    variant="outlined"
                  />

                </div>
              </div>

              <div>
                <Button

                  type="submit"
                  variant="contained"
                  style={btnCad}
                >
                  <CreateIcon
                    sx={{
                      color: "#ffff",
                      width: "100",
                      border: "none",
                      marginRight: "10px",
                    }}
                  />
                  Cadastrar
                </Button>


                <Button
                  variant="contained"
                  color="error"
                  style={btnClose}
                  onClick={() => {
                    limparForm();
                    fecharModalCadastrar();
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
        open={openfol}
        onClose={handleCloseFol}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles}>
          teste de mmodal
        </Box>
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
  width: 227,
  position: "relative",
  top: "-4em",

}




const styleTextFieldPreReq = {
  margin: 1,
  backgroundColor: "trans",
  width: 220,
}

const styleTextFieldConteudoProgAlt = {
  margin: 1,
  backgroundColor: "trans",
  width: 220,
}

const styleTextFieldJustificativa = {
  margin: 1,
  backgroundColor: "trans",
  width: 227,
  marginLeft: "15.5em"
}

const styleSelect = {
  width: "146.8%",
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

const btnCad2 = {
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

const btnClose2 = {
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