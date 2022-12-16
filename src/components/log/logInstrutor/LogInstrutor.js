import MenuLateral from "../../menu/MenuLateral";
import { Button, InputAdornment, Table, TableBody, TableContainer, TableHead, TableRow, TextField, Toolbar } from "@mui/material"
import TablePagination from '@mui/material/TablePagination';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useState, useEffect } from "react"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { makeStyles, Paper } from "@material-ui/core";
import { Box, createTheme } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";

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
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function LogInstrutor() {

    const classes = useStyles();

    const [logInstrutor, setLogInstrutor] = useState([])

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [page, setPage] = useState(0);

    const handleChangePage = (event, newPage) => {

        setPage(newPage);

    };

    const handleChangeRowsPerPage = (event) => {

        setRowsPerPage(parseInt(event.target.value, 10));

        setPage(0);
    };

    const getLog = async () => {
        let result = await fetch(`http://localhost:8080/api/log/logInstrutor`)
        result = await result.json();
        setLogInstrutor(result)

    }

    useEffect(() => {
        getLog();

    }, []);

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


    const deletar = async (id) => {
        let result = await fetch(`http://localhost:8080/api/log/${id}`, {
            method: "DELETE"
        })

        if (result) {
            getLog()
            excluirSucesso()

        }
    }
    const [cad, setCad] = useState(false)

    const [alt, setAlt] = useState(false)

    const [del, setDel] = useState(false)

    const ativarCad = () => {
        setCad(true)
    }

    const ativarAlt = () => {
        setAlt(true)
    }

    const ativarDelete = () => {
        setDel(true)
    }

    const atualizaLista = async () => {
        const result = await fetch("http://localhost:8080/api/log/logInstrutor"); // await = espera uma promessa
        const resultado = await result.json();
        setLogInstrutor(resultado);
      };

    const buscaInstrutor = async (event) => {
        // valor que esta sendo digitado no input de pesquisa
        let key = event.target.value;
    
    
        // verifica se existe 'valor'
        if (key) {
          // fazendo uma requisição na api de buscar e passando a key
          let result = await fetch(
            "http://localhost:8080/api/log/buscarInstrutor/", {
    
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
            setLogInstrutor(result);
          }
    
          // caso não exista chave, atualiza a lista
        } else {
          atualizaLista();
        }
      };

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
                        style={{ margin: 10, fontWeight: "bold", backgroundColor: "black" }}
                        variant="contained"
                        size="large"
                        onClick={() => {
                            window.location.href = 'http://localhost:3000/logs'

                        }}
                        className={classes.button}
                        startIcon={<ArrowBackIcon />}
                    >
                    </Button>

                    <Toolbar />

                    

                    <div className="divLogsCad">

                   
                        

                    <Button type="button" onClick={() => {

                        ativarCad()
            
                    }}>Cadastrados</Button>

                    <Button type="button" onClick={() => {

                        ativarAlt()
                        setCad(false)



                    }}>Alterados</Button>

                    <Button type="button" onClick={() => {

                        ativarDelete()
                        setCad(false)
                        setAlt(false)

                    }}>Excluidos</Button>

                            </div>

                            <TextField
            fullWidth
            onChange={buscaInstrutor}
            style={{ width: "37em", display: "flex", flexDirection: "row", margin: "2em auto" }}
            label="Pesquise aqui;"
            id="fullWidth"
            type="curso"
            name="parametro"
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
                            <TableHead className="theadTurma">

                                <TableRow>

                                    <StyledTableCell>Mensagem</StyledTableCell>
                                    <StyledTableCell>Nif de quem fez a ação:</StyledTableCell>
                                    <StyledTableCell>Data</StyledTableCell>
                                    <StyledTableCell>Hora</StyledTableCell>
                                    <StyledTableCell>Excluir</StyledTableCell>


                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {logInstrutor.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(
                                    ({ nomeUsuario, hora, data, logsEnum, nifUsuario, id, informacaoCadastro, logsEnumString }) => (

                                        <StyledTableRow>

                                            {

                                                cad === true

                                                    ?
                                                    <>

                                                        {
                                                            logsEnum === "CADASTROU"
                                                                ?
                                                                <>
                                                                    <StyledTableCell>{nomeUsuario} {logsEnumString} um instrutor com o seguinte nome: {informacaoCadastro}</StyledTableCell>
                                                                    <StyledTableCell>{nifUsuario}</StyledTableCell>
                                                                    <StyledTableCell>{data}</StyledTableCell>
                                                                    <StyledTableCell>{hora}</StyledTableCell>
                                                                    <StyledTableCell><button className="botaoDeleteTurma" onClick={() => deletar(id)}><DeleteForeverOutlinedIcon /></button></StyledTableCell>
                                                                </>
                                                                :
                                                                <></>
                                                        }


                                                    </>
                                                    :

                                                    alt === true
                                                        ?
                                                        <>
                                                            {
                                                                logsEnum === "ALTEROU"
                                                                    ?
                                                                    <>
                                                                        <StyledTableCell>{nomeUsuario} {logsEnumString} um instrutor com o seguinte nome: {informacaoCadastro}</StyledTableCell>
                                                                        <StyledTableCell>{nifUsuario}</StyledTableCell>
                                                                        <StyledTableCell>{data}</StyledTableCell>
                                                                        <StyledTableCell>{hora}</StyledTableCell>
                                                                        <StyledTableCell><button className="botaoDeleteTurma" onClick={() => deletar(id)}><DeleteForeverOutlinedIcon /></button></StyledTableCell>
                                                                    </>
                                                                    :
                                                                    <></>
                                                            }
                                                        </>
                                                        :

                                                        del === true
                                                            ?
                                                            <>
                                                                {
                                                                    logsEnum === "DELETOU"
                                                                        ?
                                                                        <>
                                                                            <StyledTableCell>{nomeUsuario} {logsEnumString} um instrutor com o seguinte nome: {informacaoCadastro}</StyledTableCell>
                                                                            <StyledTableCell>{nifUsuario}</StyledTableCell>
                                                                            <StyledTableCell>{data}</StyledTableCell>
                                                                            <StyledTableCell>{hora}</StyledTableCell>
                                                                            <StyledTableCell><button className="botaoDeleteTurma" onClick={() => deletar(id)}><DeleteForeverOutlinedIcon /></button></StyledTableCell>
                                                                        </>
                                                                        :
                                                                        <></>
                                                                }
                                                            </>
                                                            :
                                                            <>
                                                                <StyledTableCell>{nomeUsuario} {logsEnumString} um instrutor com o seguinte nome: {informacaoCadastro}</StyledTableCell>
                                                                <StyledTableCell>{nifUsuario}</StyledTableCell>
                                                                <StyledTableCell>{data}</StyledTableCell>
                                                                <StyledTableCell>{hora}</StyledTableCell>
                                                                <StyledTableCell><button className="botaoDeleteTurma" onClick={() => deletar(id)}><DeleteForeverOutlinedIcon /></button></StyledTableCell>
                                                            </>
                                            }

                                        </StyledTableRow>
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

                            count={logInstrutor.length}

                            rowsPerPage={rowsPerPage}

                            labelRowsPerPage='Linhas por páginas'

                            page={page}

                            onPageChange={handleChangePage}

                            onRowsPerPageChange={handleChangeRowsPerPage}

                        />

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
                    </TableContainer>
                </Box>
            </Box>
        </>
    )
}