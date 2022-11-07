import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "@mui/material/Button";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import { CurtainsOutlined } from "@mui/icons-material";
import "./turma.css";
import MenuLateral from "./menuLateral";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import OutlinedInput from "@mui/material/OutlinedInput";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import TablePagination from "@mui/material/TablePagination";

import MenuItem from "@mui/material/MenuItem";

import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { yellow } from "@mui/material/colors";
import { maxWidth } from "@mui/system";
import "../Turma/tarefas.css";

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
    width: 0,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    //backgroundColor: theme.palette.action.hover,
    width: 0,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function Tarefas() {
  //  USE ESTATE USADO PARA CONTROLAR O ESTADO DE UMA VARIAVEL

  // variavel que tem acesso a um array com todas as turmas
  const [qtdMatriculas, setqtdMatriculas] = useState();
  // variavel que tem acesso a um array com todas as turmas
  const [turmas, setTurma] = useState([]);
  // variavel que tem acesso a um array com os instrutores
  const [instrutor, setInstrutor] = useState([]);
  // variavel que tem acesso a um array com os instrutores
  const [idInstrutor, setidInstrutor] = useState([]);
  // variavel que tem acesso a um array com o horario
  const [idhorario, sethorario] = useState();
  // variavel que tem acesso a um array com os cursos
  const [curso, setCurso] = useState([]);
  const [dataInicio, setDataInicio] = useState();
  const [dataTermino, setDataTermino] = useState();
  const [simEnao, setsimEnao] = useState();
  // variavel que tem acesso a um array com os cursos
  const [idCurso, setidCurso] = useState([]);
  // variavel que tem acesso a um array com os cursos setnumMaxVagas
  const [codigo, setCodigo] = useState();
  // variavel que tem acesso a um array com os cursos
  const [valor, setValor] = useState();
  // variavel que tem acesso a um array com os cursos
  const [numMaxVagas, setnumMaxVagas] = useState();
  const [numMinVagas, setnumMinVagas] = useState();
  // variavel que tem acesso a um array com o periodo
  const [periodo, setPeriodo] = useState([]);
  // variavel que tem acesso a um array com o periodo
  const [ValuePeriodo, setvaluePeriodo] = useState([]);
  // variavel que tem acesso a um array com o status
  const [status, setStatus] = useState([]);
  // variavel que tem acesso a um array com o status
  const [ValueStatus, setvalueStatus] = useState([]);
  // variavel que tem acesso a um array com o ambiente
  const [ambiente, setAmbiente] = useState([]);
  // variavel que tem acesso a um array com o ambiente
  const [idAmbiente, setidAmbiente] = useState([]);
  // variavel que tem acesso a um array com os dias da semana
  const [diaSemana, setDiaSemana] = useState([]);
  // variavel que tem acesso a um array com os dias da semana
  const [valuediaSemana, setvalueDiaSemana] = useState([]);

  {
    /* Parte de Tarefas*/
  }
  // variavel que tem acesso a um array com os dias da semana
  const [dataLimInsc, setDataLimInsc] = useState([]);

  // variavel que tem acesso a um array com os dias da semana
  const [retiradaSite, setRetiradaSite] = useState([]);

  // variavel que tem acesso a um array com os dias da semana
  const [cobrarEnDoc, setCobrarEnDoc] = useState([]);

  // variavel que tem acesso a um array com os dias da semana
  const [verificarPcds, setVerificarPcds] = useState([]);

  // variavel que tem acesso a um array com os dias da semana
  const [gerarDiarioEletro, setGerarDiarioEletro] = useState([]);

  // variavel que tem acesso a um array com os dias da semana
  const [montarKitTurma, setMontarKitTurma] = useState([]);

  // variavel que tem acesso a um array com os dias da semana
  const [iniciarTurma, setIniciarTurma] = useState([]);

  // variavel que tem acesso a um array com os dias da semana
  const [matriDef, setMatriDef] = useState([]);

  // variavel que tem acesso a um array com os dias da semana
  const [encerrarTurma, setEncerrarTurma] = useState([]);

  // variavel que tem acesso a um array com os dias da semana
  const [confirmarTurma, setConfirmarTurma] = useState([]);

  // variavel que tem acesso a um array com os dias da semana
  const [escanearDocum, setEscanearDocum] = useState([]);

  // variavel que tem acesso a um array com os dias da semana
  const [verifQuemFaltouPrimDia, setVerifQuemFaltouPrimDia] = useState([]);

  const [idTurma, setidTurma] = useState([]);

  const dataInicioFormatada = dataInicio;
  const dataTerminoFormatada = dataTermino;

  const valorValue = (e) => {
    setValor({ ...valor, [e.target.name]: e.target.value });
  };

  const statusValor = (e) => {
    setStatus({ ...status, [e.target.name]: e.target.value });
  };

  const cursoAlt = (e) => {
    setCurso({ ...curso, [e.target.name]: e.target.value });
  };

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
    simEnao: false,
  };
  // estado do obj da turma
  const [objTurma, setObjTurma] = useState(turma);
  // estado da modal
  const [open, setOpen] = useState(false);
  const [modalAlt, setModalAlt] = useState(false);
  // metodo que abre a modal
  const handleOpen = () => setOpen(true);
  // metodo que fecha a modal
  const handleClose = () => setOpen(false);

  const handleClose2 = () => setOpen(false);
  const values = {
    someDate: "2022-09-19",
  };

  // REQUISIÇÃO GET PARA PUXAR TODAS AS TURMAS
  useEffect(() => {
    fetch("http://localhost:8080/api/turma")
      .then((resp) => resp.json())
      .then((retorno_convertido) => setTurma(retorno_convertido)); //lista de turmas
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/instrutor")
      .then((resp) => resp.json())
      .then((retorno_convertido) => setInstrutor(retorno_convertido)); //lista de instrutores
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/horario")
      .then((resp) => resp.json())
      .then((retorno_convertido) => sethorario(retorno_convertido)); //lista de horario
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/curso")
      .then((resp) => resp.json())
      .then((retorno_convertido) => setCurso(retorno_convertido)); //lista de curso
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/enum/periodo")
      .then((resp) => resp.json())
      .then((retorno_convertido) => setPeriodo(retorno_convertido)); //lista de periodos
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/enum/status")
      .then((resp) => resp.json())
      .then((retorno_convertido) => setStatus(retorno_convertido)); //lista de status
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/ambiente")
      .then((resp) => resp.json())
      .then((retorno_convertido) => setAmbiente(retorno_convertido)); //lista de ambiente
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/enum/diasSemana")
      .then((resp) => resp.json())
      .then((retorno_convertido) => setDiaSemana(retorno_convertido)); //lista de dia da semana
  }, []);

  const erroDataIgual = () => {
    toast.error("A data de inicio não pode ser igual a data final!", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "colored",
      draggable: true,
      progress: undefined,
    });
  };

  const erroDataMaiorFinal = () => {
    toast.error("A data de inicio não pode ser depois da data final!", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "colored",
      draggable: true,
      progress: undefined,
    });
  };

  // metodo que efetua o cadastro da turma
  const cadastrar = () => {
    //requisição ao back end
    fetch("http://localhost:8080/api/turma", {
      method: "post",
      body: JSON.stringify(turma),
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      // convertendo a resposta da promessa em json
      .then((retorno) => {
        if (retorno.status == 409) {
          erroDataIgual();
        } else if (retorno.status == 418) {
          erroDataMaiorFinal();
        } else {
          retorno
            .json()
            // pegando o retorno convertido
            .then((retorno_convertido) => {
              // metodo que atualiza a lista, que faz com que ao clicar seja adicionado "automaticamente"
              atualizaLista();

              setInterval(function () {
                window.location.reload();
              }, 1500);
              // exibindo a msg de aviso de cadastro
              msgCadastro();
            });
        }
      });
  };

  // função que espera receber um id
  

  // metodo que capta a turma que foi selecionado
  const selecionarTurma = (
    id,
    codigo,
    dataLimInscricao,
    retiradaSite,
    cobrarEntregaDocum,
    verificarPCDs,
    gerarDiarioEletr,
    montarKitTurma,
    iniciarTurma,
    matriculaDefinitiva,
    encerrarTurma,
    confirmarTurma,
    escanearDocum,
    verifQuemFaltouPrimDia
  ) => {
    setidTurma(id)
    setCodigo(codigo);
    setDataLimInsc(dataLimInscricao);
    setRetiradaSite(retiradaSite);
    setCobrarEnDoc(cobrarEntregaDocum);
    setVerificarPcds(verificarPCDs);
    setGerarDiarioEletro(gerarDiarioEletr);
    setMontarKitTurma(montarKitTurma);
    setIniciarTurma(iniciarTurma);
    setMatriDef(matriculaDefinitiva);
    setEncerrarTurma(encerrarTurma);
    setConfirmarTurma(confirmarTurma);
    setEscanearDocum(escanearDocum);
    setVerifQuemFaltouPrimDia(verifQuemFaltouPrimDia);
  };
  // metodo que atualiza a lista, puxando todos a turma cadastrada da rest api
  const atualizaLista = async () => {
    const result = await fetch("http://localhost:8080/api/turma"); // await = espera uma promessa
    const resultado = await result.json();
    setTurma(resultado);
  };

  // metodo que deleta a turma
  const deletar = async (id) => {
    let result = await fetch(`http://localhost:8080/api/turma/${id}`, {
      method: "DELETE",
    });
    // caso já exista uma turma a ser deletado, ele atualiza a lista assim removendo a turma deletado
    if (result) {
      atualizaLista();
      msgExclusao();
    }
  };

  const capturarDados = (e) => {
    setObjTurma({ ...objTurma, [e.target.name]: e.target.value });
  };

  // metodo que limpa os inputs do form
  const limparForm = () => {
    setObjTurma("");
  };

  // metodo que busca uma turma
  const buscaTurma = async (event) => {
    // valor que esta sendo digitado no input de pesquisa
    let key = event.target.value;

    // verifica se existe 'valor'
    if (key) {
      // fazendo uma requisição na api de busca e passando a key
      let result = await fetch(
        "http://localhost:8080/api/turma/buscarTurma/" + key
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

  const buscaTurmaAno = async (event) => {
    // valor que esta sendo digitado no input de pesquisa
    let key = event.target.value;

    // verifica se existe 'valor'
    if (key) {
      // fazendo uma requisição na api de busca e passando a key
      let result = await fetch(
        "http://localhost:8080/api/turma/buscarTurmaAno/" + key
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

  // toda vez que a modal é chamada, ela sera limpa e fechada
  const clearClose = () => {
    handleClose();
    limparForm();
  };

  const clearClose2 = () => {
    handleClose2();
    limparForm();
  };

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
      theme: "colored",
      // faz com que seja possivel arrastar
      draggable: true,
      progress: undefined,
    });
  };

  // metodo de msg de exclusão feita com sucesso
  const msgExclusao = () => {
    toast.success("Turma Removido com Sucesso", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "colored",
      // faz com que seja possivel arrastar
      draggable: true,
      progress: undefined,
    });
  };

  // metodo de msg de alteração feita com sucesso
  const msgAlteracao = () => {
    toast.warn("Turma Alterado com Sucesso", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "light",
      // faz com que seja possivel arrastar
      draggable: true,
      progress: undefined,
    });
  };

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

  console.log("data limite de inscrição - data: ", dataLimInsc);

  console.log("Retirada do site - data: ", retiradaSite);

  console.log("Cobrar entrega do documento - data: ", cobrarEnDoc);

  console.log("Verificar PCDS - data:", verificarPcds);

  console.log("Gerar diario eletronico - data:", gerarDiarioEletro);

  console.log("Montar kit de turma - data: ", montarKitTurma);

  console.log("Iniciar turma - data:", iniciarTurma);

  console.log("Matricula definitiva - data: ", matriDef);

  console.log("Encerrar turma - data:", encerrarTurma);

  console.log("Confirmar turma - data: ", confirmarTurma);

  console.log("Escanear documento - data:", escanearDocum);

  console.log(
    "Verificar quem faltou no  primeiro dia - data:",
    verifQuemFaltouPrimDia
  );

  const [checkDataInsc, setCheckDataInsc] = useState ([]);

    function checkValue() {

    }
  return (
    <>
      <MenuLateral />
      <header>
        <div className="divTarefas">
          <Button
            className="botaoVoltar"
            href="/turmas"
            variant="contained"
            color="primary"
          >
            <ArrowBack /> <i class="bi bi-plus-lg"></i>Voltar
          </Button>
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
          <Table
            sx={{ minWidth: 1704.5, backgroundColor: "transparent" }}
            aria-label="customized table"
            className="tabelaTurma"
          >
            <TableHead className="theadTurma">
              <TableRow sx={{}} className="STC">
                <StyledTableCell>Turma</StyledTableCell>
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
                <StyledTableCell>
                  Verificar Quem Faltou no 1°dia
                </StyledTableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              {turmas
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                .map(
                  ({
                    id,
                    codigo,
                    dataLimInscricao,
                    retiradaSite,
                    cobrarEntregaDocum,
                    verificarPCDs,
                    gerarDiarioEletr,
                    montarKitTurma,
                    iniciarTurma,
                    matriculaDefinitiva,
                    encerrarTurma,
                    confirmarTurma,
                    escanearDocum,
                    verifQuemFaltouPrimDia,
                    simEnao,
                  }) => (
                    <StyledTableRow>
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
                      <StyledTableCell>
                        {verifQuemFaltouPrimDia}
                      </StyledTableCell>
                     
                    </StyledTableRow>
                  )
                )}
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
      </div>
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
      
    </>
  );
}

const styleTextField = {
  display: "flex",
  flexDirection: "row",
  marginBottom: "2em",
  width:200
};

const estiloData = {
  display: "flex",
  flexDirection: "row",
  marginBottom: "2em",
};

const styleTitle = {
  textAlign: "center",
  marginBottom: "30px",
  color: "blue",
};

const styletSearch = {
  border: "2px solid blue",
  alignItems: "center",
  marginLeft: "500px",
  padding: "10px",
  borderRadius: "6px",
  marginBottom: "30px",
  boxShadow: 24,
};

const snackStyle = {
  float: "right",
};

const style = {
  position: "absolute",
  top: "50%",
  display: "flex",
  flexDirection: "row",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default Tarefas;
