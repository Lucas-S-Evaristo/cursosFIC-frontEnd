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

import MenuItem from '@mui/material/MenuItem';

import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ArrowBack from "@mui/icons-material/ArrowBack";
import { yellow } from "@mui/material/colors";
import { maxWidth } from "@mui/system";
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
        width: 0
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        //backgroundColor: theme.palette.action.hover,
        width:0
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function Tarefas() {

    //  USE ESTATE USADO PARA CONTROLAR O ESTADO DE UMA VARIAVEL

    // variavel que tem acesso a um array com todas as turmas
    const [qtdMatriculas, setqtdMatriculas] = useState()
    // variavel que tem acesso a um array com todas as turmas
    const [turmas, setTurma] = useState([])
    // variavel que tem acesso a um array com os instrutores
    const [instrutor, setInstrutor] = useState([])
    // variavel que tem acesso a um array com os instrutores
    const [idInstrutor, setidInstrutor] = useState([])
    // variavel que tem acesso a um array com o horario
    const [idhorario, sethorario] = useState()
    // variavel que tem acesso a um array com os cursos
    const [curso, setCurso] = useState([])
    const [dataInicio, setDataInicio] = useState()
    const [dataTermino, setDataTermino] = useState()
    const [simEnao, setsimEnao] = useState();
    // variavel que tem acesso a um array com os cursos
    const [idCurso, setidCurso] = useState([])
    // variavel que tem acesso a um array com os cursos setnumMaxVagas
    const [codigo, setCodigo] = useState()
    // variavel que tem acesso a um array com os cursos
    const [valor, setValor] = useState()
    // variavel que tem acesso a um array com os cursos
    const [numMaxVagas, setnumMaxVagas] = useState()
    const [numMinVagas, setnumMinVagas] = useState()
    // variavel que tem acesso a um array com o periodo
    const [periodo, setPeriodo] = useState([])
    // variavel que tem acesso a um array com o periodo
    const [ValuePeriodo, setvaluePeriodo] = useState([])
    // variavel que tem acesso a um array com o status
    const [status, setStatus] = useState([])
    // variavel que tem acesso a um array com o status
    const [ValueStatus, setvalueStatus] = useState([])
    // variavel que tem acesso a um array com o ambiente
    const [ambiente, setAmbiente] = useState([])
    // variavel que tem acesso a um array com o ambiente
    const [idAmbiente, setidAmbiente] = useState([])
    // variavel que tem acesso a um array com os dias da semana
    const [diaSemana, setDiaSemana] = useState([])
    // variavel que tem acesso a um array com os dias da semana
    const [valuediaSemana, setvalueDiaSemana] = useState([])

    const [idTurma, setidTurma] = useState([]);





    const dataInicioFormatada = dataInicio;
    const dataTerminoFormatada = dataTermino;


    const valorValue = (e) => {



        setValor({ ...valor, [e.target.name]: e.target.value })

    }

    const statusValor = (e) => {



        setStatus({ ...status, [e.target.name]: e.target.value })

    }

    const cursoAlt = (e) => {



        setCurso({ ...curso, [e.target.name]: e.target.value })

    }

    const turma = {
        id: 0,
        qtdMatriculas: qtdMatriculas,
        instrutor: { id: idInstrutor },
        curso: { id: idCurso },
        periodo: ValuePeriodo,
        horario: idhorario,
        dataInicio: dataInicioFormatada,
        dataTermino: dataTerminoFormatada,
        valor: valor,
        status: ValueStatus,
        ambiente: { id: idAmbiente },
        numMaxVagas: numMaxVagas,
        numMinVagas: numMinVagas,
        simEnao: simEnao,
        diaSemana: valuediaSemana,
        dataLimInscricao: "",
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
        simEnao: false
    }
    // estado do obj da turma
    const [objTurma, setObjTurma] = useState(turma)
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


 console.log("oooooooooooooooooooooo ",idCurso.id)
    // REQUISIÇÃO GET PARA PUXAR TODAS AS TURMAS
    useEffect(() => {
        fetch("http://localhost:8080/api/turma")
            .then(resp => resp.json())
            .then(retorno_convertido => setTurma(retorno_convertido)) //lista de turmas
    }, [])

    useEffect(() => {
        fetch("http://localhost:8080/api/instrutor")
            .then(resp => resp.json())
            .then(retorno_convertido => setInstrutor(retorno_convertido)) //lista de instrutores
    }, [])

    useEffect(() => {
        fetch("http://localhost:8080/api/horario")
            .then(resp => resp.json())
            .then(retorno_convertido => sethorario(retorno_convertido)) //lista de horario
    }, [])

    useEffect(() => {
        fetch("http://localhost:8080/api/curso")
            .then(resp => resp.json())
            .then(retorno_convertido => setCurso(retorno_convertido)) //lista de curso
    }, [])

    useEffect(() => {
        fetch("http://localhost:8080/api/enum/periodo")
            .then(resp => resp.json())
            .then(retorno_convertido => setPeriodo(retorno_convertido)) //lista de periodos
    }, [])

    useEffect(() => {
        fetch("http://localhost:8080/api/enum/status")
            .then(resp => resp.json())
            .then(retorno_convertido => setStatus(retorno_convertido)) //lista de status
    }, [])

    useEffect(() => {
        fetch("http://localhost:8080/api/ambiente")
            .then(resp => resp.json())
            .then(retorno_convertido => setAmbiente(retorno_convertido)) //lista de ambiente
    }, [])

    useEffect(() => {
        fetch("http://localhost:8080/api/enum/diasSemana")
            .then(resp => resp.json())
            .then(retorno_convertido => setDiaSemana(retorno_convertido)) //lista de dia da semana
    }, [])

    const erroDataIgual = () => {
        toast.error("A data de inicio não pode ser igual a data final!", {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: 'colored',
            draggable: true,
            progress: undefined,
        })
    }

    const erroDataMaiorFinal = () => {
        toast.error("A data de inicio não pode ser depois da data final!", {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: 'colored',
            draggable: true,
            progress: undefined,
        })
    }



    // metodo que efetua o cadastro da turma
    const cadastrar = () => {
        //requisição ao back end
        fetch("http://localhost:8080/api/turma", {
            method: 'post',
            body: JSON.stringify(turma),
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }

        })
            // convertendo a resposta da promessa em json
            .then(retorno => {

                if (retorno.status == 409) {

                    erroDataIgual()

                } else if (retorno.status == 418) {
                    erroDataMaiorFinal()
                } else {


                    retorno.json()
                        // pegando o retorno convertido
                        .then(retorno_convertido => {
                            // metodo que atualiza a lista, que faz com que ao clicar seja adicionado "automaticamente"
                            atualizaLista()

                            setInterval(function () { window.location.reload(); }, 1500);
                            // exibindo a msg de aviso de cadastro
                            msgCadastro()
                        })
                }
            })

    }



    // função que espera receber um id
    const alterar = async (event) => {

        const teste = document.getElementById("teste")

        const selectCurso = document.getElementById("selectCurso").value

        const selectAmbiente = document.getElementById("selectAmbiente").value

        const selectInstrutor = document.getElementById("selectInstrutor").value

        const qtdMatriculasAlt = document.getElementById("qtdMatriculas").value

        const dataInicioAlt = document.getElementById("dataInicio").value

        const dataTerminoAlt = document.getElementById("dataTermino").value

        const periodoAlt = document.getElementById("ValuePeriodo").value

        const valorAlt = document.getElementById("valor").value

        const statusAlt = document.getElementById("ValueStatus").value

        const numMaxvagaAlt = document.getElementById("numMaxVagas").value

        const numMinVagaAlt = document.getElementById("numMinVagas").value

        const diaSemanaAlt = document.getElementById("valuediaSemana").value

        const formData = new FormData(event.target);

        const data = Object.fromEntries(formData);
    
        console.log("formatadaTurma    ", data);

    
        let obgj = {
    
           
    
            id: idTurma,
             qtdMatriculas: data.qtdMatriculas,
            instrutor: { id: selectInstrutor},
            curso: { id: selectCurso },
            periodo: data.periodo,
            dataInicio: data.dataInicio,
            dataTermino: data.dataTermino,
            valor: data.valor,
            status: data.status,
            ambiente: { id: selectAmbiente},
            numMaxVagas: data.numMaxVagas,
            numMinVagas: data.numMinVagas,
            simEnao: data.simEnao,
            diaSemana: data.diaSemana,
        
    
        };
        console.log("obijeto truma ",obgj)


        let result = await fetch(

            "http://localhost:8080/api/turma/" +  idTurma,

            {

                method: "PUT",

                body: JSON.stringify(obgj),

                headers: {

                    "Content-type": "application/json",

                    Accept: "application/json",

                },

            }


        )
        if (result) {
            setOpen(false)
            setInterval(function () { window.location.reload(); }, 50);

        }

    };



    // metodo que capta a turma que foi selecionado
    const selecionarTurma = (id, codigo, curso, instrutor, qtdMatriculas, periodo, valor, status, ambiente, numMaxVagas, numMinVagas, diaSemana, dataInicio, dataTermino, objTurma) => {

        setidTurma(id)
        setCodigo(codigo)
        setidCurso(curso)
        setidInstrutor(instrutor)
        setqtdMatriculas(qtdMatriculas)
        setvaluePeriodo(periodo)
        setValor(valor)
        setvalueStatus(status)
        setidAmbiente(ambiente)
        setnumMaxVagas(numMaxVagas)
        setnumMinVagas(numMinVagas)
        setvalueDiaSemana(diaSemana)
        setDataInicio(dataInicio)
        setDataTermino(dataTermino)

    }
    // metodo que atualiza a lista, puxando todos a turma cadastrada da rest api  
    const atualizaLista = async () => {
        const result = await fetch("http://localhost:8080/api/turma")  // await = espera uma promessa
        const resultado = await result.json();
        setTurma(resultado)

    }

    // metodo que deleta a turma
    const deletar = async (id) => {
        let result = await fetch(`http://localhost:8080/api/turma/${id}`, {
            method: "DELETE"
        })
        // caso já exista uma turma a ser deletado, ele atualiza a lista assim removendo a turma deletado
        if (result) {
            atualizaLista()
            msgExclusao()
        }
    }

    const capturarDados = (e) => {




        setObjTurma({ ...objTurma, [e.target.name]: e.target.value });

    };

    // metodo que limpa os inputs do form
    const limparForm = () => {
        setObjTurma('')
    }



    // metodo que busca uma turma
    const buscaTurma = async (event) => {

        // valor que esta sendo digitado no input de pesquisa
        let key = event.target.value;

        // verifica se existe 'valor'
        if (key) {

            // fazendo uma requisição na api de busca e passando a key
            let result = await fetch("http://localhost:8080/api/turma/buscarTurma/" + key)
            // tranformando a promessa em json
            result = await result.json();


            // verifica se existe algum resultado
            if (result) {


                // setando as turmas que a api retornou de sua resposta de busca
                setTurma(result)
            }


            // caso não exista chave, atualiza a lista
        } else {
            atualizaLista();
        }
    }

    const buscaTurmaAno = async (event) => {

        // valor que esta sendo digitado no input de pesquisa
        let key = event.target.value;


        // verifica se existe 'valor'
        if (key) {

            // fazendo uma requisição na api de busca e passando a key
            let result = await fetch("http://localhost:8080/api/turma/buscarTurmaAno/" + key)
            // tranformando a promessa em json
            result = await result.json();


            // verifica se existe algum resultado
            if (result) {

                // setando as turmas que a api retornou de sua resposta de busca
                setTurma(result)
            }


            // caso não exista chave, atualiza a lista
        } else {
            atualizaLista();
        }
    }

    // toda vez que a modal é chamada, ela sera limpa e fechada
    const clearClose = () => {

        handleClose()
        limparForm()
    }

    const clearClose2 = () => {

        handleClose2()
        limparForm()
    }

    const [modalAlterar, setShow] = useState(false);

    const [modalCadastrar, setShowCadastrar] = useState(false);

    //quando handleClose é chamado ele da um false no show e fecha a modal
    const fecharModalAlterar = () => setShow(false);
    //quando handleShow é chamado ele da um true no show e abre a modal
    const abrirModalAlterar = () => setShow(true);

    const abrirModalCadastrar = () => setShowCadastrar(true);

    const fecharModalCadastrar = () => setShowCadastrar(false);


    // metodo de msg de cadastro efetuado com sucesso
    const msgCadastro = () => {
        toast.success("Turma Cadastrado com Sucesso", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: 'colored',
            // faz com que seja possivel arrastar
            draggable: true,
            progress: undefined
        })
    }

    // metodo de msg de exclusão feita com sucesso
    const msgExclusao = () => {

        toast.success("Turma Removido com Sucesso", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: 'colored',
            // faz com que seja possivel arrastar
            draggable: true,
            progress: undefined
        })
    }

    // metodo de msg de alteração feita com sucesso
    const msgAlteracao = () => {

        toast.warn("Turma Alterado com Sucesso", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: 'light',
            // faz com que seja possivel arrastar
            draggable: true,
            progress: undefined
        })


    }

    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [page, setPage] = React.useState(0);

    const handleChangePage = (event, newPage) => {

        console.log("EVENTO" + event);

        console.log("PAGINA" + newPage);

        setPage(newPage);

    };

    const handleChangeRowsPerPage = (event) => {

        setRowsPerPage(parseInt(event.target.value, 10));

        setPage(0);

    };
    
  


    return (

        <>
            <MenuLateral />

            <header>
                
                <div className="divTarefas">
                    <Button className="botaoVoltar" href="/" variant="contained" color="primary" ><ArrowBack/>   <i class="bi bi-plus-lg"></i>Voltar</Button>
                </div>
                <form className="formBusca">
                    <input
                        //faz a busca
                        onChange={buscaTurmaAno}
                        name="parametro"
                        required="required"
                        className="buscarInput"
                        type="date"
                    />
                </form>

            </header>

            <div className="conteudoTabela">
                <TableContainer className="tabelaContainer">

                    <Table sx={{ minWidth:1500, backgroundColor:"transparent"}} aria-label="customized table" className="tabelaTurma">

                        <TableHead className="theadTurma">
                            {/*
                            private Calendar dataLimInscricao;	
                            private Calendar confirmarTurma;
                            private Calendar retiradaSite;
                            private Calendar cobrarEntregaDocum;
                            private Calendar verificarPCDs;
                            private Calendar gerarDiarioEletr;
                            private Calendar montarKitTurma;
                            private Calendar verifQuemFaltouPrimDia;
                            private Calendar iniciarTurma;
                            private Calendar matriculaDefinitiva;
                            private Calendar encerrarTurma;
                            private Calendar escanearDocum;
                            private boolean simEnao;
                            
*/}
                            <TableRow sx={{}} className="STC">
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
                                <StyledTableCell>Alterar</StyledTableCell>

                


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
                            .map(({ codigo, dataLimInscricao, confirmarTurma,  retiradaSite, cobrarEntregaDocum,
                                 verificarPCDs, gerarDiarioEletr, montarKitTurma, verifQuemFaltouPrimDia, iniciarTurma, matriculaDefinitiva, encerrarTurma, escanearDocum, simEnao}) => (
                                    <StyledTableRow >
                                        
                                        <StyledTableCell>{codigo}</StyledTableCell>
                                        <StyledTableCell>{dataLimInscricao}</StyledTableCell>
                                        <StyledTableCell>{retiradaSite}</StyledTableCell>
                                        <StyledTableCell>{cobrarEntregaDocum}</StyledTableCell>
                                        <StyledTableCell>{verificarPCDs}</StyledTableCell>
                                        <StyledTableCell>{gerarDiarioEletr}</StyledTableCell>
                                        <StyledTableCell>{montarKitTurma}</StyledTableCell>
                                        <StyledTableCell>{iniciarTurma}</StyledTableCell>
                                        <StyledTableCell>{matriculaDefinitiva}</StyledTableCell>
                                        <StyledTableCell>{encerrarTurma}</StyledTableCell>
                                        <StyledTableCell>{confirmarTurma}</StyledTableCell>
                                        <StyledTableCell>{escanearDocum}</StyledTableCell>
                                        <StyledTableCell>{verifQuemFaltouPrimDia}</StyledTableCell>
                                        <StyledTableCell></StyledTableCell>
                                    
                                
                                    </StyledTableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                    <TablePagination

                        sx={{
                            width:"1600px",
                            marginTop: "40px",
                            position:"fixed",
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
            </div>



            <ToastContainer position="top-right"
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
                show={modalAlterar}
                onHide={fecharModalAlterar}
                size="xl"
                aria-labelledby="example-custom-modal-styling-title"
                scrollable={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Alterar</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <div>
                        <img className="imagemModal" src={require("./imagemModal.png")}></img>
                    </div>

                    <div className="modalCad">
                        <form className="formModalCad" onSubmit={alterar}>

                            <div className="parte1">
                                {/*  input de quantidade de mátriculas */}
                                <TextField defaultValue={qtdMatriculas} sx={styleTextField} id="qtdMatriculas" className="inputNomeCadastro" name="qtdMatriculas" type="number" label="QUANTIDADE DE MATRICULA" variant="standard" />

                                <TextField defaultValue={numMaxVagas} id="numMaxVagas" sx={styleTextField} className="textField" name="numMaxVagas" type="number" label="NÚMERO MÁXIMO DE VAGAS" variant="standard" />

                            </div>

                            <div className="parte2">

                                <TextField sx={styleTextField} id="valor" defaultValue={valor} className="textField" name="valor" type="text" label="VALOR" variant="standard" />

                                <TextField
                                    defaultValue={numMinVagas}
                                    sx={styleTextField}
                                    className="textField"
                                    name="numMinVagas"
                                    id="numMinVagas"
                                    type="number"
                                    label="Nº Minimo de vagas"

                                    variant="standard"
                                />


                            </div>

                            <div className="parte3">
                               
                                    <InputLabel id="demo-simple-select-standard-label">Ambiente</InputLabel>
                                    <select // select de ambiente

                                        name="ambiente" required
                                        style={styleTextField}
                                        className="form-control"
                                        labelId="demo-simple-select-standard-label"
                                        id="selectAmbiente"

                                    >
                                        
                                        {
                                            ambiente.map((obj) => (
                                                <option value={obj.id} selected={obj.id == idAmbiente.id} >
                                                    {obj.nome}
                                                </option>
                                            ))
                                        }
                                    </select>

                                <InputLabel id="demo-simple-select-standard-label">Dia da semana</InputLabel>


                                <select
                                    style={styleTextField}
                                    className="form-control"
                                    name="diaSemana" required
                                    labelId="demo-simple-select-standard-label"
                                    id="valuediaSemana"
                                    defaultValue={valuediaSemana}


                                >

                                    {
                                        diaSemana.map((obj, indice) => (
                                            <option value={indice} key={obj}>
                                                {obj}
                                            </option>
                                        ))
                                    }
                                </select>


                            </div>


                            <div className="select1">

                              
                                    <InputLabel id="demo-simple-select-standard-label">Instrutor:</InputLabel>
                                    <select // select de instrutores
                                        name="instrutor" required
                                        style={styleTextField}
                                        className="form-control"
                                      
                                        id="selectInstrutor"
                                        labelId="demo-simple-select-standard-label"

                                    >

                                        {
                                            instrutor.map((obj) => (
                                                <option value={obj.id} key={obj.id} selected={obj.id == idInstrutor.id}>
                                                    {obj.nome}
                                                </option>
                                            ))
                                        }
                                    </select>

                                

                                
                                    <InputLabel id="demo-simple-select-standard-label">Cursos:</InputLabel>

                                    <select // select de curso

                                        labelId="demo-simple-select-standard-label"
                                        style={styleTextField}
                                        className="form-control"
                                        name="curso" required
                                       
                                        id="selectCurso"

                                    >
                                        {
                                            curso.map((obj) => (
                                                <option value={obj.id} selected={obj.id == idCurso.id}>
                                                    {obj.nome}
                                                </option>
                                            ))
                                        }
                                    </select>

                               


                            </div>


                            <div className="select2">

                                <InputLabel id="demo-simple-select-standard-label">Periodo:</InputLabel>

                                <select //select de período
                                    defaultValue={ValuePeriodo}
                                    style={styleTextField}
                                    labelId="demo-simple-select-standard-label"
                                    name="periodo" required
                                    className="form-control"

                                    id="ValuePeriodo"

                                >

                                    {
                                        periodo.map((obj) => (
                                            <option key={obj}>
                                                {obj}
                                            </option>
                                        ))
                                    }
                                </select>



                                <InputLabel id="demo-simple-select-standard-label">Status:</InputLabel>

                                <select //select de status
                                    defaultValue={ValueStatus}
                                    style={styleTextField}
                                    className="form-control"
                                    labelId="demo-simple-select-standard-label"
                                    name="status" required
                                    id="ValueStatus"


                                >

                                    {
                                        status.map((obj, indice) => (
                                            <option key={obj}>
                                                {obj}
                                            </option>
                                        ))
                                    }
                                </select>


                            </div>

                            <div className="select3">

                                <TextField
                                    name="dataInicio"
                                    label="Data Inicio"
                                    sx={styleTextField}
                                    defaultValue={dataInicio}
                                    className="inputNomeCadastro"
                                    id="dataInicio"

                                    InputLabelProps={{ shrink: true, required: true }}
                                    type="date"

                                />

                                <TextField
                                    name="dataTermino"
                                    label="Data Terminio"
                                    sx={styleTextField}
                                    InputLabelProps={{ shrink: true, required: true }}
                                    type="date"
                                    defaultValue={dataTermino}
                                    className="inputNomeCadastro"
                                    id="dataTermino"
                                />
                            </div>

                            {/* <FormControl>
                                    <FormLabel id="demo-controlled-radio-buttons-group">
                                        A turma vai para o site?
                                    </FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="controlled-radio-buttons-group simEnao"
                                        value={objTurma.simEnao}
                                        onChange={capturarDados}
                                    >
                                        <FormControlLabel
                                            value="true"
                                            control={<Radio />}
                                            label="Sim"
                                        />
                                        <FormControlLabel
                                            value="false"
                                            control={<Radio />}
                                            label="Não"
                                        />
                                    </RadioGroup>
                                </FormControl> */}


                            <div class="parteBotao">
                                <Button variant="contained" color="success" type="submit" style={{ margin: 10 }} onClick={() => {
                                    
                                }} >Alterar</Button>

                                <Button variant="contained" color="error" style={{ margin: 10 }} onClick={() => {
                                    limparForm()
                                    handleClose()
                                }} >Fechar</Button>
                            </div>
                        </form>
                    </div>

                </Modal.Body>

            </Modal>


            <Modal
                show={modalCadastrar}
                onHide={fecharModalCadastrar}
                
                size="xl"
                aria-labelledby="example-custom-modal-styling-title"
                scrollable={true}>


                <Modal.Header closeButton>
                    <Modal.Title>Cadastrar</Modal.Title>
                </Modal.Header>

                <Modal.Body className="modalCadastro">

                    <div>
                        <img className="imagemModal" src={require("./imagemModal.png")}></img>
                    </div>
                    <div className="modalCad">
                        <form className="formModalCad">


                            {/*  input de quantidade de mátriculas */}
                            {/*  <TextField defaultValue={objTurma.id} sx={styleTextField} className="textField" name="qtdMatriculas" variant="outlined" disabled={true} />*/}

                            <div className="parte1">
                                <TextField value={qtdMatriculas} sx={styleTextField} className="textField" onChange={(e) => {
                                    setqtdMatriculas(e.target.value)
                                    capturarDados(e)


                                }} name="qtdMatriculas" type="number" label="qtd de Matriculas" variant="standard" />

                                <TextField value={numMaxVagas} sx={styleTextField} className="textField" onChange={(e) => {
                                    setnumMaxVagas(e.target.value)
                                    capturarDados(e)
                                }} name="numMaxVagas" type="number" label="Máximo de vagas:" variant="standard" />





                            </div>

                            <div className="parte2">


                                <TextField value={valor} sx={styleTextField} className="textField" onChange={(e) => {
                                    {
                                        setValor(e.target.value)
                                        capturarDados(e)
                                    }
                                }}
                                    name="valor" type="text" label="VALOR" variant="standard" />

                                <TextField value={numMinVagas} sx={styleTextField} className="textField" onChange={(e) => {
                                    setnumMinVagas(e.target.value)
                                    capturarDados(e)
                                }} name="numMinVagas" type="number" label="Minimo de vagas" variant="standard" />


                            </div>



                            <div className="parte3">
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                                    <InputLabel id="demo-simple-select-standard-label">Ambiente</InputLabel>
                                    <Select // select de ambiente
                                        value={idAmbiente}
                                        name="ambiente" required
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        onChange={(e) => {
                                            setidAmbiente(e.target.value)
                                            capturarDados(e)
                                        }}
                                    >

                                        {
                                            ambiente.map((obj, indice) => (
                                                <MenuItem value={obj.id} key={indice}>
                                                    {obj.nome}
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>

                                <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                                    <InputLabel id="demo-simple-select-standard-label">Dia da semana</InputLabel>
                                    <Select //select de período
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={valuediaSemana}

                                        name="diaSemana" required

                                        label="Periodo"
                                        onChange={(e) => {
                                            setvalueDiaSemana(e.target.value)
                                            capturarDados(e)
                                        }}
                                    >
                                        {
                                            diaSemana.map((obj, indice) => (
                                                <MenuItem value={indice} key={indice}>
                                                    {obj}
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>


                            </div>

                            <div className="select1">

                                <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                                    <InputLabel id="demo-simple-select-standard-label">Instrutor:</InputLabel>
                                    <Select // select de instrutores
                                        name="instrutor" required
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={idInstrutor}
                                        onChange={(e) => {
                                            setidInstrutor(e.target.value)
                                            capturarDados(e)
                                        }}
                                    >

                                        {
                                            instrutor.map((obj, indice) => (
                                                <MenuItem value={obj.id}>
                                                    {obj.nome}
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>


                                <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                                    <InputLabel id="demo-simple-select-standard-label">Cursos:</InputLabel>
                                    <Select // select de curso
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        name="curso" required
                                        value={idCurso}
                                        onChange={(e) => {
                                            setidCurso(e.target.value)
                                            capturarDados(e)
                                        }}
                                    >

                                        {
                                            curso.map((obj) => (
                                                <MenuItem value={obj.id}>
                                                    {obj.nome}
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>

                            </div>

                            <div className="select2">

                                <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                                    <InputLabel id="demo-simple-select-standard-label">Periodo:</InputLabel>
                                    <Select //select de período
                                        defaultValue={objTurma.periodo}
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        name="periodo" required

                                        value={ValuePeriodo}
                                        onChange={(e) => {
                                            setvaluePeriodo(e.target.value)
                                            capturarDados(e)
                                        }}
                                    >

                                        {
                                            periodo.map((obj, indice) => (
                                                <MenuItem value={indice} key={indice}>
                                                    {obj}
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>


                                <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                                    <InputLabel id="demo-simple-select-standard-label">Status:</InputLabel>
                                    <Select //select de status
                                        value={ValueStatus}
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        name="status" required
                                        onChange={(e) => {
                                            setvalueStatus(e.target.value)
                                            capturarDados(e)
                                        }}
                                    >

                                        {
                                            status.map((obj, indice) => (
                                                <MenuItem value={indice} key={indice}>
                                                    {obj}
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>

                            </div>


                            <div className="select3">

                                <TextField
                                    sx={estiloData}
                                    label="Data inicio"
                                    onChange={(e) => {
                                        setDataInicio(e.target.value)
                                        capturarDados(e)
                                    }}
                                    InputLabelProps={{ shrink: true, required: true }}
                                    type="date"
                                    variant="standard"
                                    value={dataInicioFormatada}
                                />

                                <TextField
                                    sx={estiloData}
                                    variant="standard"
                                    label="Data Terminio"
                                    onChange={(e) => {
                                        setDataTermino(e.target.value)
                                        capturarDados(e)
                                    }}
                                    InputLabelProps={{ shrink: true, required: true }}
                                    type="date"
                                    value={dataTerminoFormatada}
                                />
                            </div>

                            <div class="parteBotao">
                                <Button variant="contained" color="success" onClick={() => cadastrar(objTurma.id)} >cadastrar</Button>

                                <Button variant="contained" color="error" onClick={() => {
                                    setModalAlt(false)
                                }} >Fechar</Button></div>
                        </form>
                    </div>
                </Modal.Body>


            </Modal>


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