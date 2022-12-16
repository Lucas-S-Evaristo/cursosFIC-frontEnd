import React, { useEffect, useState } from "react";
import "./login.css"
import api from "../api/api"
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from "react-toastify";
import { Redirect } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { Button, Paper, styled, TextField, Tooltip, tooltipClasses } from "@mui/material";
import { AlterarSenha, redefinirSenha, verificarEmail } from "./redefinirSenha";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InfoIcon from '@mui/icons-material/Info';

let tokenUsuario = sessionStorage.getItem("token")

const msgErroLogin = () => {

  toast.error("Informações não encontrada", {
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

const msgSucessoSenha = () => {
  toast.success("Senha redefinida com sucesso! ", {
    position: "top-center",

    autoClose: 2000,

    hideProgressBar: false,

    closeOnClick: true,

    pauseOnHover: true,

    theme: "dark",

    // faz com que seja possivel arrastar

    draggable: true,

    progress: undefined,
  });
};

const msgErroSenhaNaoIgual = () => {
  toast.error("As senhas não são iguais! ", {
    position: "top-right",

    autoClose: 2000,

    hideProgressBar: false,

    closeOnClick: true,

    pauseOnHover: true,

    theme: "dark",

    // faz com que seja possivel arrastar

    draggable: true,

    progress: undefined,
  });
};

const msgMinimoSenha = () => {
  toast.error("Sua senha precisa ter no minimo 4 caracteres! ", {
    position: "top-right",

    autoClose: 2000,

    hideProgressBar: false,

    closeOnClick: true,

    pauseOnHover: true,

    theme: "dark",

    // faz com que seja possivel arrastar

    draggable: true,

    progress: undefined,
  });
};



function Login() {

  const [tokenUser, setTokenUser] = useState()


  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const [values2, setValues2] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleChange2 = (prop) => (event) => {
    setValues2({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword2 = () => {
    setValues2({
      ...values2,
      showPassword: !values2.showPassword,
    });
  };

  const handleMouseDownPassword2 = (event) => {
    event.preventDefault();
  };



  const [values3, setValues3] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleChange3 = (prop) => (event) => {
    setValues3({ ...values3, [prop]: event.target.value });
  };

  const handleClickShowPassword3 = () => {
    setValues3({
      ...values3,
      showPassword: !values3.showPassword,
    });
  };

  const handleMouseDownPassword3 = (event) => {
    event.preventDefault();
  };


  const [usuario2, setusuario] = useState([]);
  const [modalSenha, setShowSenha] = useState(false);

  const abrirModalSenha = () => setShowSenha(true);

  const fecharModalSenha = () => setShowSenha(false);

  const loginToken = async (event) => {
    /* tiras as características de evento evitando Recarregar  a pagina */
    event.preventDefault();
    /* pegar todos  os valores do evento */
    const formData = new FormData(event.target);
    /*formata em um objeto em  json */
    const data = Object.fromEntries(formData);

    /* let obgj = {
      nome: data,
    }; */

    /* verificar se  requisição foi feita com sucesso */
    let result = await fetch(`http://localhost:8080/api/usuario/login`, {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",

      },
    });

    /* verificar se a requisição Retornou um erro 401*/
    if (result.status === 401) {
      msgErroLogin()

    } else if (result.status === 307) {
      result = await result.json();

      setusuario(result)
      abrirModalSenha()


    } else if (result.status === 308) {

      setOpen(true)

    } else if (result) {
      result = await result.json();

      const { token } = result;

      sessionStorage.setItem('token', JSON.stringify(token));

      if (token != null) {

        function parseJwt(token) {

          var base64Url = token.split(".")[1];

          var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

          var jsonPayload = decodeURIComponent(

            atob(base64).split("").map(function (c) {

              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);

            })
              .join("")
          );

          return JSON.parse(jsonPayload);
        }
        let payload = parseJwt(token);

        sessionStorage.setItem('payload', JSON.stringify(payload));

      }

      window.location.href = 'http://localhost:3000'

      /* mensagem de cadastrar com sucesso */

    }
  };

  const redefinirSenha = async (event) => {
    /* tiras as características de evento evitando Recarregar  a pagina */
    event.preventDefault();
    /* pegar todos  os valores do evento */
    const formData = new FormData(event.target);
    /*formata em um objeto em  json */
    const data = Object.fromEntries(formData);

    if (data.senha === data.senha2) {
      if (data.senha.length >= 4) {

        let obj = {

          id: usuario2.id,

          nome: usuario2.nome,

          email: usuario2.email,

          nif: usuario2.nif,

          tipoUsuario: usuario2.tipoUsuario,

          senha: data.senha


        }

        let result = await fetch(`http://localhost:8080/api/usuario/redefinirSenha/${usuario2.id}`, {
          method: "PUT",
          body: JSON.stringify(obj),
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
        });
        if (result.status === 409) {
          msgMinimoSenha()


        } else if (result) {

          fecharModalSenha()

          setInterval(function () { window.location.reload(); }, 1500);

          msgSucessoSenha()
        }

      } else {
        msgMinimoSenha()

      }
    } else {
      msgErroSenhaNaoIgual()
    }
  };

  const msgEmailDuplicados = () => {
    toast.error("Email ja esta associado a um usuario", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "dark",
      // faz com que seja possivel arrastar
      draggable: true,
      progress: undefined,
    });
  };

  const nifValidacao = () => {
    toast.error("Nif precisa ter de 5 a 7 caracteres!", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "dark",
      // faz com que seja possivel arrastar
      draggable: true,
      progress: undefined,
    });
  };

  const msgNifDuplicados = () => {
    toast.error("Nif ja esta associado a um usuario", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "dark",
      // faz com que seja possivel arrastar
      draggable: true,
      progress: undefined,
    });
  };

  const msgCamposVazio = () => {
    toast.error("Preencha os Campos Corretamente", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "dark",
      // faz com que seja possivel arrastar
      draggable: true,
      progress: undefined,
    });
  };

  const msgCadastro = () => {
    toast.success("Usuário Cadastrado com Sucesso", {
      position: "top-right",
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

  const [tipoUsuario, setTipoUsuario] = useState([]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/api/enum/tipoUsuario")
      .then((resp) => resp.json())
      .then((retorno_convertido) => setTipoUsuario(retorno_convertido)); //lista de usuários
  }, []);

  const cadastrar = async (event) => {

    event.preventDefault()

    const formData = new FormData(event.target)

    const data = Object.fromEntries(formData);

    if (data.nif.length >= 5 && data.nif.length <= 7) {

      const usuario = {

        nome: data.nome,
        nif: data.nif,
        tipoUsuario: data.tipoUsuario,
        email: data.email,
        senha: data.senha

      };

      let result = fetch("http://localhost:8080/api/usuario", {
        method: "post",
        body: JSON.stringify(usuario),
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: tokenUsuario,
        },
      }).then((retorno) => {
        //se o input estiver vazio, passar uma resposta de erro e enviar mensagem de erro
        if (retorno.status === 500 || retorno.status === 400) {
          msgCamposVazio();

          // se existir um email existente
        } else if (retorno.status === 409) {
          document.getElementById("email").value = ""; // Limpa o campo

          msgEmailDuplicados();
        } else if (retorno.status === 510) {
          document.getElementById("nif").value = ""; // Limpa o campo
          msgNifDuplicados();
        } else {
          //faz o processo de cadastro
          retorno.json().then((retorno_convertido) => {
            //exibir notificação de sucesso
            msgCadastro();

            setOpen(false)

            setInterval(function () { window.location.reload(); }, 1500);



          });
        }
      });
    } else {

      nifValidacao()

    }
  };

  const [usuario, setUsuario] = useState([])

  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:8080/api/usuario")
        .then((resp) => resp.json())
        .then((retorno_convertido) => setUsuario(retorno_convertido)); //lista de usuários
    }, 2000)

  }, []);

  const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
    },
  }));

  return (

    <div className="divLogin">
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

      <Modal
        show={open}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >

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

        <Box sx={style}>
          <form onSubmit={cadastrar}>
            <div>
              <h2 style={titleModal}>ADICIONAR USUÁRIO</h2>
              <TextField
                id="nome"
                sx={styleTextField}
                className="textField"
                name="nome"
                type="text"
                label="NOME"
                variant="outlined"
              />
              <InputLabel id="demo-simple-select-label">
                Tipo Usuario
              </InputLabel>
              <select
                id="tipoUsuario"
                style={styleSelect}
                value={1}
                name="tipoUsuario"
                required
                className="form-control"
              >

                {tipoUsuario.map((obj, indice) => (
                  <option value={indice} key={indice}>{obj}</option>
                ))}
              </select>
              <TextField
                required
                sx={styleTextField}
                id="nif"
                name="nif"
                minlength="7"
                maxlength="9"
                type="text"
                label="NIF"
                variant="outlined"
              ></TextField>
              <TextField
                autoComplete="email"
                sx={styleTextField}
                id="email"
                name="email"
                type="email"
                label="EMAIL"
                variant="outlined"
              />
            </div>
            <Button
              variant="contained"
              style={{ color: "white", marginTop: 20 }}
              color={"success"}
              type="submit"
            >
              Cadastrar
            </Button>

          </form>
          <Paper elevation={0}>
            <img
              style={imgStyle}
              src={require('../../imagens/imgAltUsu.png')}
            />
          </Paper>
        </Box>
      </Modal>

      <header style={{ color: "white" }}>
        <img src={require("../login/LogoSenaiOriginal.png")} className="logo" />


        <a href="/" className="aTurmas">Lista de Turmas</a>
      </header>
      <div className="divs">
        <div className="div1" >

          <form className="formLogin" onSubmit={loginToken}>
            <h1 className="title">Login</h1>
            <div className="divInput">
              <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                <InputLabel htmlFor="standard-basic">Nif</InputLabel>
                <Input id="standard-basic" label="Nif" name="nif" variant="standard" endAdornment={
                  <InputAdornment position="start">
                    <BootstrapTooltip title="nenhum usuário cadastrado, informe o acesso default!" style={usuario.length === 0 ? { display: "visible" } : { display: "none" }}>
                      <IconButton>
                        <InfoIcon style={{ color: "black" }} />
                      </IconButton>
                    </BootstrapTooltip>
                  </InputAdornment>
                } />
              </FormControl>

              <FormControl sx={{ m: 1, width: '25ch', height: "5ch", marginTop: "3em" }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">Senha</InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  name="senha"
                  className="inputSenha2"
                  onChange={handleChange('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <a href="/redefinirSenha" className="aEscSennha">Esqueceu a senha?</a>
              <div className="divBtn">
                <button className="btnEntrar" type="submit">
                  <p className="pEntrar" style={{ position: "relative", top: '-0.4vh' }}>Entrar</p>
                </button>
              </div>
            </div>

          </form>
        </div>
        <div className="div2">
          <img src={require("./imgPc.png")} className="imgDiv2" />
        </div>
      </div>

      <Modal

        style={{ height: "35vh" }}
        show={modalSenha}
        onHide={fecharModalSenha}
        backdrop="static"
        keyboard={false}>

        <Modal.Body className="redefinirSenha" style={{ borderRadius: "45px" }}>

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
          <form onSubmit={redefinirSenha} >
            <div className="divForm">
              <h5 style={{ position: "relative", left: "-9.3vh", top: "1vh" }}>Por favor, Redefina sua senha!</h5>

              <FormControl sx={{ m: 1, width: '47.5ch' }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">Senha</InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={values2.showPassword ? 'text' : 'password'}
                  value={values2.password}
                  name="senha"
                  onChange={handleChange2('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword2}
                        onMouseDown={handleMouseDownPassword2}
                      >
                        {values2.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>

              <h5 style={{ position: "relative", left: "-13.9vh", top: "1vh" }}> Confirme sua senha!</h5>

              <FormControl sx={{ m: 1, width: '47.5ch' }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">Senha</InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={values3.showPassword ? 'text' : 'password'}
                  value={values3.password}
                  name="senha2"
                  onChange={handleChange3('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword3}
                        onMouseDown={handleMouseDownPassword3}
                      >
                        {values3.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>


            <div class="parteBotaoRedefinirSenha">
              <Button variant="contained" color="success" type="submit" className="btnRedefinir">Redefinir</Button>

            </div>

          </form>

        </Modal.Body>

      </Modal>

    </div>
  )
}

const imgStyle = {
  border: "none",
  width: "400px",
  height: "400px",
  margin: "50px auto",
  position: "center",
};

const styleTextField = {
  display: "flex",
  flexDirection: "row",
  marginBottom: "30px",
  width: "450px",
};

const styleSelect = {
  width: "235px",
  height: "40px",
  marginBottom: "30px",
};

const titleModal = {
  marginBottom: 30,
};

const btnClose = {
  marginTop: "20px",
  marginLeft: "20px",
  borderRadius: "0.5vh",
  color: "#ffff",
  backgroundColor: "red",
};

const style = {
  position: "absolute",
  top: "20em",
  display: "flex",
  flexDirection: "row",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  borderRadius: "1vh",
  boxShadow: 240,
  p: 4,
};

const style2 = {
  position: "absolute",
  top: "50%",
  display: "flex",
  flexDirection: "row",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  height: 200,
  borderRadius: "1vh",
  boxShadow: 240,
  p: 4,
};

export default Login; 