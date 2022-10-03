import React, { useEffect } from "react";
import Modal from "@mui/material/Modal";
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

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';




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
            .then(retorno => retorno.json())
            // pegando o retorno convertido
            .then(retorno_convertido => {
                // metodo que atualiza a lista, que faz com que ao clicar seja adicionado "automaticamente"
                atualizaLista()
                // fecha modal
                handleClose()
                // limpa o formulario
                limparForm()
                // exibindo a msg de aviso de cadastro
                msgCadastro()

            })
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
            let result = await fetch("http://localhost:8080/api/turma/buscar/" + key)
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

        toast.error("Turma Removido com Sucesso", {
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
            <Button onClick={handleOpen} style={{ margin: 10, float: 'left', borderRadius: '8px' }} variant="contained" color="primary" >ADICIONAR TURMA </Button>

            <Modal
                open={modalAlt}
                onClose={clearClose2}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">

                <Box sx={style}>
                    <form onSubmit={alterar}>

                        <h1 id="teste">modal Alterar</h1>
                        {/*  input de quantidade de mátriculas */}
                        <TextField value={objTurma.qtdMatriculas} sx={styleTextField} className="textField" onChange={capturarDados} name="qtdMatriculas" type="number" label="QUANTIDADE DE MATRICULA" variant="outlined" />


                        <TextField
                            name="dataInicio"
                            label="Data Inicio"
                            value={objTurma.dataInicio}
                            
                            InputLabelProps={{ shrink: true, required: true }}
                            type="date"
                           
                        />
                        <TextField
                            name="dataTermino"
                            label="Data Terminio"
                            InputLabelProps={{ shrink: true, required: true }}
                            type="date"
                            value={objTurma.dataTermino}
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
                            value={numMinVagas}
                            sx={styleTextField}
                            className="textField"
                            onChange={capturarDados}
                            name="numMinVagas"
                            type="number"
                            label="NÚMERO MÍNIMO DE VAGAS"
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
                </Box>
            </Modal>




















































            <Modal
                open={open}
                onClose={clearClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">

                <Box sx={style}>
                    <form>

                        <h1>modal de Cadastrar</h1>
                        {/*  input de quantidade de mátriculas */}
                       {/*  <TextField defaultValue={objTurma.id} sx={styleTextField} className="textField" name="qtdMatriculas" variant="outlined" disabled={true} />*/}
                        <TextField value={qtdMatriculas}  sx={styleTextField} className="textField" onChange={(e) => {
                                setqtdMatriculas(e.target.value)
                                capturarDados(e)
                            }} name="qtdMatriculas" type="number" label="QUANTIDADE DE MATRICULA" variant="outlined" />


                        <TextField
                           
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
                </Box>
            </Modal>







            <input placeholder="Busque por uma turma" onChange={buscaTurma} style={styletSearch} name="parametro" />

            <form>

                <div>
                    <input
                        //faz a busca
                        onChange={buscaTurma}
                        name="parametro"
                        required="required"
                    />
                </div>
            </form>

            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>CÓDIGO DE TURMA</th>
                        <th>CURSO</th>
                        <th>INSTRUTOR</th>
                        <th>QUANTIDADE DE MATRÍCULA</th>
                        <th>PERÍODO</th>
                        <th>VALOR</th>
                        <th>STATUS</th>
                        <th>AMBIENTE</th>
                        <th>Nº MÁXIMO DE VAGAS</th>
                        <th>Nº MÍNIMO DE VAGAS</th>
                        <th>DIAS DA SEMANA</th>
                        <th>DATA DE INÍCIO</th>
                        <th>DATA DE TÉRMINO</th>
                        <th>VAI PARA O SITE</th>
                        <th>EXCLUIR</th>
                        <th>ALTERAR</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        turmas.map((obj, indice) => (
                            <tr key={indice}>
                                <td>{obj.simEnao}</td>
                                <td>{obj.id}</td>
                                <td>{obj.codigo}</td>
                                <td>{obj.curso.nome}</td>
                                <td>{obj.instrutor.nome}</td>
                                <td>{obj.qtdMatriculas}</td>
                                <td>{obj.periodo}</td>
                                <td>{obj.valor}</td>
                                <td>{obj.status}</td>
                                <td>{obj.ambiente.nome}</td>
                                <td>{obj.numMaxVagas}</td>
                                <td>{obj.numMinVagas}</td>
                                <td>{obj.diaSemana}</td>
                                <td>{obj.dataInicio}</td>
                                <td>{obj.dataTermino}</td>
                                <td>
                                    <Button variant="contained" color="warning" onClick={() => {
                                        selecionarTurma(indice)
                                        setModalAlt(true)
                                    }}>Alterar</Button>
                                </td>
                                <td><Button variant="contained" color="error" onClick={() => deletar(obj.id)}>Remover</Button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            </TableContainer>

        </>
    )
}

const styleTextField = {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '30px'

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