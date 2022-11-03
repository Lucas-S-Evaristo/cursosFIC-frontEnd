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

    theme: "colored",

    // faz com que seja possivel arrastar

    draggable: true,

    progress: undefined,
  });
};
const msgRedefinir = () => {
    toast.warning("Verifique o E-mail ", {
      position: "top-center",
  
      autoClose: 12000,
  
      hideProgressBar: false,
  
      closeOnClick: true,
  
      pauseOnHover: true,
  
      theme: "colored",
  
      // faz com que seja possivel arrastar
  
      draggable: true,
  
      progress: undefined,
    });
  };

 export const AlterarSenha = async (event) => {
  /* tiras as características de evento evitando Recarregar  a pagina */
  event.preventDefault();
  /* pegar todos  os valores do evento */
  const formData = new FormData(event.target);
  /*formata em um objeto em  json */
  const data = Object.fromEntries(formData);
  console.log(data);
  let result = await fetch(`http://localhost:8080/api/usuario/redefinirSenha`, {
    method: "post",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
  });
  if(result.status === 406){
    msgErroRedefinir();


  }else if(result){
    msgRedefinir();

  }
};

function RedefinirSenha() {
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
          <form className="formRDFS" onSubmit={AlterarSenha}>
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
                className="inEmail inputLogin"
                type={"email"}
              />

              <div className="divBtn">
                <button className="btnRedefinir" type="submit">
                  <p className="pRedefinir">Redefinir</p>
                </button>
              </div>
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

export default RedefinirSenha;
