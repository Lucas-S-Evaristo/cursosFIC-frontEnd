import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EmailIcon from "@mui/icons-material/Email";
import InputAdornment from "@mui/material/InputAdornment";
import Table from "@mui/material/Table";
import HttpsIcon from "@mui/icons-material/Https";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import List from "@mui/material/List";
import { toast, ToastContainer, cssTransition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CreateIcon from "@mui/icons-material/Create";
import SaveIcon from "@mui/icons-material/Save";
import Toolbar from "@mui/material/Toolbar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import PeopleIcon from "@mui/icons-material/People";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import LayersIcon from "@mui/icons-material/Layers";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import AdbIcon from "@mui/icons-material/Adb";
import TextField from "@mui/material/TextField";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import Box from "@mui/material/Box";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import InputLabel from "@mui/material/InputLabel";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import BadgeIcon from "@mui/icons-material/Badge";
import MenuLateral from "./Menu";

function ListaCurso() {
  

  //  USE ESTATE USADO PARA CONTROLAR O ESTADO DE UMA VARIAVEL
  // estado da modal
  const [openModal, setOpenModal] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [modalAlt, setModalAlt] = useState(false);
  const [niveis, setNiveis] = useState([])  // estado do obj do ususario
  
  // metodo que abre a modal
  const handleOpen = () => setOpenModal(true);
  // metodo que fecha a modal
  const handleClose = () => setOpenModal(false);
  // variavel que tem acesso a um array com todos os usuarios
  const [cursos, setCursos] = useState([]);
  // variavel que tem acesso a um array com todos os tipos de usuarios
  const [tipoArea, setTipoArea] = useState([]);
  const [open, setOpen] = useState(false);
  const [tipoAtendimentos, setTipoAtendimentos] = useState([])
  const [id, setId] = useState();
  const [nome, setNome] = useState();
  const [objetivo, setObjetivo] = useState();
  const [preRequisito, setPreRequisito] = useState();
  const [conteudoProgramatico, setConteudoProgramtico] = useState();
  const [sigla, setSigla] = useState();
  const [tipoAtendimento, setTipoAtendimento] = useState([]);
  const [nivel, setNivel] = useState([]);
  const [cargaHoraria, setCargaHoraria] = useState();
  const [area, setArea] = useState();

  const [idArea, setIdArea] = useState()

  const curso = {
    id: 0,
    nome: nome,
    objetivo: objetivo,
    preRequisito: preRequisito,
    conteudoProgramatico: conteudoProgramatico,
    sigla: sigla,
    tipoAtendimento: tipoAtendimento,
    nivel: nivel,
    cargaHoraria: cargaHoraria,
    area: {
      id: idArea
    }
  }

  const [objCurso, setObjCurso] = useState(curso);


  // metodo que captura informações do input
  const capturarDados = (e) => {
    console.log(e.target.value);
    setObjCurso({ ...objCurso, [e.target.name]: e.target.value });
    console.log(objCurso);
  };

  const handleChangePage = (event, newPage) => {
    console.log("EVENTO" + event);
    console.log("PAGINA" + newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // REQUISIÇÃO GET PARA PUXAR TODOS OS USUARIOS
  useEffect(() => {
    fetch("http://localhost:8080/api/curso")
      .then((resp) => resp.json())
      .then((retorno_convertido) => setCursos(retorno_convertido)); //lista de usuários
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/enum/nivel")
      .then((resp) => resp.json())
      .then((retorno_convertido) => setNiveis(retorno_convertido)); //lista de usuários
  }, []);


  // REQUISIÇÃO GET PARA PUXAR TODOS OS TIPOS DE USUARIOS
  useEffect(() => {
    fetch("http://localhost:8080/api/area")
      .then((resp) => resp.json())
      .then((retorno_convertido) => setTipoArea(retorno_convertido)); //lista de usuários
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/enum/tipoAtendimento")
      .then((resp) => resp.json())
      .then((retorno_convertido) => setTipoAtendimentos(retorno_convertido)); //lista de usuários
  }, []);


  const post = (e) => {
  
    console.log(e.target)
    setObjCurso({ ...objCurso, [e.target.name]: e.target.value })
  }


  // função que espera receber um id
  const alterar = async (id) => {
    // pegando os valores dos inputs
    let nome = document.getElementById("nome").value;
    let objetivo = document.getElementById("objetivo").value;
    let preRequisito = document.getElementById("preRequisito").value;
    let conteudoProgramatico = document.getElementById("conteudoProgramatico").value;
    let sigla = document.getElementById("sigla").value;
    let tipoAtendimento = document.getElementById("tipoAtendimento").value;
    let nivel = document.getElementById("nivel").value;
    let area = document.getElementById("area").value;

    //montando um json com os valores
    const usuarioAlt = {
      id: id,
      nome: nome,
      objetivo: objetivo,
      preRequisito: preRequisito,
      conteudoProgramatico: conteudoProgramatico,
      sigla: sigla,
      tipoAtendimento: tipoAtendimento,
      nivel:nivel,
      area:area
    };

    // requisição ao back-end
    let resultado = await fetch("http://localhost:8080/api/curso/" + id, {
      method: "PUT",
      body: JSON.stringify(usuarioAlt),
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    });

    /* if (resultado.status === 409) {
      msgEmailExistente();
      document.getElementById("email").value = "";
      document.getElementById("email").focus();
    }

    if (resultado.status === 510) {
      msgNifExistente();
      document.getElementById("nif").value = "";
      document.getElementById("nif").focus();
    }*/

    // verifica se existe resultado

    if (resultado.status === 200) {
      // atualiza a lista com o usuario alterado
      atualizaLista();
      // fecha a modal de alterar
      setModalAlt(false);
      // exibe a msg de alteração concluida
      msgAlteracao();
    }
  };

  // metodo que efetua o cadastro do usuario
  const cadastrar = () => {
    fetch("http://localhost:8080/api/curso", {
      method: "post",
      body: JSON.stringify(curso),
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    }).then((retorno) => {
      //se o input estiver vazio, passar uma resposta de erro e enviar mensagem de erro
      if (retorno.status === 500 || retorno.status === 400) {
        msgCamposVazio();

        // se existir um email existente
      
      } else {
        //faz o processo de cadastro
        retorno.json().then((retorno_convertido) => {
          //exibir notificação de sucesso
          msgCadastro();
          atualizaLista();
          //atualiza a página depois de um tempo
          setOpenModal(false);
        });
      }
    });
  };
  // metodo que capta o usuario que foi selecionado
  const selecionarCurso = (id, nome, objetivo, preRequisito, conteudoProgramatico, sigla, tipoAtendimento, nivel, cargaHoraria, area) => {
    setId(id);
    setNome(nome);
    setObjetivo(objetivo)
    setPreRequisito(preRequisito);
    setConteudoProgramtico(conteudoProgramatico);
    setSigla(sigla);
    setTipoAtendimento(tipoAtendimento)
    setNivel(nivel)
    setArea(area)
    setCargaHoraria(cargaHoraria)
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

  // metodo que atualiza a lista, puxando todos os usuarios da rest api
  const atualizaLista = async () => {
    const result = await fetch("http://localhost:8080/api/curso"); // await = espera uma promessa
    const resultado = await result.json();
    setCursos(resultado);
  };

  // metodo que deleta o usuario
  const deletar = async (id) => {
    let result = await fetch(`http://localhost:8080/api/curso/${id}`, {
      method: "DELETE",
    });
    // caso exista um usuario a ser deletado, ele atualiza a lista assim removendo o usuario deletado
    if (result) {
      atualizaLista();
      msgExclusao();
    }
  };

  // metodo que limpa os inputs do form
  const limparForm = () => {
    setObjCurso("");
  };



  const mdTheme = createTheme();

  // metodo que busca um usuario
  const buscaCurso = async (event) => {
    // valor que esta sendo digitado no input de pesquisa
    let key = event.target.value;
    console.log(key);

    // verifica se existe 'valor'
    if (key) {
      // fazendo uma requisição na api de buscar e passando a key
      let result = await fetch(
        "http://localhost:8080/api/curso/buscar/" + key
      );
      // tranformando a promessa em json
      result = await result.json();
      console.log(result);

      // verifica se existe algum resultado
      if (result) {
        // setando os usuarios que a api retornou de sua resposta de busca
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
    toast.success("Usuário Cadastrado com Sucesso", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "colored",
      // faz com que seja possivel arrastar
      draggable: true,
      progress: undefined,
    });
  };

  // registros duplicados
  const msgEmailDuplicados = () => {
    toast.error("Email ja esta associado a um usuario", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "colored",
      // faz com que seja possivel arrastar
      draggable: true,
      progress: undefined,
    });
  };

  const msgNifDuplicados = () => {
    toast.error("Nif ja esta associado a um usuario", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "colored",
      // faz com que seja possivel arrastar
      draggable: true,
      progress: undefined,
    });
  };

  const msgCamposVazio = () => {
    toast.warn("Preencha os Campos Corretamente", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "colored",
      // faz com que seja possivel arrastar
      draggable: true,
      progress: undefined,
    });
  };

  // metodo de msg de exclusão feita com sucesso
  const msgExclusao = () => {
    toast.error("Usuário Removido com Sucesso", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "light",
      // faz com que seja possivel arrastar
      draggable: true,
      progress: undefined,
    });
  };

  // metodo de msg de alteração feita com sucesso
  const msgAlteracao = () => {
    toast.info("Usuário Alterado com Sucesso", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "light",
      // faz com que seja possivel arrastar
      draggable: true,
      progress: undefined,
    });
  };

  const msgEmailExistente = () => {
    toast.info("Email já está associado a um Usuario", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "light",
      // faz com que seja possivel arrastar
      draggable: true,
      progress: undefined,
    });
  };

  const msgNifExistente = () => {
    toast.info("Nif ja está associado a um Usuário", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "light",
      // faz com que seja possivel arrastar
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>

    <MenuLateral/>

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
        }}
      >
        <Toolbar />

        <div
          style={{
            display: "block",
            justifyContent: "initial",
            width: "1500px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Tooltip title="Adicionar Usuário" arrow placement="top-start">
            <Button
              variant="outlined"
              color="primary"
              sx={{
                marginLeft: "300px",
                float: "right",
              }}
              onClick={() => setOpenModal(true)}
            >
              <PersonAddIcon sx={{ marginRight: "7px" }}></PersonAddIcon>
              NOVO CURSO
            </Button>
          </Tooltip>

          <TextField
            required="true"
            inputProps={{
              maxLength: 20,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              inputMode: "email",
            }}
            size="medium"
            sx={{
              marginBottom: "20px",
              width: "500px",
              position: "relative",
              left: "30em",
            }}
            type="text"
            label="Busque por Um cURSO"
            onChange={buscaCurso}
            variant="outlined"
          >
            <SearchIcon />
          </TextField>
        </div>
        <TableContainer
          sx={{
            width: "1500px",
            textAlign: "center",
            marginLeft: "20em",
            margin: "auto",
          }}
          component={Paper}
        >
          <Table size="medium">
            <TableHead sx={{ backgroundColor: "#000814" }}>
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
                  Conteudo Programático
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
                  Ações
                </TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {cursos
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(({ id, nome, objetivo, preRequisito, conteudoProgramatico, sigla, tipoAtendimento, nivel, cargaHoraria, area }) => (
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

                    <TableCell align="left">
                      <Stack direction="row" spacing={1}>
                        <Chip
                          variant="outlined"
                          sx={{
                            backgroundColor: "#212529",
                            color: "#fff",
                          }}
                          label={area.nome}
                        />
                      </Stack>
                    </TableCell>
                    <Tooltip
                      sx={{ paddingTop: "10px" }}
                      title="Alterar"
                      arrow
                      placement="top-start"
                    >
                      <Fab
                        sx={{ marginLeft: "7px" }}
                        variant="circular"
                        onClick={() => {
                          selecionarCurso(
                            id, nome, objetivo, preRequisito, conteudoProgramatico, sigla, tipoAtendimento, nivel, cargaHoraria, area
                          );
                          setModalAlt(true);
                        }}
                        size="small"
                        color="warning"
                        aria-label="edit"
                      >
                        <EditIcon />
                      </Fab>
                    </Tooltip>
                    <Tooltip title="Deletar" arrow placement="top-start">
                      <Fab
                        sx={{ marginLeft: "7px" }}
                        variant="circular"
                        onClick={() => {
                          deletar(id);
                        }}
                        size="small"
                        color="error"
                        aria-label="edit"
                      >
                        <DeleteIcon />
                      </Fab>
                    </Tooltip>
                  </TableRow>
                ))}
            </TableBody>
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
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>

      <ToastContainer
        position="top-right"
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
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        closeAfterTransition
        open={openModal}
        onClose={clearClose}
        disableEnforceFocus
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Fade in={openModal}>
          <Box sx={style}>
            <form>
              <div>
                <h2 style={titleModal}>ADICIONAR CURSO</h2>
                <TextField
                  autoFocus
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountBoxIcon sx={{ color: "#000814" }} />
                      </InputAdornment>
                    ),
                  }}
                  id="nome"
                  sx={styleTextField}
                  className="textField"
                  onChange={(e) =>{ setNome(e.target.value)}}
                  name="nome"
                  type="text"
                  label="NOME"
                  variant="outlined"
                  value={nome}
                />
                <TextField
                  autoFocus
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountBoxIcon sx={{ color: "#000814" }} />
                      </InputAdornment>
                    ),
                  }}
                  id="objetivo"
                  sx={styleTextField}
                  className="textField"
                  onChange={(e) =>{ setObjetivo(e.target.value)}}
                  name="objetivo"
                  type="text"
                  label="OBJETIVO"
                  variant="outlined"
                  value={objetivo}
                />
                <TextField
                  autoFocus
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountBoxIcon sx={{ color: "#000814" }} />
                      </InputAdornment>
                    ),
                  }}
                  id="preRequisito"
                  sx={styleTextField}
                  className="textField"
                  onChange={(e) =>{ setPreRequisito(e.target.value)}}
                  name="preRequisito"
                  type="text"
                  label="PRÉ REQUISITO"
                  variant="outlined"
                  value={preRequisito}
                />
                <TextField
                  autoFocus
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountBoxIcon sx={{ color: "#000814" }} />
                      </InputAdornment>
                    ),
                  }}
                  id="nome"
                  sx={styleTextField}
                  className="textField"
                  onChange={(e) =>{ setConteudoProgramtico(e.target.value)}}
                  name="conteudoProgramatico"
                  type="text"
                  label="CONTEUDO PROGRAMATICO"
                  variant="outlined"
                  value={conteudoProgramatico}
                />
         

                <InputLabel id="demo-simple-select-label">
                  Tipo Área
                </InputLabel>
                <select
                  id="tipoArea"
                  style={styleSelect}
                  name="tipoArea"
                  required
                  className="form-control"
                  onChange={(e) => {
                    setIdArea(e.target.value)
                    post(e)}}

                  value={idArea}
                >
                  <option>Selecione:</option>

                   {
                   tipoArea.map((obj) => (
                    <option value={obj.id}>{obj.nome}</option>
                  ))
                  } 
                </select>
                <InputLabel id="demo-simple-select-label">
                  Tipo Atendimento
                </InputLabel>
                <select
                  id="tipoAtendimento"
                  style={styleSelect}
                  name="tipoAtendimento"
                  required
                  className="form-control"
                  onChange={(e) => setTipoAtendimento(e.target.value)}
                  value={tipoAtendimento}
                >
                  <option>Selecione:</option>

                   {tipoAtendimentos.map((obj, indice) => (
                    <option key={indice}>{obj}</option>
                  ))}
                </select>
                <InputLabel id="demo-simple-select-label">
                  Nivel
                </InputLabel>
                <select
                  id="nivel"
                  style={styleSelect}
                  name="nivel"
                  required
                  className="form-control"
                  onChange={(e) => setNivel(e.target.value)}
                  value={nivel}
                >
                  <option>Selecione:</option>

                 {niveis.map((obj) => (
                    <option>{obj}</option>
                  ))}
                </select>
              </div>
              <Button
                variant="contained"
                style={btnCad}
                onClick={() => {
                  cadastrar();
                }}
              >
                <SaveIcon sx={{ marginRight: "10px" }} />
                Cadastrar
              </Button>

              <Button
                variant="contained"
                color="error"
                style={btnClose}
                onClick={() => {
                  limparForm();
                  handleClose();
                }}
              >
                <CancelPresentationIcon sx={{ marginRight: "10px" }} />
                Fechar
              </Button>
            </form>
            <Paper elevation={0}>
              <img style={imgStyle} src="../img/img3.png" />
            </Paper>
          </Box>
        </Fade>
      </Modal>
      <Modal
        onBackdropClick="true"
        disableEnforceFocus
        open={modalAlt}
        onClose={clearClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <form>
            <div>
              <h2 style={titleModal}>ADICIONAR USUÁRIO</h2>
              <TextField
                autoFocus
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountBoxIcon sx={{ color: "#000814" }} />
                    </InputAdornment>
                  ),
                }}
                id="nome"
                sx={styleTextField}
                className="textField"
                onChange={capturarDados}
                name="nome"
                type="text"
                label="NOME"
                variant="outlined"
              />
              <TextField
                autoFocus
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountBoxIcon sx={{ color: "#000814" }} />
                    </InputAdornment>
                  ),
                }}
                id="objetivo"
                sx={styleTextField}
                className="textField"
                onChange={capturarDados}
                name="objetivo"
                type="text"
                label="OBJETIVO"
                variant="outlined"
              />
              <TextField
                autoFocus
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountBoxIcon sx={{ color: "#000814" }} />
                    </InputAdornment>
                  ),
                }}
                id="preRequisito"
                sx={styleTextField}
                className="textField"
                onChange={capturarDados}
                name="nome"
                type="text"
                label="PRÉ REQUISITO"
                variant="outlined"
              />
              <TextField
                autoFocus
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountBoxIcon sx={{ color: "#000814" }} />
                    </InputAdornment>
                  ),
                }}
                id="nome"
                sx={styleTextField}
                className="textField"
                onChange={capturarDados}
                name="conteudoProgramatico"
                type="text"
                label="CONTEUDO PROGRAMATICO"
                variant="outlined"
              />
              <TextField
                autoFocus
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountBoxIcon sx={{ color: "#000814" }} />
                    </InputAdornment>
                  ),
                }}
                id="sigla"
                sx={styleTextField}
                className="textField"
                onChange={capturarDados}
                name="sigla"
                type="text"
                label="SIGLA"
                variant="outlined"
              />

              <InputLabel id="demo-simple-select-label">
                Tipo Área
              </InputLabel>
              <select
                id="tipoArea"
                style={styleSelect}
                name="tipoArea"
                required
                className="form-control"
                onChange={capturarDados}
              >
                <option>Selecione:</option>

                {tipoArea.map((obj) => (
                  <option>{obj}</option>
                ))}
              </select>
              <InputLabel id="demo-simple-select-label">
                Tipo Atendimento
              </InputLabel>
              <select
                id="tipoAtendimento"
                style={styleSelect}
                name="tipoAtendimento"
                required
                className="form-control"
                onChange={capturarDados}
              >
                <option>Selecione:</option>

                {tipoAtendimentos.map((obj) => (
                  <option>{obj}</option>
                ))}
              </select>
              <InputLabel id="demo-simple-select-label">
                Nivel
              </InputLabel>
              <select
                id="nivel"
                style={styleSelect}
                name="nivel"
                required
                className="form-control"
                onChange={capturarDados}
              >
                <option>Selecione:</option>

                {niveis.map((obj) => (
                  <option>{obj}</option>
                ))}
              </select>

            </div>
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
                setModalAlt(false);
              }}
            >
              <CancelPresentationIcon sx={{ marginRight: "10px" }} />
              Fechar
            </Button>
          </form>
          <Paper elevation={0}>
            <img style={imgStyle} src="/img/img3.png" />
          </Paper>
        </Box>
      </Modal >
    </>
  );
}

const usuario = {
  id: "",
  nome: "",
  nif: "",
  tipoUsuario: "",
  email: "",
  senha: "",
};

const imgStyle = {
  border: "none",
  width: "400px",
  height: "400px",
  margin: "50px auto",
  position: "center",
};

const styleTextField = {
  display: "flex",
  flexDirection: "row",
  marginBottom: "30px",
};

const styleSelect = {
  width: "235px",
  height: "40px",
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
  display: "flex",
  flexDirection: "row",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  borderRadius: "37px",
  border: "3px solid #8d99ae",
  boxShadow: 240,
  p: 4,
};
export default ListaCurso;
