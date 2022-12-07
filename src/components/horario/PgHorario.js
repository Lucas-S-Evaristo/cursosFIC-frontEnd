import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Input from "@material-ui/core/Input";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Load from "../load";
import { Link as RouterLink, MemoryRouter } from "react-router-dom";
import Link from "@mui/material/Link";
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
import Alert from "@material-ui/lab/Alert";

import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import red from "@material-ui/core/colors/red";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import AddSharpIcon from "@material-ui/icons/AddSharp";
import TablePagination from "@material-ui/core/TablePagination";
import MenuLateral from "../menu/MenuLateral";
import Slide from "@mui/material/Slide";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../horario/hs.css'
import AssignmentIcon from "@mui/icons-material/Assignment";
const drawerWidth = 240;
//modal css
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));


const cadastroSucesso = () => {
  toast.success("Cadastrado com sucesso!", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: 'dark',
      draggable: true,
      progress: undefined,
  })
}

const excluirSucesso = () => {
  toast.success("Excluido com sucesso!", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: 'dark',
      draggable: true,
      progress: undefined,
  })
}


const msgAlteracao = () => {

  toast.success("Horário alterado com Sucesso", {
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
  toast.warning(
    " Não é possível deletar o horário porque ele está associado a uma turma ",
    {
      position: "top-center",

      autoClose: 4500,

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
const msgCadastraerror = () => {
  toast.warning(
    " Não é possível cadastrar um Horário que já existe    ",
    {
      position: "top-center",

      autoClose: 4500,

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

let token = sessionStorage.getItem("token")

const PgHorario = () => {
  const [horario, setHorario] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [idiHorario, setidHorario] = useState([]);
  const [pegarHorario, setpegarHorario] = useState([]);
  const [removeLoad, setRemoveLoad] = useState(false)
  /* linhas maxima na coluna  */
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  /*  numero de pagina*/
  const [page, setPage] = React.useState(0);
  const classes = useStyles();
  const modalCadastroAbrindo = () => setOpen(true);
  const modalCadastroFechando = () => setOpen(false);
  const modalAlterarAbrindo = (id, horario) => {
    setOpen2(true);
    setidHorario(id);
    setpegarHorario(horario);
  };
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

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClick = () => {
    setOpen3(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen3(false);
  };

  useEffect(() => {
    setTimeout(() => {
    getiHorario();
    setRemoveLoad(true)
    }, 500)
  }, []);

  const getiHorario = async () => {
    let result = await fetch(`http://localhost:8080/api/horario`);
    result = await result.json();
    setHorario(result);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const deletetarHorario = async (id) => {
    let result = await fetch(`http://localhost:8080/api/horario/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": token
      }
    });
    if (result.status === 409) {
      msgDeletadoerror();
    } else if (result) {
      getiHorario();
      excluirSucesso()
    }
  };
  const cadastroHorario = async (event) => {

    event.preventDefault()

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    let obgj = {
      nome: data,
    };


    let result = await fetch(`http://localhost:8080/api/horario`, {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        "Authorization": token
      },
    });

     if (result.status == 201) {
      setOpen(false)
      cadastroSucesso()
   
      getiHorario();
     
    } else if(result.status === 409){
      msgCadastraerror()
    }
  };
  const alteraHorario = async (event) => {
   
    event.preventDefault()

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    let obgj = {
      id: idiHorario,
      horario: data.horario,
    };
   
    let result = await fetch(
      `http://localhost:8080/api/horario/${idiHorario}`,
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

    if (result) {
      setOpen2(false)
      msgAlteracao()
      getiHorario();
    }
  };


  return (
    <>
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

      <Box sx={{ display: "flex", marginLeft: "80px" }}>
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
          <Box sx={style} className="modalCadH">
            <h2 id="transition-modal-title">cadastro de horario</h2>
            <form onSubmit={cadastroHorario}>
              <TextField
                name="horario"
                type="time"
                label="           horario"
                variant="outlined"
                style={{ width:"20vh"}}
                required
              />
              <Button variant="contained" style={{ margin: 10 }} type="submit">
                cadastrar
              </Button>
            </form>
          </Box>
        </Modal>

        <CssBaseline />
        
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        ></Box>
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

            onClick={modalCadastroAbrindo}

            className={classes.button, "botaoTarefaTurma"}

            startIcon={<AssignmentIcon />}

          >

            Novo

          </Button>

          <Snackbar open={open3} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              This is a success message!
            </Alert>
          </Snackbar>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">
                    Horário cadastrado
                  </StyledTableCell>
                  <StyledTableCell align="center">DELETAR</StyledTableCell>
                  <StyledTableCell align="center">ALTERAR</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {horario
                  .slice(
                    page * rowsPerPage,

                    page * rowsPerPage + rowsPerPage
                  )
                  .map((obj) => (
                    <StyledTableRow key={obj.id}>
                      <StyledTableCell align="center">
                        {obj.horario}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Button
                          onClick={() => deletetarHorario(obj.id)}
                          variant="contained"
                          size="large"
                          style={{ backgroundColor: "#FF0000" }}
                          className={classes.button}
                          startIcon={
                            <DeleteIcon
                              style={{ position: "relative", left: "0.3em" }}
                            />
                          }
                        ></Button>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Button
                          onClick={() =>
                            modalAlterarAbrindo(obj.id, obj.horario)
                          }
                          variant="contained"
                          size="large"
                          style={{ backgroundColor: "#FFD60A" }}
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
                      <Modal
                        open={open2}
                        onClose={modalAlterarFechando}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <h2 id="transition-modal-title">alterar horario</h2>
                          <form onSubmit={alteraHorario}>
                            <TextField
                              name="horario"
                              type="time"
                              label="horario"
                              defaultValue={pegarHorario}
                              variant="outlined"
                              required
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
            count={horario.length}
            rowsPerPage={rowsPerPage}
            page={page}
            labelRowsPerPage='Linhas por páginas'
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
      {!removeLoad && <Load/>}
       
        </Box>
      </Box>
    </>
  );
};

/**  ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
/**  window: PropTypes.func,*/
/**}; */

export default PgHorario;
