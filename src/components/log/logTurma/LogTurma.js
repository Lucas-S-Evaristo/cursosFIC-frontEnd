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

export default function LogTurma() {

    const [logTurma, setLogTurma] = useState([])

    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [page, setPage] = useState(0);

    const handleChangePage = (event, newPage) => {

        setPage(newPage);

    };

    const handleChangeRowsPerPage = (event) => {

        setRowsPerPage(parseInt(event.target.value, 10));

        setPage(0);
    };

    const getLog = async () => {
        let result = await fetch(`http://localhost:8080/api/log/logTurma`)
        result = await result.json();
        setLogTurma(result)

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


    console.log("cad false: ", cad)

    return (

        <div>

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
                    console.log("clique 1")



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
                                            <StyledTableCell>CodigoTurma</StyledTableCell>
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
                                                <StyledTableCell>CodigoTurma</StyledTableCell>
                                                <StyledTableCell>Nif</StyledTableCell>
                                                <StyledTableCell>Justificativa</StyledTableCell>
                                                <StyledTableCell>Data</StyledTableCell>
                                                <StyledTableCell>Hora</StyledTableCell>
                                                <StyledTableCell>Excluir</StyledTableCell>
                                            </>
                                            :
                                            <>
                                                <StyledTableCell>Mensagem</StyledTableCell>
                                                <StyledTableCell>CodigoTurma</StyledTableCell>
                                                <StyledTableCell>Nif</StyledTableCell>
                                                <StyledTableCell>Data</StyledTableCell>
                                                <StyledTableCell>Hora</StyledTableCell>
                                                <StyledTableCell>Excluir</StyledTableCell>
                                            </>


                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {logTurma.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(
                                ({ nomeUsuario, hora, data, logsEnum, nifUsuario, id, justificativa, codigoTurma }) => (

                                    <StyledTableRow>

                                        {

                                            cad === true

                                                ?
                                                <>

                                                    {
                                                        logsEnum === "CADASTROU"
                                                            ?
                                                            <>
                                                                <StyledTableCell>O usuário {nomeUsuario} {logsEnum} uma turma</StyledTableCell>
                                                                <StyledTableCell>{codigoTurma}</StyledTableCell>
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
                                                                    <StyledTableCell>O usuário {nomeUsuario} {logsEnum} uma turma</StyledTableCell>
                                                                    <StyledTableCell>{codigoTurma}</StyledTableCell>
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
                                                                        <StyledTableCell>O usuário {nomeUsuario} {logsEnum} uma turma</StyledTableCell>
                                                                        <StyledTableCell>{codigoTurma}</StyledTableCell>
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
                                                            <StyledTableCell>O usuário {nomeUsuario} {logsEnum} uma turma</StyledTableCell>
                                                            <StyledTableCell>{codigoTurma}</StyledTableCell>
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

                        count={logTurma.length}

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