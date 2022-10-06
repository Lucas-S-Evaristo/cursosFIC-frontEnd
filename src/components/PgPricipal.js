import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Person3OutlinedIcon from "@mui/icons-material/Person3Outlined";
import InputAdornment from '@mui/material/InputAdornment';

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


import AddSharpIcon from "@material-ui/icons/AddSharp";
import TablePagination from "@material-ui/core/TablePagination";
import MenuLateral from "./menu/MenuLateral";

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
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));
// metodo de msg de alteração feita com sucesso
const msgAlteracao = () => {
  console.log("entrei");

  toast.success("Instrutor Alterado com Sucesso", {
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
const msgDeletado = () => {
  toast.success("Instrutor deletado com Sucesso", {
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
const msgCadastrando = () => {
  console.log("entrei");

  toast.success("Instrutor Cadastrado  com Sucesso", {
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

const erroCad = () => {
  toast.warn("Preencha os campos corretamente!", {
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

function PgPricipal(props) {
  /* lista de instrutor */
  const [instrutor, setInstrutor] = useState([]);
  /* variavel que define  se a modal cadastro esta abreta ou fechada  */
  const [open, setOpen] = React.useState(false);
  /* variavel que define  se a modal altera esta abreta ou fechada  */
  const [open2, setOpen2] = React.useState(false);
  /* pega id do instrutor */
  const [idinstrutor, setidinsntrutor] = useState([]);
  /* pega o nome do instrutor */
  const [nomeistrutor, setnomeisntrutor] = useState([]);
  /* linhas maxima na coluna  */
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  /*  numero de pagina*/
  const [page, setPage] = React.useState(0);
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
  /* fechando modal alterar */
  const modalAlterarFechando = () => {
    setOpen2(false);
  };
  /* pegando numero de pagina */
  const handleChangePage = (event, newPage) => {
    console.log("EVENTO" + event);

    console.log("PAGINA" + newPage);

    setPage(newPage);
  };
  /* zerano numero de pagina */
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));

    setPage(0);
  };

  /*   // metodo de msg de alteração feita com sucesso
  const handleCheckBox = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      ids.push(value);
      console.log("lista de ids " + ids.length);
    }

    // Case 2  : The user unchecks the box
    else {
      ids = ids.filter((e) => e !== value);
      console.log("lista de ids " + ids.length);
    }

    console.warn("ids", ids.length);
    console.log(ids);
  };

  function marcarTodos(e) {
    const { value, checked } = e.target;

    listid = document.querySelectorAll('input[name="id"]');
    let i = 0;
    console.warn("input" + listid);
    if (checked) {
      for (i = 0; i < listid.length; i++) {
        ids.push(listid[i].value);
        listid[i].checked = checked;
      }
    } else {
      for (i = 0; i < listid.length; i++) {
        listid[i].checked = false;
        ids = ids.filter((e) => e !== listid[i].value);
      }
      listid = [];
    }

    console.log(ids);
  }

  /*  */

  /*   const deletar = async () => {
    deleteinstrutor(ids);

    ids = [];
  }; */
  /* renderizar página  e faz requisição  */
  useEffect(() => {
    getiInstrutor();
  }, []);
  /* fazendo uma requisição get  */
  const getiInstrutor = async () => {
    console.log("passou");
    let result = await fetch(`http://localhost:8080/api/instrutor`);
    /* pegando json da requisição get */
    result = await result.json();
    /* colocando json em uma variavel instrutor */
    setInstrutor(result);
  };
  console.log(instrutor);

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
      /* faz uma requisição get  que faz uma busca de instrutor  */
      let result = await fetch(
        `http://localhost:8080/api/instrutor/buscar/${key}`
      );
      /* pega o json da requição  */
      result = await result.json();
      /* verificar se  requição foi feita com sucesso */
      if (result) {
        /* coloca  o json na variavel instrutor */
        setInstrutor(result);
      }
    } else {
      /* faz  uma requisição get do back end e renderizar página  */
      getiInstrutor();
    }
  };
  /* metodo deletar instrutor */
  const deleteinstrutor = async (id) => {
    let result = await fetch(`http://localhost:8080/api/instrutor/${id}`, {
      method: "DELETE",
    });

    if (result) {
      getiInstrutor();
      msgDeletado();
    }
  };
  const cadastroInstrutor = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.warn("teste", data);
    console.log("oi brasil", data.nome);
    console.warn("EVENTO", event.target);

    let obgj = {
      nome: data,
    };
    console.warn(data);

    let result = await fetch(`http://localhost:8080/api/instrutor`, {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    });

    if (result.status === 409) {
      erroCad();
    } else if (result) {
      console.warn("oi");
      msgCadastrando();

      setOpen(false);

      getiInstrutor();
    }
  };
  const alterainstrutor = async (event) => {
    event.preventDefault();
    console.warn(event.target);

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.warn("data = formaData", data);
    let obgj = {
      id: idinstrutor,
      nome: data.nome,
    };
    console.warn("obj altera instrutor", obgj);
    console.warn("id do instrutor ", idinstrutor);
    let result = await fetch(
      `http://localhost:8080/api/instrutor/${idinstrutor}`,
      {
        method: "PUT",
        body: JSON.stringify(obgj),
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (result.status === 409) {
      // caso de erro no result 409
      erroCad();
    } else if (result) {
      console.warn("ENTREEEEI");
      // fecha a modal
      setOpen2(false);
      msgAlteracao();
      getiInstrutor();
    }
  };

  /* const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false); */

  /*  const handleDrawerToggle = () => {
     setMobileOpen(!mobileOpen);
   }; */

  //const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <MenuLateral />

      <Box sx={{ display: "flex", marginLeft: "40px" }}>
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
          onClose={modalCadastroFechando}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
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

        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(0% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
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
            style={{ margin: 10, fontWeight: "bold" }}
            variant="contained"
            color="primary"
            size="large"
            onClick={modalCadastroAbrindo}
            className={classes.button}
            startIcon={<AddSharpIcon />}
          >
            NOVO
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
                          onClick={() => deleteinstrutor(id)}
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
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
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
