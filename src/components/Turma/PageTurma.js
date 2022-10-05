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
import  './turma.css'
import MenuLateral from "./menuLateral";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';

import OutlinedInput from '@mui/material/OutlinedInput';

import MenuItem from '@mui/material/MenuItem';

import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

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

function CadTurma() {

    //  USE ESTATE USADO PARA CONTROLAR O ESTADO DE UMA VARIAVEL
  
    // variavel que tem acesso a um array com todas as turmas
    const [qtdMatriculas, setqtdMatriculas] = useState()
    // variavel que tem acesso a um array com todas as turmas
    const [turmas, setTurma] = useState([])
    // variavel que tem acesso a um array com os instrutores
    const [instrutor, setInstrutor] = useState([])
    // variavel que tem acesso a um array com os instrutores
    const [idInstrutor, setidInstrutor] = useState()
    // variavel que tem acesso a um array com o horario
    const [idhorario, sethorario] = useState()
    // variavel que tem acesso a um array com os cursos
    const [curso, setCurso] = useState([])
    const [dataIdInicio, setDataInicio] = useState()
    const [dataIdTermino, setDataTermino] = useState()
    const [simEnao, setsimEnao] = useState();
    // variavel que tem acesso a um array com os cursos
    const [idCurso, setidCurso] = useState()
    // variavel que tem acesso a um array com os cursos setnumMaxVagas
    const [codigo, setCodigo] = useState()
    // variavel que tem acesso a um array com os cursos
    const [valor, setValor] = useState()
    // variavel que tem acesso a um array com os cursos
    const [numMaxVagas, setnumMaxVagas] = useState()
    const [numMinVagas, setnumMinVagas] = useState();
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
    const [idAmbiente, setidAmbiente] = useState()
    // variavel que tem acesso a um array com os dias da semana
    const [diaSemana, setDiaSemana] = useState([])
    // variavel que tem acesso a um array com os dias da semana
    const [valuediaSemana, setvalueDiaSemana] = useState()

    const [idTurma, setidTurma] = useState([]);

    

    console.log(valor)
    console.log(valuediaSemana)

        const dataInicioFormatada = dataIdInicio;
        const dataTerminoFormatada = dataIdTermino;

       console.log( new Date(dataInicioFormatada).toLocaleString('pt-br'))
       console.log( new Date(dataTerminoFormatada).toLocaleString('pt-br'))

       const valorValue = (e) => {

        console.log(e.target)

        setValor({ ...valor, [e.target.name]: e.target.value })

      }

      const statusValor = (e) => {

        console.log(e.target)

        setStatus({ ...status, [e.target.name]: e.target.value })

      }

      const cursoAlt = (e) => {

        console.log(e.target.value)
        console.log(e.target)

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
            progress: undefined,})
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
            progress: undefined,})
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
                
                if(retorno.status == 409){

                    erroDataIgual()

                }else if(retorno.status == 418){
                    erroDataMaiorFinal()
                }else{
                
                
                retorno.json()
            // pegando o retorno convertido
            .then(retorno_convertido => {
                // metodo que atualiza a lista, que faz com que ao clicar seja adicionado "automaticamente"
                atualizaLista()
               
                setInterval(function () {window.location.reload();}, 1500);
                // exibindo a msg de aviso de cadastro
                msgCadastro()
            })
            }})
            
    }

   

    // função que espera receber um id
    const alterar = async (event) => {

        const teste = document.getElementById("teste")
        console.log(teste)

    event.preventDefault();

    console.warn(event.target);

    const selectCurso = document.getElementById("selectCurso").value

    const selectAmbiente = document.getElementById("selectAmbiente").value 

    const selectInstrutor = document.getElementById("selectInstrutor").value 

    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",selectCurso)

    const formData = new FormData(event.target);

    const data = Object.fromEntries(formData);

    console.warn("formatadaTurma ", data);

    let obgj = {

       

        id: objTurma.id,
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

    console.warn("objTurma " , obgj);

    console.log(idCurso)


    let result = await fetch(

      `http://localhost:8080/api/turma/${objTurma.id}`,

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
        setInterval(function () {window.location.reload();}, 50);
        
    }
  
};


    console.log(">>>>>>>>>>>>>>>>>>>>>"+objTurma.ambiente.id )
    // metodo que capta a turma que foi selecionado
    const selecionarTurma = (indice) => {
        setObjTurma(turmas[indice])
        setidTurma(turmas[indice])
        console.log(indice)
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

        console.log(e.target.value);
       
    
        setObjTurma({ ...objTurma, [e.target.name]: e.target.value });
        console.log(objTurma)
      };

    // metodo que limpa os inputs do form
    const limparForm = () => {
        setObjTurma('')
    }

    console.log(objTurma.dataInicio)

    // metodo que busca uma turma
    const buscaTurma = async (event) => {

        // valor que esta sendo digitado no input de pesquisa
        let key = event.target.value;
        console.log(key)

        // verifica se existe 'valor'
        if (key) {

            // fazendo uma requisição na api de busca e passando a key
            let result = await fetch("http://localhost:8080/api/turma/buscarTurma/" + key)
            // tranformando a promessa em json
            result = await result.json();
            console.log(result)

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
        console.log(key)

        // verifica se existe 'valor'
        if (key) {

            // fazendo uma requisição na api de busca e passando a key
            let result = await fetch("http://localhost:8080/api/turma/buscarTurmaAno/" + key)
            // tranformando a promessa em json
            result = await result.json();
            console.log(result)

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
            theme: 'dark',
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
    return (

        <>
          <MenuLateral/>
         
            <header> 
            <div className="divBotaoAdd">
                <Button className="botaoAdd" onClick={abrirModalCadastrar} variant="contained" color="primary" ><i class="bi bi-plus-lg"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
            </svg></i>Novo</Button>
            </div>

            <form className="formBusca">
                <input
                    //faz a busca
                    onChange={buscaTurma}
                    name="parametro"
                    required="required"
                    className="buscarInput"
                />
            </form>
            
        </header>

        <div className="conteudoTabela">
        <TableContainer  className="tabelaContainer">

            <Table sx={{ minWidth: 700 }} aria-label="customized table" className="tabelaTurma">
                 <TableHead className="theadTurma">
                 <TableRow>
                        <StyledTableCell>Id</StyledTableCell>
                        <StyledTableCell>CÓDIGO DE TURMA</StyledTableCell>
                        <StyledTableCell>CURSO</StyledTableCell>
                        <StyledTableCell>INSTRUTOR</StyledTableCell>
                        <StyledTableCell>QUANTIDADE DE MATRÍCULA</StyledTableCell>
                        <StyledTableCell>PERÍODO</StyledTableCell>
                        <StyledTableCell>VALOR</StyledTableCell>
                        <StyledTableCell>STATUS</StyledTableCell>
                        <StyledTableCell>AMBIENTE</StyledTableCell>
                        <StyledTableCell>Nº MÁXIMO DE VAGAS</StyledTableCell>
                        <StyledTableCell>Nº MÍNIMO DE VAGAS</StyledTableCell>
                        <StyledTableCell>DIAS DA SEMANA</StyledTableCell>
                        <StyledTableCell>DATA DE INÍCIO</StyledTableCell>
                        <StyledTableCell>DATA DE TÉRMINO</StyledTableCell>
                        <StyledTableCell>ALTERAR</StyledTableCell>
                        <StyledTableCell>EXCLUIR</StyledTableCell>
                       
                    </TableRow>
                    </TableHead>
                <TableBody>
                    {
                        turmas.map((obj, indice) => (
                            <StyledTableRow key={indice}>
                               
                                <StyledTableCell>{obj.id}</StyledTableCell>
                                <StyledTableCell>{obj.codigo}</StyledTableCell>
                                <StyledTableCell>{obj.curso.nome}</StyledTableCell>
                                <StyledTableCell>{obj.instrutor.nome}</StyledTableCell>
                                <StyledTableCell>{obj.qStyledTableCellMatriculas}</StyledTableCell>
                                <StyledTableCell>{obj.periodo}</StyledTableCell>
                                <StyledTableCell>{obj.valor}</StyledTableCell>
                                <StyledTableCell>{obj.status}</StyledTableCell>
                                <StyledTableCell>{obj.ambiente.nome}</StyledTableCell>
                                <StyledTableCell>{obj.numMaxVagas}</StyledTableCell>
                                <StyledTableCell>{obj.numMinVagas}</StyledTableCell>
                                <StyledTableCell>{obj.diaSemana}</StyledTableCell>
                                <StyledTableCell>{obj.dataInicio}</StyledTableCell>
                                <StyledTableCell>{obj.dataTermino}</StyledTableCell>
                                <StyledTableCell>
                                    <button className="botaoAlterarTurma" onClick={() => {
                                        selecionarTurma(indice)
                                        abrirModalAlterar()
                                    }}><i className="bi bi-pencil-square"></i><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fillRule
                            ="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                  </svg></button>
                                </StyledTableCell>
                                <StyledTableCell><button className="botaoDeleteTurma" onClick={() => deletar(obj.id)}><i className="bi bi-trash3-fill"></i>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
       <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
          </svg></button></StyledTableCell>
                            </StyledTableRow>
                        ))
                    }
                </TableBody>
            </Table>
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
                scrollable={true}>
                     <Modal.Header closeButton>  
                        <Modal.Title>Alterar</Modal.Title>
                        </Modal.Header>

              
                    <form onSubmit={alterar}>

                        {/*  input de quantidade de mátriculas */}
                        <TextField value={objTurma.qtdMatriculas} sx={styleTextField} className="inputNomeCadastro"  onChange={capturarDados} name="qtdMatriculas" type="number" label="QUANTIDADE DE MATRICULA" variant="outlined" />


                        <TextField
                            name="dataInicio"
                            label="Data Inicio"
                            sx={styleTextField}
                            value={objTurma.dataInicio}
                            className="inputNomeCadastro"
                           
                            InputLabelProps={{ shrink: true, required: true }}
                            type="date"
                           
                        />
                        <TextField
                            name="dataTermino"
                            label="Data Terminio"
                            sx={styleTextField}
                            InputLabelProps={{ shrink: true, required: true }}
                            type="date"
                            value={objTurma.dataTermino}
                            className="inputNomeCadastro"
                        />

                        <select // select de instrutores
                            name="instrutor" required
                            style={styleTextField}
                            value={idInstrutor}
                            id="selectInstrutor"
                            className="form-control"
                            onChange={(e) => {
                                setidInstrutor(e.target.value)
                                capturarDados(e)

                            }}
                           
                         
                        >
                            <option>SELECIONE O INSTRUTOR</option>
                            {
                                instrutor.map((obj, indice) => (
                                    <option value={obj.id} key={obj.id} selected={objTurma.instrutor.id == obj.id}>
                                        {obj.nome}
                                    </option>
                                ))
                            }
                        </select>

                        <select // select de curso
                            style={styleTextField}
                            value={idCurso}
                            name="curso" required
                            id="selectCurso"
                            className="form-control"
                            onChange={(e) => {
                                setidCurso(e.target.value)
                                capturarDados(e)

                            }}
                           
                        >
                            <option>SELECIONE O CURSO</option>
                            {
                                curso.map((obj) => (
                                    <option value={obj.id} selected={objTurma.curso.id == obj.id}>
                                        {obj.nome}
                                    </option>
                                ))
                            }
                        </select>
                        <select //select de período
                            value={objTurma.periodo}
                            style={styleTextField}
                            name="periodo" required
                            className="form-control"
                         
                        >
                            <option>SELECIONE O PERÍODO</option>
                            {
                                periodo.map((obj, indice) => (
                                    <option key={obj}>
                                        {obj}
                                    </option>
                                ))
                            }
                        </select>
                    
                        <TextField sx={styleTextField} defaultValue={objTurma.valor} className="textField"  name="valor" type="text" label="VALOR" variant="outlined" />

                        <select //select de status
                            value={objTurma.status}
                            style={styleTextField}
                            name="status" required
                            className="form-control"
                          
                        >
                            <option>SELECIONE O STATUS</option>
                            {
                                status.map((obj, indice) => (
                                    <option key={obj}>
                                        {obj}
                                    </option>
                                ))
                            }
                        </select>

                        <select // select de ambiente
                           
                            name="ambiente" required
                            style={styleTextField}
                            value={idAmbiente}
                            id="selectAmbiente"
                            className="form-control"
                            onChange={(e) => {
                                setidAmbiente(e.target.value)
                                capturarDados(e)

                            }}
                            
                           
                        >
                            <option>SELECIONE O AMBIENTE</option>
                            {
                                ambiente.map((obj) => (
                                    <option value={obj.id} selected={objTurma.ambiente.id == obj.id}>
                                        {obj.nome}
                                    </option>
                                ))
                            }
                        </select>
                        <TextField value={objTurma.numMaxVagas} sx={styleTextField} className="textField" onChange={capturarDados} name="numMaxVagas" type="number" label="NÚMERO MÁXIMO DE VAGAS" variant="outlined" />
                        <TextField
                            value={objTurma.numMinVagas}
                            sx={styleTextField}
                            className="textField"
                            onChange={capturarDados}
                            name="numMinVagas"
                            type="number"

                            variant="outlined"
                            />
                        <select //select de período
                            style={styleTextField}
                            name="diaSemana" required
                            className="form-control"
                            value={objTurma.diaSemana}


                        >
                            <option>SELECIONE O DIA DA SEMANA</option>
                            {
                                diaSemana.map((obj, indice) => (
                                    <option key={obj}>
                                        {obj}
                                    </option>
                                ))
                            }
                        </select>

                        <FormControl>
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
                            </FormControl>

                        <Button variant="contained" type="submit" color="success" style={{ margin: 10 }} >Alterar</Button>

                        <Button variant="contained" color="error" style={{ margin: 10 }} onClick={() => {
                            limparForm()
                            handleClose()
                        }} >Fechar</Button>
                    </form>
                
            </Modal>

            <Modal
                 show={modalCadastrar}
                 onHide={fecharModalCadastrar}
                 scrollable={true}>

                    <Modal.Header closeButton>  
                        <Modal.Title>Cadastrar</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                    <form className="formAlterar">

                        {/*  input de quantidade de mátriculas */}
                       {/*  <TextField defaultValue={objTurma.id} sx={styleTextField} className="textField" name="qtdMatriculas" variant="outlined" disabled={true} />*/}
                        <TextField value={qtdMatriculas}  sx={styleTextField} className="textField" onChange={(e) => {
                                setqtdMatriculas(e.target.value)
                                capturarDados(e)
                            }} name="qtdMatriculas" type="number" label="QUANTIDADE DE MATRICULA" variant="outlined" />


                        <TextField
                            sx={styleTextField}
                            label="Data inicio"
                            onChange={(e) => {
                                setDataInicio(e.target.value)
                                capturarDados(e)
                            }}
                            InputLabelProps={{ shrink: true, required: true }}
                            type="date"
                            value={dataInicioFormatada}
                        />
                        <TextField
                            sx={styleTextField}
                            label="Data Terminio"
                            onChange={(e) => {
                                setDataTermino(e.target.value)
                                capturarDados(e)
                            }}
                            InputLabelProps={{ shrink: true, required: true }}
                            type="date"
                            value={dataTerminoFormatada}
                        />

                        <select // select de instrutores
                            name="instrutor" required
                            style={styleTextField}
                            className="form-control"
                           value={idInstrutor}
                            onChange={(e) => {
                                setidInstrutor(e.target.value)
                                capturarDados(e)
                            }}
                        >
                            <option>SELECIONE O INSTRUTOR</option>
                            {
                                instrutor.map((obj, indice) => (
                                    <option value={obj.id}>
                                        {obj.nome}
                                    </option>
                                ))
                            }
                        </select>

                        <select // select de curso
                            style={styleTextField}
                            name="curso" required
                            className="form-control"
                            value={idCurso}
                            onChange={(e) => {
                                setidCurso(e.target.value)
                                capturarDados(e)
                            }}
                        >
                            <option>SELECIONE O CURSO</option>
                            {
                                curso.map((obj, indice) => (
                                    <option value={obj.id}>
                                        {obj.nome}
                                    </option>
                                ))
                            }
                        </select>
                        <select //select de período
                            defaultValue={objTurma.periodo}
                            style={styleTextField}
                            name="periodo" required
                            className="form-control"
                            value={ValuePeriodo}
                            onChange={(e) => {
                                setvaluePeriodo(e.target.value)
                                capturarDados(e)
                            }}
                        >
                            <option>SELECIONE O PERÍODO</option>
                            {
                                periodo.map((obj, indice) => (
                                    <option key={indice}>
                                        {obj}
                                    </option>
                                ))
                            }
                        </select>
           
                        <TextField value={valor} sx={styleTextField} className="textField" onChange={(e) => {{
                            setValor(e.target.value)
                            capturarDados(e) }}}
                         name="valor" type="text" label="VALOR" variant="outlined" />

                        <select //select de status
                           value={ValueStatus}
                            style={styleTextField}
                            name="status" required
                            className="form-control"
                            onChange={(e) => {
                                setvalueStatus(e.target.value)
                                capturarDados(e)
                            }}
                        >
                            <option>SELECIONE O STATUS</option>
                            {
                                status.map((obj, indice) => (
                                    <option key={indice}>
                                        {obj}
                                    </option>
                                ))
                            }
                        </select>

                        <select // select de ambiente
                            value={idAmbiente}
                            name="ambiente" required
                            style={styleTextField}
                            className="form-control"
                            onChange={(e) => {
                                setidAmbiente(e.target.value)
                                capturarDados(e)
                            }}
                        >
                            <option>SELECIONE O AMBIENTE</option>
                            {
                                ambiente.map((obj, indice) => (
                                    <option value={obj.id} key={indice}>
                                        {obj.nome}
                                    </option>
                                ))
                            }
                        </select>
                        <TextField value={numMaxVagas} sx={styleTextField} className="textField" onChange={(e) => {
                                setnumMaxVagas(e.target.value)
                                capturarDados(e)
                            }} name="numMaxVagas" type="number" label="NÚMERO MÁXIMO DE VAGAS" variant="outlined" />
                        <TextField value={numMinVagas} sx={styleTextField} className="textField" onChange={(e) => {
                                setnumMinVagas(e.target.value)
                                capturarDados(e)
                            }} name="numMinVagas" type="number" label="NÚMERO MÍNIMO DE VAGAS" variant="outlined" />
                        <select //select de período
                            value={valuediaSemana}
                            style={styleTextField}
                            name="diaSemana" required
                            className="form-control"
                            onChange={(e) => {
                                setvalueDiaSemana(e.target.value)
                                capturarDados(e)
                            }}
                        >
                            <option>SELECIONE O DIA DA SEMANA</option>
                            {
                                diaSemana.map((obj, indice) => (
                                    <option key={indice}>
                                        {obj}
                                    </option>
                                ))
                            }
                        </select>
                        <Button variant="contained" color="success" style={{ margin: 10 }} onClick={() => cadastrar(objTurma.id)} >cadastrar</Button>

                        <Button variant="contained" color="error" style={{ margin: 10 }} onClick={() => {
                            setModalAlt(false)
                        }} >Fechar</Button>
                    </form>
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

export default CadTurma;