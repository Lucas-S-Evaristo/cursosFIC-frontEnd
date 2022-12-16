import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Person3OutlinedIcon from "@mui/icons-material/Person3Outlined";
import InputAdornment from "@mui/material/InputAdornment";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Load from "../load";
import Nav from "react-bootstrap/Nav";
import CardMembershipOutlinedIcon from "@mui/icons-material/CardMembershipOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import SchoolIcon from "@mui/icons-material/School";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import GroupIcon from "@mui/icons-material/Group";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import red from "@material-ui/core/colors/red";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import AddSharpIcon from "@material-ui/icons/AddSharp";
import TablePagination from "@material-ui/core/TablePagination";
import MenuLateral from "../menu/MenuLateral";
import Slide from "@mui/material/Slide";
import api from "../api/api"
import './intrutor.css'
import AssignmentIcon from "@mui/icons-material/Assignment";

const secondary = red[500];

let ids = [];
let listid = [];

const drawerWidth = 240;
//modal css
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 10,
  p: 4,
};

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));
/* faz  uma requisição get do back end e renderizar página  */
const msgAlteracao = () => {


  toast.success("Instrutor Alterado com Sucesso", {
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
const msgDeletado = () => {
  toast.success("Instrutor deletado com Sucesso", {
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
const msgDeletadoerror = () => {
  toast.warning(" Não e possível deletar Instrutor porque ele está associado a uma Área ", {
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
const msgCadastrando = () => {


  toast.success("Instrutor Cadastrado  com Sucesso", {
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

const erroCad = () => {
  toast.warn("Preencha os campos corretamente!", {
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
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


let token = sessionStorage.getItem("token")

function PgPricipal(props) {
  /* lista de instrutor */
  const [instrutor, setInstrutor] = useState([]);
  /* variavel que define  se a modal cadastro esta abreta ou fechada  */
  const [open, setOpen] = React.useState(false);
  /* variavel que define  se a modal altera esta abreta ou fechada  */
  const [open2, setOpen2] = React.useState(false);
  /* variavel que define  se a modal deletar  esta abreta ou fechada */
  const [open3, setOpen3] = React.useState(false);
  /* pega id do instrutor */
  const [idinstrutor, setidinsntrutor] = useState([]);
  /* pega o nome do instrutor */
  const [nomeistrutor, setnomeisntrutor] = useState([]);
  /* linhas maxima na coluna  */
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  /*  numero de pagina*/
  const [page, setPage] = React.useState(0);

  const [removeLoad, setRemoveLoad] = useState(false)

  /* estilo de classes */
  const classes = useStyles();
  /* abrindo modal cadastro */
  const modalCadastroAbrindo = () => setOpen(true);
  /* fechando modal cadastro */
  const modalCadastroFechando = () => setOpen(false);
  /* abrindo modal alterar pegando id  e nome */
  const modalAlterarAbrindo = (id, nome) => {
    /* abre a modal */
    setOpen2(true);
    /* coloca id em uma variavel const */
    setidinsntrutor(id);
    /* coloca nome em uma variavel const */
    setnomeisntrutor(nome);
  };
  /* abrindo modal Deletar pegando id */
  const modalAbrindoDelatar = (id) => {
    /* abre a modal */
    setOpen3(true);
    /* coloca id em uma variavel const */
    setidinsntrutor(id);
  };
  /* fechando modal alterar */
  const modalAlterarFechando = () => {
    setOpen2(false);
  };
  /* pegando numero de pagina */
  const handleChangePage = (event, newPage) => {


    setPage(newPage);
  };
  /* zerano numero de pagina */
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));

    setPage(0);
  };

  useEffect(() => {
    setTimeout(() => {
      getiInstrutor();

      setRemoveLoad(true)
    }, 500)
  }, []);


  /* fazendo uma requisição get  */
  const getiInstrutor = async () => {

    let result = await fetch(`http://localhost:8080/api/instrutor`);
    /* pegando json da requisição get */
    result = await result.json();
    /* colocando json em uma variavel instrutor */
    setInstrutor(result);

  };


  /* css  da tabela */
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  /* csss linha */
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  /* buscar instrutor  */

  const buscarInstrutor = async (event) => {

    /* key rescebe um evento que e gerado quando usuario clicar no iput de buscar */

    let key = event.target.value;

    /* verifica se o usuario digitou algo se não digitou nada ele faz   requisição get  para atulizar lista */

    if (key) {

      let jsonNome = {

        nome: key

      }

      /* faz uma requisição get  que faz uma busca de instrutor  */

      let result = await fetch(`http://localhost:8080/api/instrutor/buscar/`, {

        method: "post",

        body: JSON.stringify(key),

        headers: {

          "Content-type": "application/json",

          Accept: "application/json",

        }
      });

      /* pega o json da requição  */

      result = await result.json();

      /* verificar se  requição foi feita com sucesso */

      if (result) {

        /* coloca  o json na variavel instrutor */

        setInstrutor(result);

      }

    } else {

      /* faz  uma requisição get do back end e renderização da página  */

      getiInstrutor();

    }

  };
  /* metodo deletar instrutor recebe um id de instrutor para deletar */
  const deleteinstrutor = async (id) => {
    let result = await fetch(`http://localhost:8080/api/instrutor/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": token
      },
    });
    if (result.status === 409) {
      msgDeletadoerror()

    } else if (result) {
      /* fecha  Dialog que pergunta se deve excluir  */
      setOpen3(false);
      /* faz  uma requisição get do back end e renderizar página  */
      getiInstrutor();
      /* Mensagem de deletar com sucesso */
      msgDeletado();
    }
  };
  /* metodo de cadastrar instrutor */
  const cadastroInstrutor = async (event) => {
    /* tiras as características de evento evitando Recarregar  a pagina */
    event.preventDefault();
    /* pegar todos  os valores do evento */
    const formData = new FormData(event.target);
    /*formata em um objeto em  json */
    const data = Object.fromEntries(formData);

    /* verificar se  requisição foi feita com sucesso */
    let result = await fetch(`http://localhost:8080/api/instrutor`, {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        "Authorization": token
      },
    });
    /* verificar se a requisição Retornou um erro 409*/
    if (result.status === 409) {
      erroCad();
      /* verificar se  requisição foi feita com sucesso */
    } else if (result) {

      /* mensagem de cadastrar com sucesso */
      msgCadastrando();
      /*fecha modal  de cadastrar */
      setOpen(false);
      /* faz  uma requisição get do back end e renderização da página  */
      getiInstrutor();
    }
  };
  /* metodo de alterar */
  const alterainstrutor = async (event) => {
    /* tiras as características de evento evitando Recarregar  a pagina */
    event.preventDefault();

    /* pegar todos  os valores do evento */
    const formData = new FormData(event.target);
    /*formata em um objeto em  json */
    const data = Object.fromEntries(formData);

    /*formata em um objeto em json com id */
    let obgj = {
      id: idinstrutor,
      nome: data.nome,
    };

    let result = await fetch(
      `http://localhost:8080/api/instrutor/${idinstrutor}`,
      {
        method: "PUT",
        body: JSON.stringify(obgj),
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          "Authorization": token
        },
      }
    );
    /* verificar se a requisição Retornou um erro 409*/
    if (result.status === 409) {
      erroCad();
      /* verificar se  requisição foi feita com sucesso */
    } else if (result) {

      // fecha a modal alterar
      setOpen2(false);
      /* mensagem alterar com sucesso */
      msgAlteracao();
      /* faz  uma requisição get do back end e renderização da página  */
      getiInstrutor();
    }
  };

  let p = localStorage.getItem("payload");
  p = JSON.parse(p);

  return (
    <>
      <MenuLateral />

      <Box sx={{ display: "flex", marginLeft: "40px" }}>
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
          open={open}
          onClose={modalCadastroFechando}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="modaC">
            <h2 id="transition-modal-title">cadastro de instrutor</h2>
            <form onSubmit={cadastroInstrutor}>
              <TextField
                name="nome"
                type="text"
                label="nome"
                variant="outlined"
              />
              <Button variant="contained" style={{ margin: 10 }} type="submit">
                cadastrar
              </Button>
            </form>
          </Box>
        </Modal>
        <Dialog
          open={open3}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => setOpen3(false)}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Atenção"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Deseja Deletar instrutor
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => deleteinstrutor(idinstrutor)}>Sim</Button>
            <Button onClick={() => setOpen3(false)}>Não</Button>
          </DialogActions>
        </Dialog>

        <CssBaseline />

        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />

          <TextField
            fullWidth
            onChange={buscarInstrutor}
            style={{ marginBottom: 25 }}
            label="buscar instrutor"
            id="fullWidth"
            type="text"
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

          <Button

            style={{ margin: 10, fontWeight: "bold", backgroundColor: "black", borderRadius: "2em" }}

            variant="contained"

            size="large"

            onClick={modalCadastroAbrindo}

            className={classes.button, "botaoTarefaTurma"}

            startIcon={<AssignmentIcon />}

          >

            Novo

          </Button>
        

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">NOME</StyledTableCell>
                <StyledTableCell align="center">ALTERAR</StyledTableCell>
                <StyledTableCell align="center">DELETAR</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {instrutor
                .slice(
                  page * rowsPerPage,

                  page * rowsPerPage + rowsPerPage
                )
                .map(({ id, nome }, index) => (
                  <StyledTableRow key={id}>
                    <StyledTableCell align="center">{nome}</StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        variant="contained"
                        size="large"
                        style={{ backgroundColor: "#FFD60A" }}
                        onClick={() => modalAlterarAbrindo(id, nome)}
                        className={classes.button}
                        startIcon={
                          <BorderColorIcon
                            style={{
                              color: "#000",
                              position: "relative",
                              left: "0.2em",
                            }}
                          />
                        }
                      ></Button>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        variant="contained"
                        size="large"
                        style={{ backgroundColor: "#FF0000" }}
                        onClick={() => modalAbrindoDelatar(id)}
                        className={classes.button}
                        startIcon={
                          <DeleteIcon
                            style={{ position: "relative", left: "0.3em" }}
                          />
                        }
                      ></Button>
                    </StyledTableCell>

                    <Modal
                      open={open2}
                      onClose={modalAlterarFechando}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <h2 id="transition-modal-title">alterar instrutor</h2>
                        <form onSubmit={alterainstrutor}>
                          <TextField
                            name="nome"
                            type="text"
                            label="nome"
                            defaultValue={nomeistrutor}
                            placeholder={nomeistrutor}
                            variant="outlined"
                          />
                          <Button
                            variant="contained"
                            style={{ margin: 10 }}
                            type="submit"
                          >
                            alterar
                          </Button>
                        </form>
                      </Box>
                    </Modal>
                  </StyledTableRow>
                ))}

            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[3, 5, 10, 15]}
          component="div"
          count={instrutor.length}
          rowsPerPage={rowsPerPage}
          page={page}
          labelRowsPerPage='Linhas por páginas'
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        {!removeLoad && <Load />}
      </Box>
    </Box>
    </>
  );
}

/**  ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
/**  window: PropTypes.func,*/
/**}; */

export default PgPricipal;
