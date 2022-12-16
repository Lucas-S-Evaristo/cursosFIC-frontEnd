import React, { useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from "@mui/material/Button";
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import { CurtainsOutlined } from "@mui/icons-material";
import './turma.css'
import MenuLateral from "../menu/MenuLateral";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import OutlinedInput from '@mui/material/OutlinedInput';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import TablePagination from '@mui/material/TablePagination';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuItem from '@mui/material/MenuItem';

import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ArrowBack from "@mui/icons-material/ArrowBack";
import { yellow } from "@mui/material/colors";
import { maxWidth } from "@mui/system";
import { Toolbar } from "@mui/material";
import { InputAdornment } from "@mui/material";
import { createTheme, makeStyles } from "@material-ui/core";

const ITEM_HEIGHT = 48;

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

const tema = createTheme({
    palette: {
      primary: {
        main: "#DADADA"
      }
    }
  })

const drawerWidth = 240;

const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        width: 0
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        //backgroundColor: theme.palette.action.hover,
        width: 0,
        backgroundColor: tema.palette.primary.main,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function Tarefas() {

    const classes = useStyles();

    //  USE ESTATE USADO PARA CONTROLAR O ESTADO DE UMA VARIAVEL

    // variavel que tem acesso a um array com todas as turmas
    const [turmas, setTurma] = useState([])
    const moment = require('moment')
    // variavel que tem acesso a um array com o status
    const [status, setStatus] = useState([])
    // variavel que tem acesso a um array com o status
    const [ValueStatus, setvalueStatus] = useState([])

    const [idTurma, setidTurma] = useState([]);

    // estado do obj da turma
    const [objTurma, setObjTurma] = useState()
    // estado da modal
    const [open, setOpen] = useState(false)


    const [modalAlt, setModalAlt] = useState(false)
    // metodo que abre a modal
    const handleOpen = () => setOpen(true);
    // metodo que fecha a modal
    const handleClose = () => setOpen(false);

    const handleClose2 = () => setOpen(false);
    const values = {
        someDate: "2022-09-19"
    };



    // REQUISIÇÃO GET PARA PUXAR TODAS AS TURMAS
    useEffect(() => {
        fetch("http://localhost:8080/api/turma")
            .then(resp => resp.json())
            .then(retorno_convertido => setTurma(retorno_convertido)) //lista de turmas

    }, [])

    useEffect(() => {
        fetch("http://localhost:8080/api/enum/status")
            .then(resp => resp.json())
            .then(retorno_convertido => setStatus(retorno_convertido)) //lista de status
    }, [])
    // metodo que atualiza a lista, puxando todos a turma cadastrada da rest api  
    const atualizaLista = async () => {
        const result = await fetch("http://localhost:8080/api/turma")  // await = espera uma promessa
        const resultado = await result.json();
        setTurma(resultado)

    }

    // metodo que deleta a turma

    const buscarTarefa = async (event) => {
        // valor que esta sendo digitado no input de pesquisa
        let key = event.target.value;

        // verifica se existe 'valor'
        if (key) {
            // fazendo uma requisição na api de busca e passando a key
           
            let result = await fetch(
                `http://localhost:8080/api/turma/buscarDataTarefa/`,
                {
                    method: "post",

                    body: JSON.stringify(key),

                    headers: {
                        "Content-type": "application/json",

                        Accept: "application/json",
                    },
                }
            );
            // tranformando a promessa em json
            result = await result.json();

            // verifica se existe algum resultado
            if (result) {
                // setando as turmas que a api retornou de sua resposta de busca
                setTurma(result);
            }

            // caso não exista chave, atualiza a lista
        } else {
            atualizaLista();
        }
    };



    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [page, setPage] = React.useState(0);

    const handleChangePage = (event, newPage) => {

        setPage(newPage);

    };

    const handleChangeRowsPerPage = (event) => {

        setRowsPerPage(parseInt(event.target.value, 10));

        setPage(0);

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
                        style={{ margin: 10, fontWeight: "bold", backgroundColor: "black", borderRadius: "2em", float: "right" }}
                        variant="contained"
                        size="large"
                        href="/"
                        className={classes.button, "botaoTarefaTurma"}
                        startIcon={<ArrowBackIcon />}
                    >
                        Voltar
                    </Button>

                    <TextField

                        fullWidth
                        onChange={buscarTarefa}
                        style={{ marginBottom: 25, width: "37em", marginLeft: "5em" }}
                        label="buscar Cursos"
                        id="fullWidth"
                        min="2021-01-01" max="2050-12-31"
                        type="date"
                        name="parametro"
                        onInput={(e) => {

                            e.target.value = (e.target.value).toString().slice(0, 10)

                        }}
                        required="required"
                        InputProps={{
                            maxLength: 12,
                            startAdornment: (

                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),

                            inputMode: "email",
                        }}
                    />

                    <TableContainer component={Paper}>
                        <Table aria-label="customized table">
                            <TableHead>

                                <TableRow>
                                    <StyledTableCell sx={maxWidth}>Turma</StyledTableCell>
                                    <StyledTableCell>Data lim. para insc.</StyledTableCell>
                                    <StyledTableCell>Retirada do Site</StyledTableCell>
                                    <StyledTableCell>Cobrar Entrega do Documento</StyledTableCell>
                                    <StyledTableCell>Verificar PCDs</StyledTableCell>
                                    <StyledTableCell>Gerar Diario Eletronica</StyledTableCell>
                                    <StyledTableCell>Montar Kit de Turma</StyledTableCell>
                                    <StyledTableCell>iniciar Turma</StyledTableCell>
                                    <StyledTableCell>Matricula Definitiva</StyledTableCell>
                                    <StyledTableCell>Encerrar Turma</StyledTableCell>
                                    <StyledTableCell>Confirmar Turma</StyledTableCell>
                                    <StyledTableCell>Escanear Documento</StyledTableCell>
                                    <StyledTableCell>Verificar Quem Faltou no 1°dia</StyledTableCell>





                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {turmas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    /*dataLimInscricao: "",
                                    confirmarTurma: "",
                                    retiradaSite: "",
                                    cobrarEntregaDocum: "",
                                    verificarPCDs: "",
                                    gerarDiarioEletr: "",
                                    montarKitTurma: "",
                                    verifQuemFaltouPrimDia: "",
                                    iniciarTurma: "",
                                    matriculaDefinitiva: "",
                                    encerrarTurma: "",
                                    escanearDocum: "",
                                    simEnao: false*/
                                    .map(({ codigo, dataLimInscricao, confirmarTurma, retiradaSite, cobrarEntregaDocum,
                                        verificarPCDs, gerarDiarioEletr, montarKitTurma, verifQuemFaltouPrimDia, iniciarTurma, matriculaDefinitiva, encerrarTurma, escanearDocum }) => (
                                        <StyledTableRow >

                                            <StyledTableCell>{codigo}</StyledTableCell>
                                            <StyledTableCell>{moment(escanearDocum).format('DD/MM/YYYY')}</StyledTableCell>
                                            <StyledTableCell>{moment(retiradaSite).format('DD/MM/YYYY')}</StyledTableCell>
                                            <StyledTableCell>{moment(cobrarEntregaDocum).format('DD/MM/YYYY')}</StyledTableCell>
                                            <StyledTableCell>{moment(verificarPCDs).format('DD/MM/YYYY')}</StyledTableCell>
                                            <StyledTableCell>{moment(gerarDiarioEletr).format('DD/MM/YYYY')}</StyledTableCell>
                                            <StyledTableCell>{moment(montarKitTurma).format('DD/MM/YYYY')}</StyledTableCell>
                                            <StyledTableCell>{moment(iniciarTurma).format('DD/MM/YYYY')}</StyledTableCell>
                                            <StyledTableCell>{moment(matriculaDefinitiva).format('DD/MM/YYYY')}</StyledTableCell>
                                            <StyledTableCell>{moment(encerrarTurma).format('DD/MM/YYYY')}</StyledTableCell>
                                            <StyledTableCell>{moment(confirmarTurma).format('DD/MM/YYYY')}</StyledTableCell>
                                            <StyledTableCell>{moment(escanearDocum).format('DD/MM/YYYY')}</StyledTableCell>
                                            <StyledTableCell>{moment(verifQuemFaltouPrimDia).format('DD/MM/YYYY')}</StyledTableCell>



                                        </StyledTableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                        <TablePagination

                            sx={{
                                width: "1600px",
                                marginTop: "40px",
                                position: "fixed",
                                alignItems: "center",

                                textAlign: "center",

                            }}

                            rowsPerPageOptions={[3, 5, 10, 15]}

                            component="div"

                            count={turmas.length}

                            rowsPerPage={rowsPerPage}

                            page={page}

                            onPageChange={handleChangePage}

                            onRowsPerPageChange={handleChangeRowsPerPage}

                        />
                    </TableContainer>
                </Box>
            </Box>


        </>
    )
}

const styleTextField = {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '2em'



};


const estiloData = {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '2em',

}

const styleTitle = {

    textAlign: 'center',
    marginBottom: '30px',
    color: 'blue'

};

const styletSearch = {
    border: '2px solid blue',
    alignItems: 'center',
    marginLeft: '500px',
    padding: '10px',
    borderRadius: '6px',
    marginBottom: '30px',
    boxShadow: 24,

}

const snackStyle = {

    float: 'right'
}

const style = {
    position: 'absolute',
    top: '50%',
    display: 'flex',
    flexDirection: 'row',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default Tarefas;