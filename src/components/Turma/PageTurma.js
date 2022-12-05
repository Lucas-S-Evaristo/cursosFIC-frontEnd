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
import { ConstructionOutlined, CurtainsOutlined } from "@mui/icons-material";
import "./turma.css";
import MenuLateral, { deslogar } from "../menu/MenuLateral";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
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
import AssignmentIcon from "@mui/icons-material/Assignment";
import MenuItem from "@mui/material/MenuItem";
import AddIcon from '@mui/icons-material/Add';
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { yellow } from "@mui/material/colors";
import RemoveIcon from '@mui/icons-material/Remove';
import { createTheme } from "@material-ui/core";
import AddSharpIcon from "@material-ui/icons/AddSharp";
import { InputAdornment, Toolbar } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import FolderIcon from '@mui/icons-material/Folder';
import Load from "../load";

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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    textAlign: "center"

  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,

  },
}));


const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: tema.palette.primary.main,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const drawerWidth = 240;

let p = sessionStorage.getItem("payload")

p = JSON.parse(p)

let token = sessionStorage.getItem("token")

function CadTurma() {
  //  USE ESTATE USADO PARA CONTROLAR O ESTADO DE UMA VARIAVEL

  // variavel que tem acesso a um array com todas as turmas
  const [qtdMatriculas, setqtdMatriculas] = useState();
  // variavel que tem acesso a um array com todas as turmas
  const [turmas, setTurma] = useState([]);
  const moment = require('moment')
  // variavel que tem acesso a um array com os instrutores
  const [instrutor, setInstrutor] = useState([]);
  // variavel que tem acesso a um array com os instrutores
  const [idInstrutor, setidInstrutor] = useState([]);
  // variavel que tem acesso a um array com o horario
  const [horarios, setHorarios] = useState([]);
  // variavel que tem acesso a um array com os cursos
  const [curso, setCurso] = useState([]);
  const [dataInicio, setDataInicio] = useState();
  const [dataTermino, setDataTermino] = useState();

  const [removeLoad, setRemoveLoad] = useState(false)

  const classes = useStyles();

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

  const [diasDaTurma, setDiasDaTurma] = useState([]);

  const [horarioInicioValue, setHorarioInicioValue] = useState([]);

  const [horarioFinalValue, setHorarioFinalValue] = useState([]);

  const [idTurma, setidTurma] = useState([]);

  const [simEnao, setsimEnao] = useState([]);

  const [valuesimEnao, setvaluesimEnao] = useState([]);



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
    dataInicio: dataInicioFormatada,
    dataTermino: dataTerminoFormatada,
    valor: valor,
    status: ValueStatus,
    ambiente: { id: idAmbiente },
    numMaxVagas: numMaxVagas,
    numMinVagas: numMinVagas,
    simEnao: simEnao,
    diaSemana: valuediaSemana,
    horarioInicio: { id: horarioInicioValue },
    horarioTermino: { id: horarioFinalValue },
    simEnao: valuesimEnao,
    //diasDaTurma: setDiasDaSemana
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

  const [modalExcluir, setShowExcluir] = useState(false);

  const abrirModalExcluir = (id) => {
    setShowExcluir(true)
    setidTurma(id)

  };

  const fecharModalExcluir = () => setShowExcluir(false);

  // REQUISIÇÃO GET PARA PUXAR TODAS AS TURMAS
  useEffect(() => {
    setTimeout(() => {

    
    fetch("http://localhost:8080/api/turma")
      .then((resp) => resp.json())
      .then((retorno_convertido) => setTurma(retorno_convertido),
      setRemoveLoad(true)
     ); //lista de turmas
    }, 2000)
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/instrutor")
      .then((resp) => resp.json())
      .then((retorno_convertido) => setInstrutor(retorno_convertido)); //lista de instrutores
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/horario")
      .then((resp) => resp.json())
      .then((retorno_convertido) => setHorarios(retorno_convertido)); //lista de horario
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

  useEffect(() => {
    fetch("http://localhost:8080/api/enum/simEnao")
      .then((resp) => resp.json())
      .then((retorno_convertido) => setsimEnao(retorno_convertido)); //lista de sim e não
  }, []);

  const erroDataIgual = () => {
    toast.error("A data de inicio não pode ser igual a data final!", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "dark",
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
      theme: "dark",
      draggable: true,
      progress: undefined,
    });
  };

  const erroDataInicioMaiorHoje = () => {
    toast.error("A data de inicio não pode ser antes de hoje!", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "dark",
      draggable: true,
      progress: undefined,
    });
  };

  const erroCamposVazios = () => {
    toast.error("Por favor, preencha os campos corretamente!", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "dark",
      draggable: true,
      progress: undefined,
    });
  };

  const erroHorariosDepois = () => {
    toast.error("O horário de inicio não pode ser depois do horário de término!", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "dark",
      draggable: true,
      progress: undefined,
    });
  };

  const erroHorariosIguais = () => {
    toast.error("O horário de inicio não pode ser igual ao horário de término!", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "dark",
      draggable: true,
      progress: undefined,
    });
  };

  const erroMinVagasMaior = () => {
    toast.error("O número minimo de vagas não pode ser maior que o número máximo!", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "dark",
      draggable: true,
      progress: undefined,
    });
  };

  const motivoExclusao = () => {
    toast.error("Por favor, informe o motivo da exclusão.", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "dark",
      draggable: true,
      progress: undefined,
    });
  };

  const motivoAlteracao = () => {
    toast.error("Por favor, informe o motivo da Alteração.", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "dark",
      draggable: true,
      progress: undefined,
    });
  };

  // metodo que efetua o cadastro da turma
  const cadastrar = async (event) => {

    event.preventDefault()

    /* pegar todos  os valores do evento */
    const formData = new FormData(event.target);
    /*formata em um objeto em  json */
    const data = Object.fromEntries(formData);

    const turmas = {

      qtdMatriculas: data.qtdMatriculas,
      instrutor: { id: idInstrutor },
      curso: { id: idCurso },
      periodo: ValuePeriodo,
      dataInicio: data.dataInicio,
      dataTermino: data.dataTermino,
      valor: data.valor,
      status: ValueStatus,
      ambiente: { id: idAmbiente },
      numMaxVagas: data.numMaxVagas,
      numMinVagas: data.numMinVagas,
      simEnao: simEnao,
      parametro: data.parametro,
      horarioInicio: { id: horarioInicioValue },
      horarioTermino: { id: horarioFinalValue },
      diasDaTurma: data.diasDaTurma,
      simEnao: data.simEnao,

    };


    //requisição ao back end
    fetch("http://localhost:8080/api/turma", {
      method: "post",
      body: JSON.stringify(turmas),
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        "Authorization": token
      },
    })
      // convertendo a resposta da promessa em json
      .then((retorno) => {
        if (retorno.status === 409) {
          erroDataIgual();

        } else if (retorno.status === 418) {
          erroDataMaiorFinal();

        } else if (retorno.status === 401) {
          erroDataInicioMaiorHoje();

        } else if (retorno.status === 402) {
          erroHorariosDepois();

        } else if (retorno.status === 406) {
          erroHorariosIguais();

        } else if (retorno.status === 451) {
          erroMinVagasMaior();

        } else {
          retorno.json()
            // pegando o retorno convertido
            .then((retorno_convertido) => {
              // metodo que atualiza a lista, que faz com que ao clicar seja adicionado "automaticamente"
              atualizaLista();

              setShowCadastrar(false)
              // exibindo a msg de aviso de cadastro
              msgCadastro();
             
            });
        }
      });
  };

  const addQtdMatricula = async (id) => {

    let result = await fetch(
      "http://localhost:8080/api/turma/qtdMatricula/" + id, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        "Authorization": token
      },

    }
    )

    if (result) {
      result = await result.json();

      atualizaLista()
    }
  }

  const diminuirQtdMatricula = async (id) => {


    let result = await fetch(
      "http://localhost:8080/api/turma/diminuirQtdMatricula/" + id, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        "Authorization": token
      },

    }
    )

    if (result) {
      result = await result.json();

      atualizaLista()
    }
  }

  const actionLinhaDoTempo = async (id) => {

    localStorage.setItem("idLT", id)

    window.location.href = "http://localhost:3000/linhatempo"
  };

  // função que espera receber um id
  const alterar = async (event) => {

    event.preventDefault()

    let justificativa = document.getElementById("justificativa").value

    if (justificativa === "") {

      motivoAlteracao()

    } else {

      /* pegar todos  os valores do evento */

      const formData = new FormData(event.target);
      /*formata em um objeto em  json */
      const data = Object.fromEntries(formData);



      const turmasA = {
        id: idTurma,
        qtdMatriculas: data.qtdMatriculas,
        instrutor: { id: data.instrutor },
        curso: { id: data.curso },
        periodo: data.periodo,
        dataInicio: data.dataInicio,
        dataTermino: data.dataTermino,
        valor: data.valor,
        status: data.status,
        ambiente: { id: data.ambiente },
        numMaxVagas: data.numMaxVagas,
        numMinVagas: data.numMinVagas,
        simEnao: simEnao,
        diaSemana: data.diasDaTurma,
        horarioInicio: { id: data.horarioInicio },
        horarioTermino: { id: data.horarioFinal },
        diasDaTurma: data.diasDaTurma,
        simEnao: data.simEnao,
        justificativa: justificativa
      };


      let result = await fetch(
        "http://localhost:8080/api/turma/" + idTurma,

        {
          method: "PUT",

          body: JSON.stringify(turmasA),

          headers: {
            "Content-type": "application/json",

            Accept: "application/json",

            "Authorization": token
          },
        }
      );



      if (result.status === 402) {

        alert("OII")
      }
      if (result) {
        setInterval(function () {
          window.location.reload();
        }, 1500);

        fecharModalAlterar()
        atualizaLista();
        msgAlteracao();

      }
    }
  };

  const [statusOrdinal, setStatusOrdinal] = useState()

  const [periodoOrdinal, setPeriodoOrdinal] = useState()

  const [simNaoOrdinal, setSimNaoOrdinal] = useState()

  // metodo que capta a turma que foi selecionado
  const selecionarTurma = (
    id,
    codigo,
    curso,
    instrutor,
    qtdMatriculas,
    periodo,
    valor,
    status,
    ambiente,
    numMaxVagas,
    numMinVagas,
    diaSemana,
    dataInicio,
    simEnao,
    dataTermino,
    horarioInicio,
    horarioTermino,
    diasDaTurma,
    statusOrdinal,
    periodoOrdinal,
    simNaoOrdinal

  ) => {
    setidTurma(id);
    setCodigo(codigo);
    setidCurso(curso);
    setidInstrutor(instrutor);
    setqtdMatriculas(qtdMatriculas);
    setvaluePeriodo(periodo);
    setValor(valor);
    setvalueStatus(status);
    setidAmbiente(ambiente);
    setnumMaxVagas(numMaxVagas);
    setnumMinVagas(numMinVagas);
    setvalueDiaSemana(diaSemana);
    setDataInicio(dataInicio);
    setvaluesimEnao(simEnao);
    setDataTermino(dataTermino);
    setHorarioInicioValue(horarioInicio);
    setHorarioFinalValue(horarioTermino);
    setDiasDaTurma(diasDaTurma.split(','));
    setStatusOrdinal(statusOrdinal);
    setPeriodoOrdinal(periodoOrdinal);
    setSimNaoOrdinal(simNaoOrdinal)
  };

  // metodo que atualiza a lista, puxando todos a turma cadastrada da rest api
  const atualizaLista = async () => {
    const result = await fetch("http://localhost:8080/api/turma"); // await = espera uma promessa
    const resultado = await result.json();
    setTurma(resultado);
  };

  const [descricaoLog, setDescricaoLog] = useState()


  // metodo que deleta a turma
  const deletar = async (id) => {

    if (descricaoLog === undefined || descricaoLog === null) {

      motivoExclusao()

    } else {


      let result = await fetch(`http://localhost:8080/api/turma/${id}`, {
        method: "DELETE",
        body: JSON.stringify(descricaoLog),
        headers: {
          "Authorization": token
        }
      });
      // caso já exista uma turma a ser deletado, ele atualiza a lista assim removendo a turma deletado
      if (result) {

        atualizaLista();
        msgExclusao();
        fecharModalExcluir()
        setDescricaoLog("")
      }
    }
  };

  const capturarDados = (e) => {
    setObjTurma({ ...objTurma, [e.target.name]: e.target.value });
  };

  // metodo que limpa os inputs do form


  // metodo que busca uma turma
  const buscaTurma = async (event) => {
    // valor que esta sendo digitado no input de pesquisa
    let key = event.target.value;

    // verifica se existe 'valor'
    if (key) {
      // fazendo uma requisição na api de busca e passando a key
      console.log("oiiiiiiiiiiiiii", key);
      let result = await fetch(
        `http://localhost:8080/api/turma/buscarTurmaAno/`,
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


  // metodo que busca uma turma
  const buscaDate = async (event) => {
    // valor que esta sendo digitado no input de pesquisa
    let key = event.target.value;

    // verifica se existe 'valor'
    if (key) {
      // fazendo uma requisição na api de busca e passando a key
      console.log("oiiiiiiiiiiiiii", key);
      let result = await fetch(
        `http://localhost:8080/api/turma/buscarData/`,
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
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "dark",
      // faz com que seja possivel arrastar
      draggable: true,
      progress: undefined,
    });
  };

  // metodo de msg de exclusão feita com sucesso
  const msgExclusao = () => {
    toast.success("Turma Removido com Sucesso", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "dark",
      // faz com que seja possivel arrastar
      draggable: true,
      progress: undefined,
    });
  };

  // metodo de msg de alteração feita com sucesso
  const msgAlteracao = () => {
    toast.success("Turma Alterado com Sucesso", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "dark",
      // faz com que seja possivel arrastar
      draggable: true,
      progress: undefined,
    });
  };

  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [page, setPage] = React.useState(0);

  const handleChangePage = (event, newPage) => {


    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));

    setPage(0);
  };

  const DiasDaSemana = [
    "SEG",
    "TER",
    "QUA",
    "QUI",
    "SEX",
    "SAB",
  ]

  const [diasDaSemana, setDiasDaSemana] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setDiasDaSemana(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };



  const handleChange2 = (event) => {
    const {
      target: { value },
    } = event;
    setDiasDaTurma(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const msgErro = () => {
    toast.error("Não existe turma aberta!", {
      position: "top-center",
      autoClose: 7500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "dark",
      // faz com que seja possivel arrastar
      draggable: true,
      progress: undefined,
    });
  };

  const gerarFolderTurma = async () => {
    let result = await fetch("http://localhost:8080/api/folder/turma")

    if (result.status === 409) {

      msgErro()

    } else {

      window.location.href = "http://localhost:8080/api/folder/turma"

    }
  }

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
            style={token == null || p.tipo_usuario === "Secretária" || p === null ? { visibility: "hidden" } : { margin: 10, fontWeight: "bold", borderRadius: "2em", backgroundColor: "black" }}
            variant="contained"
            size="large"
            onClick={abrirModalCadastrar}
            className={classes.button, "botaoTarefaTurma"}
            startIcon={<AddSharpIcon />}
          >
            NOVO
          </Button>

          <TextField

            fullWidth
            onChange={buscaTurma}
            style={{ marginBottom: 25, width: "20em", marginLeft: "3em" }}
            label="buscar turmas"
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

          <TextField
            onInput={(e) => {

              e.target.value = (e.target.value).toString().slice(0, 10)

            }}
            fullWidth
            onChange={buscaDate}
            style={{ marginBottom: 25, width: "20em", marginLeft: "5em" }}
            label="buscar datas"
            id="fullWidth"
            type="date"
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

          <Button
            style={{ margin: 10, fontWeight: "bold", float: "right", backgroundColor: "black", borderRadius: "2em" }}
            variant="contained"
            size="large"
            href="/tarefa"
            className={classes.button, "botaoTarefaTurma"}
            startIcon={<AssignmentIcon />}
          >
            Tarefas
          </Button>

          <Button
            style={{ margin: 10, fontWeight: "bold", float: "right", backgroundColor: "black", borderRadius: "2em" }}
            variant="contained"
            size="large"
            onClick={gerarFolderTurma}
            className={classes.button, "botaoTarefaTurma"}
            startIcon={<FolderIcon />}
          >
            Folder de turmas
          </Button>

          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Código de turma</StyledTableCell>
                  <StyledTableCell>Curso</StyledTableCell>
                  <StyledTableCell>Instrutor</StyledTableCell>
                  <StyledTableCell>Quantidade de matricula</StyledTableCell>
                  <StyledTableCell>Período</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                  <StyledTableCell>Ambiente</StyledTableCell>
                  <StyledTableCell>Nº Máximo de vagas</StyledTableCell>
                  <StyledTableCell>Nº Minimo de vagas</StyledTableCell>
                  <StyledTableCell>Dias da semana</StyledTableCell>
                  <StyledTableCell>Data de inicio</StyledTableCell>
                  <StyledTableCell>Data de Término</StyledTableCell>
                  <StyledTableCell>Horario de Inicio</StyledTableCell>
                  <StyledTableCell>Horario de término</StyledTableCell>
                  <StyledTableCell>A turma vai para o site?</StyledTableCell>
                  <StyledTableCell>Turma pode ser lançada</StyledTableCell>
                  <StyledTableCell id="alterar"
                    style={token === null || p.tipo_usuario === "Secretária" || p === null
                      ?
                      { display: "none" }
                      :
                      { visibility: "visible" }
                    }

                  >Alterar</StyledTableCell>
                  <StyledTableCell id="excluir" style={token === null || p.tipo_usuario === "Secretária" || p === null
                    ?
                    { display: "none" }
                    :
                    { visibility: "visible" }
                  }>Excluir</StyledTableCell>

                  <StyledTableCell id="excluir" style={token === null || p.tipo_usuario === "Secretária" || p === null
                    ?
                    { display: "none" }
                    :
                    { visibility: "visible" }
                  }>LinhaTempo</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {turmas
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(
                    ({
                      id,
                      codigo,
                      curso,
                      instrutor,
                      qtdMatriculas,
                      periodo,
                      valor,
                      status,
                      ambiente,
                      numMaxVagas,
                      numMinVagas,
                      diaSemana,
                      dataInicio,
                      simEnao,
                      dataTermino,
                      horarioInicio,
                      horarioTermino,
                      diasDaTurma,
                      podeSerLancado,
                      statusString,
                      periodoString,
                      simNaoString,
                      statusOrdinal,
                      periodoOrdinal,
                      simNaoOrdinal



                    }) => (
                      <StyledTableRow>
                        <StyledTableCell>{codigo}</StyledTableCell>
                        <StyledTableCell>{curso.nome}</StyledTableCell>
                        <StyledTableCell>{instrutor.nome}</StyledTableCell>

                        <StyledTableCell>

                          <a href="#"><RemoveIcon style={token == null || p.tipo_usuario === "Secretária" || p === null ? { display: "none" } : { visibility: "visible", color: "#9d0208" }}
                            onClick={() => diminuirQtdMatricula(id)} /></a>

                          {qtdMatriculas}

                          <a href="#"><AddIcon style={token == null || p.tipo_usuario === "Secretária" || p === null ? { display: "none" } : { visibility: "visible", color: "#2AFF00" }}
                            onClick={() => addQtdMatricula(id)}></AddIcon></a>

                        </StyledTableCell>
                        <StyledTableCell>{periodoString}</StyledTableCell>
                        <StyledTableCell>{statusString}</StyledTableCell>
                        <StyledTableCell>{ambiente.nome}</StyledTableCell>
                        <StyledTableCell>{numMaxVagas}</StyledTableCell>
                        <StyledTableCell>{numMinVagas}</StyledTableCell>
                        <StyledTableCell>{diasDaTurma}</StyledTableCell>
                        <StyledTableCell>{moment(dataInicio).format('DD/MM/YYYY')}</StyledTableCell>
                        <StyledTableCell>{moment(dataTermino).format('DD/MM/YYYY')}</StyledTableCell>
                        <StyledTableCell>{horarioInicio.horario}</StyledTableCell>
                        <StyledTableCell>{horarioTermino.horario}</StyledTableCell>
                        <StyledTableCell>{simNaoString}</StyledTableCell>

                        <StyledTableCell><div style={podeSerLancado === false ? { backgroundColor: "red", width: "2em", height: "2em", borderRadius: "3em" } : { backgroundColor: "#2AFF00", width: "2em", height: "2em", borderRadius: "3em" }}></div></StyledTableCell>

                        <StyledTableCell style={token === null || p === null || p.tipo_usuario === "Secretária"
                          ?
                          { display: "none" }
                          :
                          { visibility: "visible" }
                        }>

                          <button
                            className="botaoAlterarTurma"
                            onClick={() => {
                              selecionarTurma(
                                id,
                                codigo,
                                curso,
                                instrutor,
                                qtdMatriculas,
                                periodo,
                                valor,
                                status,
                                ambiente,
                                numMaxVagas,
                                numMinVagas,
                                diaSemana,
                                dataInicio,
                                simEnao,
                                dataTermino,
                                horarioInicio,
                                horarioTermino,
                                diasDaTurma,
                                statusOrdinal,
                                periodoOrdinal,
                                simNaoOrdinal
                              );

                              abrirModalAlterar();
                            }}
                          >
                            <ModeEditOutlinedIcon />

                          </button>
                        </StyledTableCell>
                        <StyledTableCell style={token === null || p.tipo_usuario === "Secretária" || p === null
                          ?
                          { display: "none" }
                          :
                          { visibility: "visible" }
                        }>
                          <button

                            className="botaoDeleteTurma"
                            onClick={() => {
                              abrirModalExcluir(id)


                            }}>
                            <DeleteForeverOutlinedIcon />
                          </button>

                          <Modal
                            show={modalExcluir}
                            onHide={fecharModalExcluir}
                            backdrop="static"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered>


                            <Modal.Header closeButton className="bodyExcluir">
                              <Modal.Title className='tituloExcluir'>ALERTA!</Modal.Title>
                            </Modal.Header>
                            <form>
                              <Modal.Body>
                                <h4 className="textoExcluir">Tem Certeza que deseja excluir?</h4>


                                <TextField
                                  id="outlined-multiline-static"
                                  value={descricaoLog}
                                  label="Justificativa:"
                                  hiddenLabel
                                  required
                                  className="textAreaExcluir"
                                  multiline
                                  rows={4}
                                  onChange={(e) => {
                                    setDescricaoLog(e.target.value)
                                  }}

                                />
                              </Modal.Body>


                              <Modal.Footer className="botaoModalExcluir">
                                <Button variant="contained" color="error" className="botaoModalSim" onClick={fecharModalExcluir}>
                                  Não
                                </Button>
                                <Button variant="contained" color="success" onClick={() => {
                                  //excluir a turma pelo id
                                  deletar(idTurma)

                                }}>
                                  Sim
                                </Button>
                              </Modal.Footer>
                            </form>

                          </Modal>

                        </StyledTableCell>

                        <StyledTableCell style={token === null || p === null || p.tipo_usuario === "Secretária"
                          ?
                          { display: "none" }
                          :
                          { visibility: "visible" }
                        }>

                          <Button className="btnLinha" onClick={() => {
                            actionLinhaDoTempo(id)

                          }}><RemoveRedEyeIcon/></Button>
                        </StyledTableCell>
                      </StyledTableRow>
                    )
                  )}
                  {!removeLoad && <Load/>}
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
              count={turmas.length}
              labelRowsPerPage='Linhas por páginas'
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>

          <ToastContainer
            position="top-center"
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
            scrollable={true}
          >
            <Modal.Header closeButton>
              <Modal.Title>Alterar</Modal.Title>
            </Modal.Header>

            <Modal.Body style={{ height: 610 }}>
              <div>
                <img
                  className="imagemModalAlt"
                  src={require("./imagemModal.png")}
                ></img>
              </div>
              <div className="modalCad">
                <form className="formModalCad" onSubmit={alterar}>
                  {/*  input de quantidade de mátriculas */}
                  {/*  <TextField defaultValue={objTurma.id} sx={styleTextField} className="textField" name="qtdMatriculas" variant="outlined" disabled={true} />*/}

                  <div className="parte1">
                    <TextField
                      value={qtdMatriculas}
                      sx={styleTextField}
                      className="textField"
                      onChange={(e) => {
                        setqtdMatriculas(e.target.value);
                        capturarDados(e);
                      }}
                      name="qtdMatriculas"
                      type="number"
                      required
                      label="qtd de Matriculas"
                      variant="standard"
                    />

                    <TextField
                      value={numMaxVagas}
                      sx={styleTextField}
                      className="textField"
                      onChange={(e) => {
                        setnumMaxVagas(e.target.value);
                        capturarDados(e);
                      }}
                      name="numMaxVagas"
                      type="number"
                      required
                      label="Máximo de vagas:"
                      variant="standard"
                    />
                  </div>

                  <div className="parte2">

                    <TextField
                      value={numMinVagas}
                      sx={styleTextField}
                      className="textField"
                      onChange={(e) => {
                        setnumMinVagas(e.target.value);
                        capturarDados(e);
                      }}
                      name="numMinVagas"
                      type="number"
                      required
                      label="Minimo de vagas"
                      variant="standard"
                    />

                    <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                      <InputLabel id="demo-simple-select-standard-label">
                        Ambiente
                      </InputLabel>
                      <Select // select de ambiente
                        defaultValue={idAmbiente.id}
                        name="ambiente"
                        required
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"

                      >
                        {ambiente.map((obj, indice) => (
                          <MenuItem value={obj.id} selected={obj.id == idAmbiente.id} key={indice}>
                            {obj.nome}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>

                  <div className="parte3">


                    <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                      <InputLabel id="demo-simple-select-standard-label">
                        Cursos:
                      </InputLabel>
                      <Select // select de curso
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        name="curso"
                        required
                        defaultValue={idCurso.id}

                      >
                        {curso.map((obj) => (
                          <MenuItem value={obj.id} selected={obj.id == idCurso.id}>{obj.nome}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                  </div>


                  <div className="select1">
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                      <InputLabel id="demo-simple-select-standard-label">
                        Instrutor:
                      </InputLabel>
                      <Select // select de instrutores
                        name="instrutor"
                        required
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        defaultValue={idInstrutor.id}

                      >
                        {instrutor.map((obj, indice) => (
                          <MenuItem value={obj.id} selected={obj.id == idInstrutor.id} key={indice}>  {obj.nome}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                  </div>

                  <div className="select2">
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                      <InputLabel id="demo-simple-select-standard-label">
                        Periodo:
                      </InputLabel>
                      <Select //select de período
                        defaultValue={periodoOrdinal}
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        name="periodo"
                        required


                      >
                        {periodo.map((obj, indice) => (
                          <MenuItem value={indice} key={indice}>
                            {obj}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                      <InputLabel id="demo-simple-select-standard-label">
                        Horario Inicio:
                      </InputLabel>
                      <Select //select de período
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        name="horarioInicio"
                        required
                        defaultValue={horarioInicioValue.id}

                      >
                        {horarios.map((obj, indice) => (
                          <MenuItem value={obj.id} selected={obj.id === horarioInicioValue.id} key={indice}>
                            {obj.horario}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>

                  <div className="select3">
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                      <InputLabel id="demo-simple-select-standard-label">
                        Status:
                      </InputLabel>
                      <Select //select de status
                        defaultValue={statusOrdinal}
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        name="status"
                        required

                      >
                        {status.map((obj, indice) => (
                          <MenuItem value={indice} key={indice}>
                            {obj}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>



                    <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                      <InputLabel id="demo-simple-select-standard-label">
                        Horario Término:
                      </InputLabel>
                      <Select //select de período
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        name="horarioFinal"
                        required
                        defaultValue={horarioFinalValue.id}




                      >
                        {horarios.map((obj, indice) => (
                          <MenuItem value={obj.id} selected={obj.id === horarioFinalValue.id} key={indice} >
                            {obj.horario}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>

                  <div className="select4Alt">
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                      <InputLabel id="demo-simple-select-standard-label">

                        A turma vai para o site?

                      </InputLabel>

                      <Select

                        defaultValue={simNaoOrdinal}

                        style={styleTextField}

                        labelId="demo-simple-select-standard-label"

                        id="demo-simple-select-standard"

                        name="simEnao"


                        required
                      >
                        {simEnao.map((obj, indice) => (

                          <MenuItem value={indice} key={indice}>{obj}</MenuItem>

                        ))}

                      </Select>
                    </FormControl>

                  </div>

                  <FormControl sx={{ m: 1, width: 300, top: 500, left: -10 }} className="diaSemana">
                    <InputLabel id="demo-multiple-checkbox-label">Dias da Semana</InputLabel>
                    <Select
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      name="diasDaTurma"
                      multiple
                      required
                      defaultValue={diasDaTurma}
                      onChange={handleChange2}
                      input={<OutlinedInput label="Dias da Semana" />}
                      renderValue={(selected) => selected.join(",")}
                      MenuProps={MenuProps}
                    >
                      {DiasDaSemana.map((dias) => (
                        <MenuItem key={dias} value={dias}>

                          <Checkbox checked={diasDaTurma.indexOf(dias) > -1} />
                          <ListItemText primary={dias} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <div>
                    <div className="horarioInicio" style={{ left: 30 }}>
                      <TextField
                        sx={estiloData}
                        name="dataInicio"
                        label="Data inicio"
                        onChange={(e) => {
                          setDataInicio(e.target.value);
                          capturarDados(e);
                        }}
                        InputLabelProps={{ shrink: true, required: true }}
                        type="date"
                        required
                        variant="standard"
                        value={dataInicioFormatada}
                      />
                    </div>

                    <div className="horarioFinal" style={{ left: 285 }}>
                      <TextField
                        sx={estiloData}
                        variant="standard"
                        label="Data Terminio"
                        name="dataTermino"
                        required
                        onChange={(e) => {
                          setDataTermino(e.target.value);
                          capturarDados(e);
                        }}
                        InputLabelProps={{ shrink: true, required: true }}
                        type="date"
                        value={dataTerminoFormatada}
                      />
                    </div>

                    <div className="justificativaAltTurma">
                      <TextField
                        id="justificativa"
                        name="justificativa"
                        label="justifique sua alteração"
                        multiline
                        rows={4}
                      />
                    </div>

                  </div>

                  <div class="parteBotao" style={{ left: 330, top: 535 }}>
                    <Button
                      variant="contained"
                      color="success"

                      type="submit"
                    >
                      Alterar
                    </Button>


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
            scrollable={true}
          >
            <Modal.Header closeButton>
              <Modal.Title>Cadastrar</Modal.Title>
            </Modal.Header>

            <Modal.Body style={{ height: 610 }}>
              <div>
                <img
                  className="imagemModal"
                  src={require("../../imagens/cadTurma.png")}
                ></img>
              </div>
              <div className="modalCad">
                <form className="formModalCad" onSubmit={cadastrar}>
                  {/*  input de quantidade de mátriculas */}
                  {/*  <TextField defaultValue={objTurma.id} sx={styleTextField} className="textField" name="qtdMatriculas" variant="outlined" disabled={true} />*/}

                  <div className="parte1">

                    <TextField

                      sx={styleTextField}
                      className="textField"
                      required="required"
                      name="numMinVagas"
                      type="number"
                      label="Minimo de vagas"
                      variant="standard"
                    />
                  </div>

                  <div className="parte2">


                    <TextField

                      sx={styleTextField}
                      className="textField"
                      required="required"
                      name="numMaxVagas"
                      type="number"
                      label="Máximo de vagas:"
                      variant="standard"
                    />

                    <FormControl variant="standard" sx={{ m: 1, minWidth: 200, position: "absolute", top: "3.3em" }}>
                      <InputLabel id="demo-simple-select-standard-label">
                        Ambiente
                      </InputLabel>
                      <Select // select de ambiente
                        value={idAmbiente}
                        name="ambiente"
                        required
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        onChange={(e) => {
                          setidAmbiente(e.target.value);
                          capturarDados(e);
                        }}
                      >
                        {ambiente.map((obj, indice) => (
                          <MenuItem value={obj.id} key={indice}>
                            {obj.nome}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>

                  <div className="parte3Cad">


                    <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                      <InputLabel id="demo-simple-select-standard-label">
                        Cursos:
                      </InputLabel>
                      <Select // select de curso
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        name="curso"
                        required
                        value={idCurso}
                        onChange={(e) => {
                          setidCurso(e.target.value);
                          capturarDados(e);
                        }}
                      >
                        {curso.map((obj) => (
                          <MenuItem value={obj.id}>{obj.nome}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                  </div>


                  <div className="select1">
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 200, position: "absolute", top: "-1em" }}>
                      <InputLabel id="demo-simple-select-standard-label">
                        Instrutor:
                      </InputLabel>
                      <Select // select de instrutores
                        name="instrutor"
                        required
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={idInstrutor}
                        onChange={(e) => {
                          setidInstrutor(e.target.value);
                          capturarDados(e);
                        }}
                      >
                        {instrutor.map((obj, indice) => (
                          <MenuItem value={obj.id}>{obj.nome}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>

                  <div className="select2Cad">
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                      <InputLabel id="demo-simple-select-standard-label">
                        Periodo:
                      </InputLabel>
                      <Select //select de período
                        defaultValue={objTurma.periodo}
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        name="periodo"
                        required
                        value={ValuePeriodo}
                        onChange={(e) => {
                          setvaluePeriodo(e.target.value);
                          capturarDados(e);
                        }}
                      >
                        {periodo.map((obj, indice) => (
                          <MenuItem value={indice} key={indice}>
                            {obj}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                      <InputLabel id="demo-simple-select-standard-label">
                        Horario Inicio:
                      </InputLabel>
                      <Select //select de período
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        name="horarioInicio"
                        required
                        value={horarioInicioValue}
                        onChange={(e) => {
                          setHorarioInicioValue(e.target.value);
                          capturarDados(e);
                        }}
                      >
                        {horarios.map((obj, indice) => (
                          <MenuItem value={obj.id} key={indice}>
                            {obj.horario}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>

                  <div className="select3">

                    <FormControl variant="standard" sx={{ m: 1, minWidth: 200, position: "absolute", top: "-1.8em" }}>
                      <InputLabel id="demo-simple-select-standard-label">
                        Horario Término:
                      </InputLabel>
                      <Select //select de período
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        name="horarioFinal"
                        required
                        value={horarioFinalValue}
                        onChange={(e) => {
                          setHorarioFinalValue(e.target.value);
                          capturarDados(e);
                        }}
                      >
                        {horarios.map((obj, indice) => (
                          <MenuItem value={obj.id} key={indice}>
                            {obj.horario}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>

                  <div className="select4">

                    <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>

                      <InputLabel id="demo-simple-select-standard-label">

                        A turma vai para o site?

                      </InputLabel>

                      <Select //select de turmas

                        value={valuesimEnao}

                        labelId="demo-simple-select-standard-label"

                        id="demo-simple-select-standard"

                        name="simEnao"

                        required

                        onChange={(e) => {

                          setvaluesimEnao(e.target.value);

                          capturarDados(e);

                        }}

                      >

                        {simEnao.map((obj, indice) => (

                          <MenuItem value={indice} key={indice}>

                            {obj}

                          </MenuItem>

                        ))}

                      </Select>

                    </FormControl>

                    <FormControl variant="standard" sx={{ m: 1, minWidth: 200, position: "absolute", left: "15em" }}>
                      <InputLabel id="demo-simple-select-standard-label">
                        Status:
                      </InputLabel>
                      <Select //select de status
                        value={ValueStatus}
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        name="status"
                        required
                        onChange={(e) => {
                          setvalueStatus(e.target.value);
                          capturarDados(e);
                        }}
                      >
                        {status.map((obj, indice) => (
                          <MenuItem value={indice} key={indice}>
                            {obj}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                  </div>

                  <FormControl sx={{ m: 1, width: 300, top: 500, left: -10 }} className="diaSemana">
                    <InputLabel id="demo-multiple-checkbox-label">Dias da Semana</InputLabel>
                    <Select
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      name="diasDaTurma"
                      multiple
                      required="required"
                      defaultValue={diasDaSemana}
                      onChange={handleChange}
                      input={<OutlinedInput label="Dias da Semana" />}
                      renderValue={(selected) => selected.join(",")}
                      MenuProps={MenuProps}
                    >
                      {DiasDaSemana.map((dias) => (
                        <MenuItem key={dias} value={dias}>
                          <Checkbox checked={diasDaSemana.indexOf(dias) > -1} />
                          <ListItemText primary={dias} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <div>
                    <div className="horarioInicioCad" style={{ left: 30 }}>
                      <TextField
                        sx={estiloData}
                        label="Data inicio"
                        name="dataInicio"
                        required="required"
                        InputLabelProps={{ shrink: true, required: true }}
                        type="date"
                        variant="standard"

                      />
                    </div>

                    <div className="horarioFinalCad" style={{ left: 270 }}>
                      <TextField
                        sx={estiloData}
                        variant="standard"
                        name="dataTermino"
                        label="Data Terminio"
                        required="required"
                        InputLabelProps={{ shrink: true, required: true }}
                        type="date"

                      />
                    </div>
                  </div>

                  <div class="parteBotao" style={{ left: 330, top: 535 }}>
                    <Button
                      variant="contained"
                      color="success"

                      type="submit"
                    >
                      cadastrar
                    </Button>


                  </div>
                </form>
              </div>
            </Modal.Body>
          </Modal>
        </Box>
      </Box>
    </>
  );
}


const styleTextField = {
  display: "flex",
  flexDirection: "row",
  marginBottom: "2em"
};

const estiloData = {
  display: "flex",
  flexDirection: "row",
  marginBottom: "2em",
};




export default CadTurma;