import MenuLateral from "../../menu/MenuLateral";
import { Button, InputAdornment, Table, TableBody, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import TablePagination from '@mui/material/TablePagination';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useState, useEffect } from "react"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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

export default function LogCurso() {

    const [logCurso, setLogCurso] = useState([])

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
        let result = await fetch(`http://localhost:8080/api/log/logCurso`)
        result = await result.json();
        setLogCurso(result)

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


    console.log("del: ", del)

    return (

        <div className="tirarOverflow">

            <MenuLateral />

            <header>
                <div className="divBotaoAdd">
                    <Button className="botaoAdd" variant="contained" color="primary" onClick={() => {
                        window.location.href = 'http://localhost:3000/logs'

                    }}><ArrowBackIcon /></Button>
                </div>



            </header>

            <div className="botoesLogCondicional">
                <Button type="button" onClick={() => {

                    ativarCad()
                    setDel(false)
                    setAlt(false)

                }}>Cadastrados</Button>

                <Button type="button" onClick={() => {

                    ativarAlt()
                    setCad(false)
                    setDel(false)



                }}>Alterados</Button>

                <Button type="button" onClick={() => {

                    ativarDelete()
                    setCad(false)
                    setAlt(false)

                }}>Excluidos</Button>

            </div>

            <div className="conteudoTabela">
                <TableContainer className="tabelaContainer">

                    <Table sx={{ minWidth: 1500 }} aria-label="customized table" className="tabelaTurma">
                        <TableHead className="theadTurma">

                            <TableRow>

                                {

                                    cad === true
                                        ?
                                        <>
                                            <StyledTableCell>Mensagem</StyledTableCell>
                                            <StyledTableCell>Nif</StyledTableCell>
                                            <StyledTableCell>Data</StyledTableCell>
                                            <StyledTableCell>Hora</StyledTableCell>
                                            <StyledTableCell>Excluir</StyledTableCell>
                                        </>
                                        :
                                        del === true || alt === true
                                        ?
                                        <>
                                            <StyledTableCell>Mensagem</StyledTableCell>
                                            <StyledTableCell>Nif</StyledTableCell>
                                            <StyledTableCell>Justificativa</StyledTableCell>
                                            <StyledTableCell>Data</StyledTableCell>
                                            <StyledTableCell>Hora</StyledTableCell>
                                            <StyledTableCell>Excluir</StyledTableCell>
                                            </>
                                        :
                                        <>
                                            <StyledTableCell>Mensagem</StyledTableCell>
                                            <StyledTableCell>Nif</StyledTableCell>
                                            <StyledTableCell>Data</StyledTableCell>
                                            <StyledTableCell>Hora</StyledTableCell>
                                            <StyledTableCell>Excluir</StyledTableCell>
                                            </>


                                }

                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {logCurso.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(
                                ({ nomeUsuario, hora, data, logsEnum, nifUsuario, id, informacaoCadastro, justificativa, logsEnumString }) => (

                                    <StyledTableRow>

                                        {

                                            cad === true

                                                ?
                                                <>

                                                    {
                                                        logsEnum === "CADASTROU"
                                                            ?
                                                            <>
                                                                <StyledTableCell>{nomeUsuario} cadastrou um curso chamado {informacaoCadastro} </StyledTableCell>
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
                                                                    <StyledTableCell>{nomeUsuario} alterou um curso chamado {informacaoCadastro} </StyledTableCell>
                                                                    <StyledTableCell>{nifUsuario}</StyledTableCell>
                                                                    <StyledTableCell>{justificativa}</StyledTableCell>
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
                                                                        <StyledTableCell>{nomeUsuario} {logsEnumString} uma área chamada {informacaoCadastro} </StyledTableCell>
                                                                        <StyledTableCell>{nifUsuario}</StyledTableCell>
                                                                        <StyledTableCell>{justificativa}</StyledTableCell>
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
                                                            <StyledTableCell>{nomeUsuario} {logsEnumString} um curso chamado {informacaoCadastro} </StyledTableCell>
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

                        count={logCurso.length}

                        rowsPerPage={rowsPerPage}

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
            </div>

        </div>

    )
}