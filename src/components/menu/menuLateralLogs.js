import React, { useEffect } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Person3OutlinedIcon from "@mui/icons-material/Person3Outlined";
import "./menu.css";
import Nav from "react-bootstrap/Nav";
import CardMembershipOutlinedIcon from "@mui/icons-material/CardMembershipOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import SchoolIcon from "@mui/icons-material/School";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import GroupIcon from "@mui/icons-material/Group";
import "bootstrap/dist/css/bootstrap.min.css";
import ImportContactsTwoToneIcon from '@mui/icons-material/ImportContactsTwoTone';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import LockIcon from '@mui/icons-material/Lock';
import CadTurma, { esconder } from "../Turma/PageTurma";
import PostAddIcon from '@mui/icons-material/PostAdd';


export function deslogar() {

  sessionStorage.removeItem("token")

  sessionStorage.removeItem("payload")

  window.location.href = 'http://localhost:3000/login'

}

let p = sessionStorage.getItem("payload")

p = JSON.parse(p)

let token = sessionStorage.getItem("token")

function MenuLateralLogs() {


  return (
    <>

      <div className="painelComponent2">
        <img className="imagemLogo" src={require("./logoSenai.png")}></img>

        <div className="navegacao">
          <Nav variant="tabs" >
            <Nav.Item className="navItem">
              <Nav.Link className="navLink" href="/home">
                <HomeOutlinedIcon sx={{ marginRight: "30px" }} />
                Home
              </Nav.Link>
            </Nav.Item>

            <Nav.Item className="navItem" style={ p === null ||token === null || p.tipo_usuario === "Secretária"
                     ? 
                     {display: "none"} 
                    :
                     {visibility: "visible"}
                     }>
              <Nav.Link className="navLink" href="/listaArea">
                <ImportContactsTwoToneIcon sx={{ marginRight: "30px" }} />
                Área
              </Nav.Link>
            </Nav.Item>

            <Nav.Item className="navItem" style={ p === null ||token === null 
                     ? 
                     {display: "none"} 
                    :
                     {visibility: "visible"}
                     }>
              <Nav.Link className="navLink" href="/listaCurso">
                <CardMembershipOutlinedIcon sx={{ marginRight: "30px" }} />
                Cursos
              </Nav.Link>
            </Nav.Item>

            <Nav.Item className="navItem" style={ p === null ||token === null || p.tipo_usuario === "Secretária"
                     ? 
                     {display: "none"} 
                    :
                     {visibility: "visible"}
                     }>
              <Nav.Link className="navLink" href="/listaHorario">
                <QueryBuilderIcon sx={{ marginRight: "30px" }} />
                Horário
              </Nav.Link>
            </Nav.Item>

            <Nav.Item className="navItem" style={ p === null ||token === null || p.tipo_usuario === "Secretária"
                     ? 
                     {display: "none"} 
                    :
                     {visibility: "visible"}
                     }>
              <Nav.Link className="navLink" href="/listaInstrutores">
                <BadgeOutlinedIcon sx={{ marginRight: "30px" }} />
                Instrutores
              </Nav.Link>
            </Nav.Item>

            <Nav.Item className="navItem" style={ p === null ||token === null || p.tipo_usuario === "Secretária" || p.tipo_usuario === "Opp"
                     ? 
                     {display: "none"} 
                    :
                     {visibility: "visible"}
                     }>
              <Nav.Link className="navLink" href="/logs">
                <LockIcon  sx={{ marginRight: "30px" }} />
                Logs
              </Nav.Link>
            </Nav.Item>

            <Nav.Item className="navItem" style={ p === null ||token === null || p.tipo_usuario === "Secretária"
                     ? 
                     {display: "none"} 
                    :
                     {visibility: "visible"}
                     }>
              <Nav.Link className="navLink" href="/listaParametros">
                <PostAddIcon  sx={{ marginRight: "30px" }} />
                Parâmetros
              </Nav.Link>
            </Nav.Item>

  
            <Nav.Item className="navItem">
              <Nav.Link className="navLink" href="/">
                <GroupIcon sx={{ marginRight: "30px" }} /> 
                Turmas
              </Nav.Link>
            </Nav.Item>
            

            <Nav.Item className="navItem" style={ p === null ||token === null || p.tipo_usuario === "Secretária" || p.tipo_usuario === "Opp"
                     ? 
                     {display: "none"} 
                    :
                     {visibility: "visible"}
                     }>
              <Nav.Link

                className="navLink"
                href="/listaUsuario"
              >
                <Person3OutlinedIcon sx={{ marginRight: "30px" }} />
                Usuários
              </Nav.Link>
            </Nav.Item>

            {
              token === null
                ?
                <Nav.Item className="navItem" style={token === null || p.tipo_usuario === "Secretária"
                ? 
                {position: "absolute", top: "7.5em"}
               :
                {marginTop: "2em"}
                }>
                <Nav.Link className="navLink " href="/login">
                  <ExitToAppOutlinedIcon sx={{ marginRight: "30px" }} />
                  Logar
                </Nav.Link>
              </Nav.Item>
                :

                <Nav.Item className="navItem" style={token === null 
                ? 
                {position: "absolute", top: "7.5em"}
               :
                {position: "relative", top: "4em"}
                }>
                <Nav.Link className="navLink" href="/login" onClick={deslogar}>
                  <ExitToAppOutlinedIcon sx={{ marginRight: "30px" }} />
                  Sair
                </Nav.Link>
              </Nav.Item>

            }


          </Nav>
        </div>
      </div>
    </>
  );
}

export default MenuLateralLogs;
