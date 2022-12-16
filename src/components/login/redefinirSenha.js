import React from "react";
import "./RdfSenha.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const msgErroRedefinir = () => {
  toast.error("E-mail não encontrado", {
    position: "top-center",

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
const msgRedefinir = () => {
  toast.success("Verifique o E-mail ", {
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

const msgSucessoSenha = () => {
  toast.success("Senha redefinida com sucesso! ", {
    position: "top-center",

    autoClose: 2000,

    hideProgressBar: false,

    closeOnClick: true,

    pauseOnHover: true,

    theme: "colored",

    // faz com que seja possivel arrastar

    draggable: true,

    progress: undefined,
  });
};

const msgMinimoSenha = () => {
  toast.error("Sua senha precisa ter no minimo 4 caracteres! ", {
    position: "top-center",

    autoClose: 2000,

    hideProgressBar: false,

    closeOnClick: true,

    pauseOnHover: true,

    theme: "colored",

    // faz com que seja possivel arrastar

    draggable: true,

    progress: undefined,
  });
};

const msgSenhaVazia = () => {
  toast.error("Por favor, digite sua senha! ", {
    position: "top-center",

    autoClose: 2000,

    hideProgressBar: false,

    closeOnClick: true,

    pauseOnHover: true,

    theme: "colored",

    // faz com que seja possivel arrastar

    draggable: true,

    progress: undefined,
  });
};

export const verificarEmail = async (event) => {
  /* tiras as características de evento evitando Recarregar  a pagina */
  event.preventDefault();
  /* pegar todos  os valores do evento */
  const formData = new FormData(event.target);
  /*formata em um objeto em  json */
  const data = Object.fromEntries(formData);

  let result = await fetch(`http://localhost:8080/api/usuario/verificarParametro`, {
    method: "post",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
  });
  if (result.status === 406) {
    msgErroRedefinir();


  } else if (result.status === 200) {

    msgRedefinir();
    document.getElementById("textEmail").value = "";
    setTimeout(() => {
      window.location.href = 'http://localhost:3000/login'
      }, 3000)
  
  }
};

export const redefinirSenha = async (event) => {
  /* tiras as características de evento evitando Recarregar  a pagina */
  event.preventDefault();
  /* pegar todos  os valores do evento */
  const formData = new FormData(event.target);
  /*formata em um objeto em  json */
  const data = Object.fromEntries(formData);

  let result = await fetch(`http://localhost:8080/api/usuario/redefinirSenha`, {
    method: "post",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
  });
  if (result.status === 409) {
    msgMinimoSenha()
    event.preventDefault()

  } else if (result.status === 406) {
    msgSenhaVazia()
    event.preventDefault()

  } else {

    msgSucessoSenha()

  }
};

function Senha() {
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
      <header style={{ color: "white" }}>
        <img src={require("../login/LogoSenaiOriginal.png")} className="logo" />
      </header>
      <div className="divs">
        <div className="div1">
          <form className="formRDFS" onSubmit={verificarEmail}>
            <a href="/login" className="aVoltar">
              <button className="btnVoltar" type={"button"}>
                <ArrowBackIcon className="arrow" fontSize="large" />
              </button>
            </a>

            <h1 className="title">Redefinir Senha</h1>
            <div className="divInput">
              <input
                placeholder="Email"
                name="email"
                id="textEmail"
                className="inEmail inputLogin"
                type={"email"}
              />

              <button className="btnRedefinir" type="submit">

                Redefinir

              </button>
            </div>
          </form>
        </div>
        <div className="div2">
          <img src={require("./imgPc.png")} className="imgDiv2" />
        </div>
      </div>



    </div>
  );
}

export default Senha
