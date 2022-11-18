import { Button, InputAdornment, Table, TableBody, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
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

let token = sessionStorage.getItem("token")

function ListaParametro() {

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
            " Não e possível deletar a área porque ela está associada á um Curso ",
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


    const [idParametro, setIdParametro] = useState()
    const [parametro, setParametro] = useState([])

    const [pontoEquilibrio, setPontoEquilibrio] = useState([])

    const [parcelaBoleto, setParcelaBoleto] = useState([])

    const [parcelaCartao, setParcelaCartao] = useState([])

    const [telefone, setTelefone] = useState([])

    const [endereco, setEndereco] = useState([])

    const cadastrarParametro = async (event) => {

        event.preventDefault()

        const formData = new FormData(event.target)
        const data = Object.fromEntries(formData)

        let parametro = {
            pontoEquilibrio: data.pontoEquilibrio,
            telefone: data.telefone,
            endereco: data.endereco,
            parcelaBoleto: data.parcelaBoleto,
            parcelaCartao: data.parcelaCartao

        }
        console.warn(data)
        console.log(parametro)

        let result = await fetch(`http://localhost:8080/api/parametro`, {
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


        } else {
            cadastroSucesso()
            setShowCadastrar(false)
            getParametro()
        }

    }

    const alterarParametro = async (event) => {

        event.preventDefault()

        const formData = new FormData(event.target)
        const data = Object.fromEntries(formData)

        let obgj = {
            id: idParametro,
            pontoEquilibrio: data.pontoEquilibrio,
            telefone: data.telefone,
            endereco: data.endereco,
            parcelaBoleto: data.parcelaBoleto,
            parcelaCartao: data.parcelaCartao

        }

        let result = await fetch(`http://localhost:8080/api/parametro/${idParametro}`, {
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
            getParametro()
        }
    }

    const deletar = async (id) => {
        let result = await fetch(`http://localhost:8080/api/parametro/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": token
            }

        })
        // caso já exista uma parametro a ser deletado, ele atualiza a lista assim removendo a parametro deletada
        if (result.status === 409) {
            msgDeletadoerror();


        } else if (result) {
            getParametro()
            excluirSucesso()

        }
    }

    const getParametro = async () => {
        let result = await fetch(`http://localhost:8080/api/parametro`)
        result = await result.json();
        setParametro(result)

    }

    useEffect(() => {
        getParametro();

    }, []);

    const selecionarParametro = (id, pontoEquilibrio, parcelaBoleto, parcelaCartao, telefone, endereco) => {

        setIdParametro(id)
        setParcelaBoleto(parcelaBoleto)
        setParcelaCartao(parcelaCartao)
        setPontoEquilibrio(pontoEquilibrio)
        setTelefone(telefone)
        setEndereco(endereco)

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

    // metodo que busca uma Parametro
    const buscarParametro = async (event) => {
        // valor que esta sendo digitado no input de pesquisa
        let key = event.target.value;
        console.log(key);

        // verifica se existe 'valor'
        if (key) {
            // fazendo uma requisição na api de buscar e passando a key
            let result = await fetch(
                "http://localhost:8080/api/parametro/buscar/" + key
            );
            // tranformando a promessa em json
            result = await result.json();
            console.log(result);

            // verifica se existe algum resultado
            if (result) {
                // setando as parametros que a api retornou de sua resposta de busca
                setParametro(result);
            }

            // caso não exista chave, atualiza a lista
        } else {
            getParametro();
        }
    };

    const [modalCadastrar, setShowCadastrar] = useState(false);

    const [modalAlterar, setShow] = useState(false);

    const abrirModalCadastrar = () => setShowCadastrar(true);

    const fecharModalCadastrar = () => setShowCadastrar(false);

    const [modalExcluir, setShowExcluir] = useState(false);

    const abrirModalExcluir = () => setShowExcluir(true);

    const fecharModalExcluir = () => setShowExcluir(false);

    //quando handleShow é chamado ele da um true no show e abre a modal
    const abrirModalAlterar = () => setShow(true);

    //quando handleClose é chamado ele da um false no show e fecha a modal
    const fecharModalAlterar = () => setShow(false);

    return (
        <>
            <MenuLateral />
            <header>
                <div className="divBotaoAdd">
                    <Button className="botaoAdd" onClick={abrirModalCadastrar} variant="contained" color="primary"><AddOutlinedIcon />Novo</Button>
                </div>

                <form className="formBusca">
                    <TextField
                        id="input-with-icon-textfield"
                        label="TextField"
                        onChange={buscarParametro}
                        className="areaPesquisa"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchTwoToneIcon />
                                </InputAdornment>
                            ),
                        }}
                        variant="standard"
                    />
                </form>

            </header>

            <div className="conteudoTabela">
                <TableContainer className="tabelaContainer">

                    <Table sx={{ minWidth: 1500 }} aria-label="customized table" className="tabelaTurma">
                        <TableHead className="theadTurma">
                            <TableRow>
                                <StyledTableCell>Id</StyledTableCell>
                                <StyledTableCell>Ponto de equilibrio</StyledTableCell>
                                <StyledTableCell>Parcelas Boleto</StyledTableCell>
                                <StyledTableCell>Parcelas Cartão</StyledTableCell>
                                <StyledTableCell>Telefone</StyledTableCell>
                                <StyledTableCell>Endereço</StyledTableCell>
                                <StyledTableCell>Alterar</StyledTableCell>
                                <StyledTableCell>Excluir</StyledTableCell>


                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {parametro.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((
                                { id, pontoEquilibrio, parcelaBoleto, parcelaCartao, telefone, endereco }) => (
                                <StyledTableRow>

                                    <StyledTableCell>{id}</StyledTableCell>
                                    <StyledTableCell>{pontoEquilibrio}</StyledTableCell>
                                    <StyledTableCell>{parcelaBoleto}</StyledTableCell>
                                    <StyledTableCell>{parcelaCartao}</StyledTableCell>
                                    <StyledTableCell>{telefone}</StyledTableCell>
                                    <StyledTableCell>{endereco}</StyledTableCell>

                                    <StyledTableCell>
                                        <button className="botaoAlterarTurma" onClick={() => {
                                            selecionarParametro(id, pontoEquilibrio, parcelaBoleto, parcelaCartao, telefone, endereco)
                                            abrirModalAlterar()
                                        }}
                                        >
                                            <ModeEditOutlinedIcon /></button>

                                    </StyledTableCell>
                                    <StyledTableCell><button className="botaoDeleteTurma" onClick={abrirModalExcluir}><DeleteForeverOutlinedIcon /></button>


                                        <Modal
                                            show={modalExcluir}
                                            onHide={fecharModalExcluir}
                                            backdrop="static"
                                            aria-labelledby="contained-modal-title-vcenter"
                                            centered>


                                            <Modal.Header closeButton className="bodyExcluir">
                                                <Modal.Title className='tituloExcluir'>ALERTA!</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body><h4 className="textoExcluir">Tem Certeza que deseja excluir?</h4></Modal.Body>

                                            <Modal.Footer className="botaoModalExcluir">
                                                <Button variant="contained" color="error" className="botaoModalSim" onClick={fecharModalExcluir}>
                                                    Não
                                                </Button>
                                                <Button variant="contained" color="success" onClick={() => {
                                                    //excluir curso pelo id
                                                    deletar(id)
                                                    fecharModalExcluir()
                                                }}>
                                                    Sim
                                                </Button>
                                            </Modal.Footer>

                                        </Modal></StyledTableCell>
                                </StyledTableRow>
                            ))
                            }
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

                        count={parametro.length}

                        rowsPerPage={rowsPerPage}

                        page={page}

                        onPageChange={handleChangePage}

                        onRowsPerPageChange={handleChangeRowsPerPage}

                    />
                </TableContainer>

                <Modal
                    show={modalCadastrar}
                    onHide={fecharModalCadastrar}
                    backdrop="static"
                    keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cadastrar</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form onSubmit={cadastrarParametro} className="formArea">
                            <TextField className="textField" name="pontoEquilibrio" type="text" label="Ponto de equilibrio:" variant="standard" />

                            <TextField className="textField" name="parcelaBoleto" type="text" label="Parcelas Boleto:" variant="standard" />

                            <TextField className="textField" name="parcelaCartao" type="text" label="Parcelas Cartão:" variant="standard" />

                            <TextField className="textField" name="telefone" type="text" label="Telefone:" variant="standard" />

                            <TextField className="textField" name="endereco" type="text" label="Endereço:" variant="standard" />

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
                        <form onSubmit={alterarParametro} className="formArea">

                            <TextField className="textField" name="pontoEquilibrio" defaultValue={pontoEquilibrio} type="text" label="Ponto de equilibrio:" variant="standard" />

                            <TextField className="textField" name="parcelaBoleto" defaultValue={parcelaBoleto} type="text" label="Parcelas Boleto:" variant="standard" />

                            <TextField className="textField" name="parcelaCartao" defaultValue={parcelaCartao} type="text" label="Parcelas Cartão:" variant="standard" />

                            <TextField className="textField" name="telefone" defaultValue={telefone} type="text" label="Telefone:" variant="standard" />

                            <TextField className="textField" name="endereco" defaultValue={endereco} type="text" label="Endereço:" variant="standard" />

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

            </div>

        </>

    )

}

export default ListaParametro