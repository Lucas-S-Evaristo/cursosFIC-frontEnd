import { Box, Button, createTheme, InputAdornment, Paper, Table, TableBody, TableContainer, TableHead, TableRow, TextField, Toolbar } from "@mui/material"
import { useState } from "react"
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import MenuLateral from "../menu/MenuLateral"
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import TablePagination from '@mui/material/TablePagination';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { AccountCircle } from "@mui/icons-material";
import "../area/listaArea.css"
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddSharpIcon from "@material-ui/icons/AddSharp";
import SearchIcon from "@mui/icons-material/Search";
import Load from "../load";
import { makeStyles } from "@material-ui/core";
import AssignmentIcon from "@mui/icons-material/Assignment";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const tema = createTheme({
  palette: {
    primary: {
      main: "#ECECEC"
    }
  }
})

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: tema.palette.primary.main,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

let token = sessionStorage.getItem("token")

function ListaArea() {

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

  const camposVazios = () => {
    toast.error("Informe algum nome!", {
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

  const alterarSucesso = () => {
    toast.success("Alterado com sucesso!", {
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
  const msgDeletadoerror = () => {
    toast.warning(
      " Não e possível deletar a área porque ela está associada á um Curso! ",
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

  const classes = useStyles();

  const msgNomesIguais = () => {
    toast.warning("Esse nome já existe!",
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


  const [idArea, setIdArea] = useState()
  const [area, setArea] = useState([])

  const [nome, setNome] = useState([])

  const [removeLoad, setRemoveLoad] = useState(false)

  const cadastrarArea = async (event) => {

    event.preventDefault()

    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData)

    let area = {
      nome: data.nome
    }

    let result = await fetch(`http://localhost:8080/api/area`, {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        "Authorization": token
      }
    })
    if (result.status === 409) {

      camposVazios()


    } else if (result.status === 406) {

      msgNomesIguais()

    } else {
      cadastroSucesso()
      setShowCadastrar(false)
      getArea()
    }

  }

  const alterarArea = async (event) => {

    event.preventDefault()

    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData)

    let obgj = {
      id: idArea,
      nome: data.nome

    }

    let result = await fetch(`http://localhost:8080/api/area/${idArea}`, {
      method: 'PUT',
      body: JSON.stringify(obgj),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        "Authorization": token
      }
    })

    if (result) {
      alterarSucesso()
      setShow(false)
      getArea()
    }
  }

  const deletar = async (id) => {
    let result = await fetch(`http://localhost:8080/api/area/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": token
      }

    })
    // caso já exista uma area a ser deletado, ele atualiza a lista assim removendo a area deletada
    if (result.status === 409) {
      msgDeletadoerror();


    } else if (result) {
      getArea()
      excluirSucesso()

    }
  }

  const getArea = async () => {

    let result = await fetch(`http://localhost:8080/api/area`)

    result = await result.json();

    setArea(result)

  }

  useEffect(() => {
    setTimeout(() => {
      getArea();
      setRemoveLoad(true)
    }, 500)

  }, []);

  const selecionarArea = (id, nome) => {

    setIdArea(id)
    setNome(nome)

  }
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {

    setPage(newPage);

  };

  const handleChangeRowsPerPage = (event) => {

    setRowsPerPage(parseInt(event.target.value, 10));

    setPage(0);
  };

  // metodo que busca uma area
  const buscarArea = async (event) => {
    // valor que esta sendo digitado no input de pesquisa
    let key = event.target.value;

    // verifica se existe 'valor'
    if (key) {
      // fazendo uma requisição na api de buscar e passando a key
      let result = await fetch(
        "http://localhost:8080/api/area/buscar/", {
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
        // setando as areas que a api retornou de sua resposta de busca
        setArea(result);
      }

      // caso não exista chave, atualiza a lista
    } else {
      getArea();
    }
  };

  const [modalCadastrar, setShowCadastrar] = useState(false);

  const [modalAlterar, setShow] = useState(false);

  const abrirModalCadastrar = () => setShowCadastrar(true);

  const fecharModalCadastrar = () => setShowCadastrar(false);

  const [modalExcluir, setShowExcluir] = useState(false);

  const abrirModalExcluir = (id) => {
    setShowExcluir(true)
    setIdArea(id)
  };

  const fecharModalExcluir = () => setShowExcluir(false);

  //quando handleShow é chamado ele da um true no show e abre a modal
  const abrirModalAlterar = () => setShow(true);

  //quando handleClose é chamado ele da um false no show e fecha a modal
  const fecharModalAlterar = () => setShow(false);

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
            onChange={buscarArea}
            style={{ marginBottom: 25, width: "70em", marginLeft: "5em" }}
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

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Nome</StyledTableCell>
                  <StyledTableCell>Alterar</StyledTableCell>
                  <StyledTableCell>Excluir</StyledTableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {area.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((
                  { id, nome }) => (
                  <StyledTableRow key={id}>
                    <StyledTableCell>{nome}</StyledTableCell>


                    <StyledTableCell>
                      <button className="botaoAlterarTurma" onClick={() => {
                        selecionarArea(id, nome)
                        abrirModalAlterar()
                      }}
                      >
                        <ModeEditOutlinedIcon /></button>

                    </StyledTableCell>
                    <StyledTableCell><button className="botaoDeleteTurma" onClick={() => {
                      abrirModalExcluir(id)
                    }}><DeleteForeverOutlinedIcon /></button>


                      <Modal
                        show={modalExcluir}
                        onHide={fecharModalExcluir}
                        backdrop="static"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered>


                        <Modal.Header closeButton className="bodyExcluir">
                          <Modal.Title className='tituloExcluir'>ALERTA!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                          <h4 className="textoExcluir">Tem Certeza que deseja excluir?</h4>

                        </Modal.Body>

                        <Modal.Footer className="botaoModalExcluir">
                          <Button variant="contained" color="error" className="botaoModalSim" onClick={fecharModalExcluir}>
                            Não
                          </Button>
                          <Button variant="contained" color="success" onClick={() => {
                            //excluir curso pelo id
                            deletar(idArea)
                            fecharModalExcluir()
                          }}>
                            Sim
                          </Button>
                        </Modal.Footer>

                      </Modal></StyledTableCell>
                  </StyledTableRow>
                ))
                }
                {!removeLoad && <Load />}
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

              count={area.length}

              rowsPerPage={rowsPerPage}

              page={page}

              labelRowsPerPage='Linhas por páginas'

              onPageChange={handleChangePage}

              onRowsPerPageChange={handleChangeRowsPerPage}

            />
          </TableContainer>

          <Modal


            show={modalCadastrar}
            onHide={fecharModalCadastrar}
            backdrop="static"
            keyboard={false}
            className="modaH"

          >
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

            <Modal.Header closeButton>
              <Modal.Title>Cadastrar</Modal.Title>
            </Modal.Header>

            <Modal.Body className="modaH">
              <form onSubmit={cadastrarArea} className="formArea">
                <TextField className="textField" required name="nome" type="text" label="Área:" variant="standard" />

                <div class="parteBotaoArea">
                  <Button variant="contained" color="success" type="submit" >cadastrar</Button>

                  <Button variant="contained" color="error" onClick={() => {
                    setShowCadastrar(false)
                  }} >Fechar</Button>
                </div>

              </form>

            </Modal.Body>

          </Modal>

          <Modal
            show={modalAlterar}
            onHide={fecharModalAlterar}
            backdrop="static"
            keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title>Alterar</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <form onSubmit={alterarArea} className="formArea">
                <TextField className="textField" required defaultValue={nome} name="nome" type="text" label="Área:" variant="standard" />

                <div class="parteBotaoArea">
                  <Button variant="contained" color="success" type="submit" >Alterar</Button>

                  <Button variant="contained" color="error" onClick={() => {
                    setShow(false)
                  }} >Fechar</Button>
                </div>

              </form>

            </Modal.Body>

          </Modal>

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
        </Box>
      </Box>
    </>

  )

}

export default ListaArea