import React, { useEffect } from "react";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./linhaTempo.css";
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import DoneIcon from '@mui/icons-material/Done';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import RadioButtonUncheckedTwoToneIcon from '@mui/icons-material/RadioButtonUncheckedTwoTone';
import { IconButton, Tooltip, tooltipClasses } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';


let token = sessionStorage.getItem("token")

let p = sessionStorage.getItem("payload")

p = JSON.parse(p)

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


function LinhaTempo() {
  // variavel que tem acesso a um array com todas as turmas
  const [turmas, setTurma] = useState([]);
  const moment = require("moment");

  const getTurma = async () => {
    let id = localStorage.getItem("idLT")
    let result = await fetch(`http://localhost:8080/api/turma/${id}`);
    result = await result.json();
    setTurma(result);
  };

  const removeAction = async (id) => {
    let result = await fetch("http://localhost:8080/api/linhaDoTempo/" + id, {
        method: "DELETE"
    })

    if (result) {

      getTurma()

    }
}


  const addAction = async (id) => {
    // requisição ao back-end
    let resultado = await fetch("http://localhost:8080/api/linhaDoTempo/" + id, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        "Authorization": token
      },
    });

   

    // verifica se existe resultado
    if (resultado.status === 200) {
      getTurma()
    }
  };

  // REQUISIÇÃO GET PARA PUXAR TODAS AS TURMAS
  useEffect(() => {
    let id = localStorage.getItem("idLT")

    fetch(`http://localhost:8080/api/turma/${id}`)
      .then((resp) => resp.json())
      .then((retorno_convertido) => setTurma(retorno_convertido)); //lista de turmas
  }, []);

  let lista = useState()

  return (
    <>

   
      <div style={{ scrollbarColor: "red" }} className="conteudoLinha">
      <h1 style={{textAlign:"center",fontFamily:"fantasy",fontWeight:"bold"}}>LINHA DO TEMPO</h1>
        <div className="tabelaContainer">
          <div className="position">
   
            {turmas.map((obj) => (
              <div class="wrapper">
                {
                obj.status === true ? <div style={{backgroundColor: "rgb(0, 173, 0)"}} class="center-line"> {/* linha */}
                  <a class="scroll-icon">
                  {
                    obj.status === true ? <button className="botaoCheckok" onClick={() => removeAction(obj.id)}> <CheckCircleOutlineOutlinedIcon /></button> : <button className="botaoCheck" onClick={() => addAction(obj.id)}> <CheckCircleOutlineOutlinedIcon /></button>
                  }
                  </a>
                </div>
                :
                <div class="center-line"> {/* linha */}
                  <a class="scroll-icon">
                  {
                    obj.status === true ? <button className="botaoCheckok" onClick={() => removeAction(obj.id)}> <CheckCircleOutlineOutlinedIcon /></button> : <button className="botaoCheck" onClick={() => addAction(obj.id)}> <CheckCircleOutlineOutlinedIcon /></button>
                  }
                  </a>
                </div>
                }
                <div class="row row-1">
                  <section>
                    <div class="details">
                      <span class="title2">{obj.acoesdaLinhaDoTempo}</span>
                    </div>
                    <p>
                      {moment(obj.dataPrevista).format('DD/MM/YYYY')}
                    </p>

                    {
                      obj.status === true ?  <>
                    
                    <div className="divLinhaDoTempo">
                    <BootstrapTooltip title={"Nif: " + obj.nifUsuario} style={ p === null ||token === null || p.tipo_usuario === "Secretária" || p.tipo_usuario === "Opp"
                     ? 
                     {display: "none"} 
                    :
                     {visibility: "visible"}
                     }>
                      <IconButton>
                        <AccountCircleIcon style={{color: "black"}} />
                      </IconButton>
                    </BootstrapTooltip>
                    
                    <BootstrapTooltip title={"Hora: " + obj.hora} style={ p === null ||token === null || p.tipo_usuario === "Secretária" || p.tipo_usuario === "Opp"
                     ? 
                     {display: "none"} 
                    :
                     {visibility: "visible"}
                     }>
                      <IconButton>
                        <AccessTimeFilledIcon style={{color: "black"}} />
                      </IconButton>
                    </BootstrapTooltip>

                    <BootstrapTooltip title={ "Data: "  + obj.data} style={ p === null ||token === null || p.tipo_usuario === "Secretária" || p.tipo_usuario === "Opp"
                     ? 
                     {display: "none"} 
                    :
                     {visibility: "visible"}
                     }>
                      <IconButton>
                        <CalendarMonthIcon style={{color: "black"}}/>
                      </IconButton>
                    </BootstrapTooltip>
                    </div>
                    
                    <Chip sx={{position: "absolute", top: "11em", left: "4.5em"}}  label="Concluido" color="success"/> </>: <Chip sx={{position: "absolute", top: "11em", left: "4.5em"}} label="Não concluido" color="error"/>
                    }
                  </section>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default LinhaTempo;
