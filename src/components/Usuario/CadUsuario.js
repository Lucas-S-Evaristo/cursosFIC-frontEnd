import React, { useEffect } from "react";
import Modal from "@mui/material/Modal";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import FolderSharedRoundedIcon from "@mui/icons-material/FolderSharedRounded";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import List from "@mui/material/List";
import { toast, ToastContainer, cssTransition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateIcon from "@mui/icons-material/Create";
import SaveIcon from "@mui/icons-material/Save";
import Toolbar from "@mui/material/Toolbar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Container from "@mui/material/Container";
import HomeIcon from "@mui/icons-material/Home";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Button from "@mui/material/Button";
import AdbIcon from "@mui/icons-material/Adb";
import TextField from "@mui/material/TextField";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { height } from "@mui/system";
import { createTheme, ListItem } from "@mui/material";
import MenuLateral from "../menu/MenuLateral";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Load from "../load";
import "../Usuario/usuario.css";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { makeStyles } from "@material-ui/core/styles";

const token = sessionStorage.getItem("token");

let payload = sessionStorage.getItem("payload");

payload = JSON.parse(payload);


const tema = createTheme({
  palette: {
    primary: {
      main: "#C2C2C2"
    }
  }
})

function PageUsuario() {

  //  USE ESTATE USADO PARA CONTROLAR O ESTADO DE UMA VARIAVEL
  // estado da modal
  const [open, setOpen] = useState(false);
  const [modalAlt, setModalAlt] = useState(false);

  const [modalConfirmar, setModalConfirmar] = useState(false);

  const AbrirModalConfirmar = (id) => {
    setModalConfirmar(true)
    setIdUsuario(id)
  }

  const fecharConfirmar = () => setModalConfirmar(false);

  const [modalExcluir, setModalExcluir] = useState(false);

  const abrirModalExcluir = (id) => {
    setModalExcluir(true)
    setIdUsuario(id)

  };

  const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));


  const classes = useStyles();

  const [removeLoad, setRemoveLoad] = useState(false)

  // estado do obj do ususario
  const [objUsuario, setObjUsuario] = useState();
  // metodo que abre a modal
  const handleOpen = () => setOpen(true);
  // metodo que fecha a modal
  const handleClose = () => {

    setOpen(false);
    setModalAlt(false)
  }
  // variavel que tem acesso a um array com todos os usuarios
  const [usuarios, setUsuario] = useState([]);
  // variavel que tem acesso a um array com todos os tipos de usuarios
  const [tipoUsuario, setTipoUsuario] = useState([]);

  // metodo que captura informações do input
  const capturarDados = (e) => {
   
    setObjUsuario({ ...objUsuario, [e.target.name]: e.target.value });
  };

  // REQUISIÇÃO GET PARA PUXAR TODOS OS USUARIOS
  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:8080/api/usuario")
        .then((resp) => resp.json())
        .then((retorno_convertido) => setUsuario(retorno_convertido)); //lista de usuários
      setRemoveLoad(true)
    }, 500)

  }, []);

  // REQUISIÇÃO GET PARA PUXAR TODOS OS TIPOS DE USUARIOS
  useEffect(() => {
    fetch("http://localhost:8080/api/enum/tipoUsuario")
      .then((resp) => resp.json())
      .then((retorno_convertido) => setTipoUsuario(retorno_convertido)); //lista de usuários
  }, []);

  // função que espera receber um id
  const alterar = async (event) => {

    event.preventDefault()

    const formData = new FormData(event.target)

    const data = Object.fromEntries(formData);

    if (data.nif.length >= 5 && data.nif.length <= 7) {

      const usuario = {
        id: idUsuario,
        nome: data.nome,
        nif: data.nif,
        tipoUsuario: data.tipoUsuario,
        email: data.email,

      };
      // requisição ao back-end
      let resultado = await fetch("http://localhost:8080/api/usuario/" + idUsuario, {
        method: "PUT",
        body: JSON.stringify(usuario),
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: token,
        },
      });

      // verifica se existe resultado
      if (resultado) {
        // atualiza a lista com o usuario alterado
        atualizaLista();
        // fecha a modal de alterar
        setModalAlt(false);
        // exibe a msg de alteração concluida
        msgAlteracao();
      }
    } else {

      nifValidacao()

    }
  };


  const [idUsuario, setIdUsuario] = useState([])

  const [nome, setNome] = useState()

  const [nif, setNif] = useState()

  const [email, setEmail] = useState()

  const [tipoUsuarioOrdinal, setTipoUsuarioOrdinal] = useState()


  // metodo que efetua o cadastro do usuario
  const cadastrar = async (event) => {

    event.preventDefault()

    const formData = new FormData(event.target)

    const data = Object.fromEntries(formData);

    if (data.nif.length >= 5 && data.nif.length <= 7) {

      const usuario = {

        nome: data.nome,
        nif: data.nif,
        tipoUsuario: data.tipoUsuario,
        email: data.email,
        senha: data.senha

      };

      fetch("http://localhost:8080/api/usuario", {
        method: "post",
        body: JSON.stringify(usuario),
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: token,
        },
      }).then((retorno) => {
        //se o input estiver vazio, passar uma resposta de erro e enviar mensagem de erro
        if (retorno.status === 500 || retorno.status === 400) {
          msgCamposVazio();

          // se existir um email existente
        } else if (retorno.status === 409) {
          document.getElementById("email").value = ""; // Limpa o campo

          msgEmailDuplicados();
        } else if (retorno.status === 510) {
          document.getElementById("nif").value = ""; // Limpa o campo
          msgNifDuplicados();
        } else {
          //faz o processo de cadastro
          retorno.json().then((retorno_convertido) => {
            //exibir notificação de sucesso
            msgCadastro();
            atualizaLista();
            //atualiza a página depois de um tempo
            setOpen(false);
          });
        }
      });
    } else {

      nifValidacao()

    }
  };
  // metodo que capta o usuario que foi selecionado
  const selecionarUsuario = (id, nome, nif, email, tipoUsuarioOrdinal) => {
    setIdUsuario(id)
    setNome(nome);
    setNif(nif);
    setEmail(email)
    setTipoUsuarioOrdinal(tipoUsuarioOrdinal)
  };

  // metodo que atualiza a lista, puxando todos os usuarios da rest api
  const atualizaLista = async () => {
    const result = await fetch("http://localhost:8080/api/usuario"); // await = espera uma promessa
    const resultado = await result.json();
    setUsuario(resultado);
  };

  // metodo que deleta o usuario
  const deletar = async (id) => {
    let result = await fetch(`http://localhost:8080/api/usuario/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });
    // caso exista um usuario a ser deletado, ele atualiza a lista assim removendo o usuario deletado
    if (result) {
      atualizaLista();
      msgExclusao();
    }
  };

  // metodo que limpa os inputs do form
  const limparForm = () => {
    setObjUsuario("");
  };

   // metodo que busca um usuario
   const buscaUsuario = async (event) => {
    // valor que esta sendo digitado no input de pesquisa
    let key = event.target.value;
   
    // verifica se existe 'valor'
    if (key) {
      // fazendo uma requisição na api de buscar e passando a key
      let result = await fetch("http://localhost:8080/api/usuario/buscar/", {
        method: "post",

        body: JSON.stringify(key),

        headers: {
          "Content-type": "application/json",

          Accept: "application/json",
        },
      });
      // tranformando a promessa em json
      result = await result.json();
    
      // verifica se existe algum resultado
      if (result) {
        // setando os usuarios que a api retornou de sua resposta de busca
        setUsuario(result);
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
      theme: "dark",
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
      theme: "dark",
      // faz com que seja possivel arrastar
      draggable: true,
      progress: undefined,
    });
  };

  const nifValidacao = () => {
    toast.error("Nif precisa ter de 5 a 7 caracteres!", {
      position: "top-right",
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

  const msgNifDuplicados = () => {
    toast.error("Nif ja esta associado a um usuario", {
      position: "top-right",
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

  const msgCamposVazio = () => {
    toast.error("Preencha os Campos Corretamente", {
      position: "top-right",
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
    toast.success("Usuário Removido com Sucesso", {
      position: "top-right",
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
    toast.success("Usuário Alterado com Sucesso", {
      position: "top-right",
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

  return (
    <>
      <MenuLateral />

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
        open={open}
        onClose={clearClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <form onSubmit={cadastrar}>
            <div>
              <h2 style={titleModal}>ADICIONAR USUÁRIO</h2>
              <TextField
                id="nome"
                sx={styleTextField}
                className="textField"
                onChange={capturarDados}
                name="nome"
                type="text"
                label="NOME"
                variant="outlined"
              />
              <InputLabel id="demo-simple-select-label">
                Tipo Usuario
              </InputLabel>
              <select
                id="tipoUsuario"
                style={styleSelect}
                name="tipoUsuario"
                required
                className="form-control"
                onChange={capturarDados}
              >

                {tipoUsuario.map((obj, indice) => (
                  <option value={indice} key={indice}>{obj}</option>
                ))}
              </select>
              <TextField
                required
                sx={styleTextField}
                id="nif"

                onChange={capturarDados}
                name="nif"
                minlength="7"
                maxlength="9"
                type="text"
                label="NIF"
                variant="outlined"
              ></TextField>
              <TextField
                autoComplete="email"
                sx={styleTextField}
                id="email"
                onChange={capturarDados}
                name="email"
                type="email"
                label="EMAIL"
                variant="outlined"
              />
            </div>
            <Button
              variant="contained"
              style={{ color: "white", marginTop: 20 }}
              color={"success"}
              type="submit"
            >
              Cadastrar
            </Button>

            <Button
              variant="contained"
              color="error"
              style={btnClose}
              onClick={() => {

                handleClose();
              }}
            >
              Fechar
            </Button>
          </form>
          <Paper elevation={0}>
            <img
              style={imgStyle}
              src={require('../../imagens/imgAltUsu.png')}
            />
          </Paper>
        </Box>
      </Modal>
      <Modal
        open={modalAlt}
        onClose={clearClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <form onSubmit={alterar}>
            <div>
              <h2 style={titleModal}>ALTERAR USUÁRIO</h2>
              <TextField
                id="nome"
                defaultValue={nome}
                sx={styleTextField}
                className="textField"
                onChange={capturarDados}
                name="nome"
                type="text"
                label="NOME"
                variant="outlined"
              />
              <InputLabel id="demo-simple-select-label">
                Tipo Usuario
              </InputLabel>
              <select
                id="tipoUsuario"
                style={styleSelect}
                name="tipoUsuario"
                required
                className="form-control"
                onChange={capturarDados}
                defaultValue={tipoUsuarioOrdinal}
              >
                <Box></Box>

                <option>Selecione:</option>

                {tipoUsuario.map((obj, indice) => (
                  <option value={indice} key={obj}>{obj}</option>
                ))}
              </select>
              <TextField
                defaultValue={nif}
                required
                sx={styleTextField}
                id="nif"
                onChange={capturarDados}
                name="nif"
                type="text"
                label="NIF"
                variant="outlined"
              ></TextField>
              <TextField
                defaultValue={email}
                autoComplete="email"
                sx={styleTextField}
                id="email"
                onChange={capturarDados}
                name="email"
                type="email"
                label="EMAIL"
                variant="outlined"
              />
            </div>
            <Button
              variant="contained"
              style={btnCad}
              type="submit"
            >
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
              Fechar
            </Button>
          </form>
          <Paper elevation={0}>
            <img style={imgStyle} src={require("../../imagens/usuario.png")} />
          </Paper>
        </Box>
      </Modal>
      <Paper
        sx={{
          maxWidth: 12000,
          marginTop: "0px",
          marginLeft: "20em",
          overflow: "hidden",
        }}
      >
        <AppBar
          position="static"
          color="default"
          elevation={0}
          style={{ marginTop: 100 }}
          sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
        >
          <Toolbar style={{ marginBottom: 20 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <SearchIcon sx={{ display: "block", color: "#01161e" }} />
              </Grid>
              <Grid item xs>
                <TextField
                  onChange={buscaUsuario}
                  fullWidth
                  placeholder="Pesquise pelo nome do usuario"
                  InputProps={{
                    disableUnderline: true,
                    sx: { fontSize: "default", width: "1100px" },
                  }}
                  variant="standard"
                />
              </Grid>
              <Grid item>
                <Button

                  style={{ margin: 10, fontWeight: "bold", backgroundColor: "black", borderRadius: "2em" }}

                  variant="contained"

                  size="large"

                  onClick={handleOpen}

                  className={classes.button, "botaoTarefaTurma"}

                  startIcon={<AssignmentIcon />}

                >

                  Novo

                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
          <table
            style={{ width: "100%" }}
            className="table  table-lg  table-hover"
          >
            <thead
              style={{ backgroundColor: "#212529", color: "white" }}
              className="thead"
            >
              <tr>
                <th scope="col">NOME</th>
                <th scope="col">EMAIL</th>
                <th scope="col">NIF</th>
                <th scope="col">TIPO USUÁRIO</th>
                <th scope="col">ALTERAR</th>
                <th scope="col">DELETAR</th>
              </tr>
            </thead>

            <tbody>
              {usuarios.map(({ id, nome, nif, email, tipoUsuarioString, tipoUsuarioOrdinal }) => (
                <tr key={id}>
                  <th scope="row">{nome}</th>
                  <th scope="row">{email}</th>
                  <th scope="row">{nif}</th>
                  <th scope="row">{tipoUsuarioString}</th>
                  <th scope="row">
                    <button
                      className="botaoAlterarTurma"
                      onClick={() => {
                       
                        selecionarUsuario(id, nome, nif, email, tipoUsuarioOrdinal);
                        setModalAlt(true);
                      }}
                    >
                      <ModeEditOutlinedIcon />
                    </button>
                  </th>
                  <th scope="row">
                    <button
                      className="botaoDeleteTurma"
                      onClick={() => {
                        if (payload.id_usuario === id) {
                          AbrirModalConfirmar(id)
                        } else {
                          abrirModalExcluir(id)
                        }
                      }}
                    >
                      <DeleteForeverOutlinedIcon />
                    </button>

                    <Modal
                      open={modalConfirmar}
                      onClose={clearClose}
                      aria-labelledby="modal-title"
                      aria-describedby="modal-description"
                    >
                      <Box sx={style2}>
                        <header className="headerConfirmar">
                          <h5 className="tituloAlertaConfirm">ALERTA!</h5>
                        </header>

                        <section>
                          <h4 className="h4Confirmar">
                            Tem certeza que deseja se deletar? Você perderá sua
                            sessão e será redirecionado para a tela de login.
                          </h4>
                        </section>

                        <div className="botaoModalConfirmar">
                          <Button
                            variant="contained"
                            color="error"
                            className="ConfirmarNao"
                            onClick={() => fecharConfirmar()}
                          >
                            Não
                          </Button>

                          <Button
                            Button
                            variant="contained"
                            color="success"
                            onClick={() => {
                              deletar(idUsuario);
                              sessionStorage.removeItem("payload");
                              sessionStorage.removeItem("token");
                              window.location.href =
                                "http://localhost:3000/login";
                            }}
                          >
                            Sim
                          </Button>
                        </div>
                      </Box>
                    </Modal>

                    <Modal
                      open={modalExcluir}
                      onClose={clearClose}
                      aria-labelledby="modal-title"
                      aria-describedby="modal-description"
                    >
                      <Box sx={style2}>
                        <header className="headerModalExcluirUsuario">
                          <h4 className="textoExcluir2">ALERTA!</h4>

                          <section>
                            <h4 className="textoExcluirSection">
                              Tem Certeza que deseja excluir?
                            </h4>
                          </section>

                          <div className="botaoModalExcluir2">
                            <Button
                              variant="contained"
                              color="error"
                              className="botaoModalSim"
                              onClick={() => setModalExcluir()}
                            >
                              {" "}
                              Não{" "}
                            </Button>
                            <Button
                              variant="contained"
                              color="success"
                              onClick={() => {
                                deletar(idUsuario);
                                setModalExcluir();
                              }}
                            >
                              Sim
                            </Button>
                          </div>
                        </header>
                      </Box>
                    </Modal>
                  </th>
                </tr>
              ))}
              {!removeLoad && <Load />}
            </tbody>
          </table>
        </Typography>
      </Paper>
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
  display: "flex",
  flexDirection: "row",
  marginBottom: "30px",
  width: "450px",
};

const btnAlterar = {
  backgroundColor: "#caf0f8",
};

const btnExcluir = {
  backgroundColor: "#f9564f",
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
  marginBottom: 30,
};
const btnCad = {
  marginTop: "20px",
  borderRadius: "0.5vh",
  color: "#000",
  backgroundColor: "yellow",
};

const btnClose = {
  marginTop: "20px",
  marginLeft: "20px",
  borderRadius: "0.5vh",
  color: "#ffff",
  backgroundColor: "red",
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
  borderRadius: "1vh",
  boxShadow: 240,
  p: 4,
};

const style2 = {
  position: "absolute",
  top: "50%",
  display: "flex",
  flexDirection: "row",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  height: 200,
  borderRadius: "1vh",
  boxShadow: 240,
  p: 4,
};
export default PageUsuario;
