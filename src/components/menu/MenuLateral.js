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
import CadTurma, { esconder } from "../Turma/PageTurma";


export function deslogar() {

  localStorage.removeItem("token")

  localStorage.removeItem("payload")

  window.location.href = 'http://localhost:3000/login'

}

let p = localStorage.getItem("payload")

p = JSON.parse(p)

let token = localStorage.getItem("token")

function MenuLateral() {

  return (
    <>

      <div className="painelComponent">
        <img className="imagemLogo" src={require("./logoSenai.png")}></img>

        <div className="navegacao">
          <Nav variant="tabs" >
            <Nav.Item className="navItem">
              <Nav.Link className="navLink" href="/home">
                <HomeOutlinedIcon sx={{ marginRight: "30px" }} />
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="navItem">
              <Nav.Link

                className="navLink"
                href="/listaUsuario"
              >
                <Person3OutlinedIcon sx={{ marginRight: "30px" }} />
                Usuários
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="navItem">
              <Nav.Link className="navLink" href="/listaInstrutores">
                <BadgeOutlinedIcon sx={{ marginRight: "30px" }} />
                Instrutores
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="navItem">
              <Nav.Link className="navLink" href="/listaCurso">
                <CardMembershipOutlinedIcon sx={{ marginRight: "30px" }} />
                Cursos
              </Nav.Link>
            </Nav.Item>

            <Nav.Item className="navItem">
              <Nav.Link className="navLink" href="/folders">
                <ImportContactsTwoToneIcon sx={{ marginRight: "30px" }} />
                Folders
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="navItem">
              <Nav.Link className="navLink" href="/">
                <GroupIcon sx={{ marginRight: "30px" }} /> Turmas
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="navItem">
              <Nav.Link className="navLink" href="/listaHorario">
                <QueryBuilderIcon sx={{ marginRight: "30px" }} />
                Horário
              </Nav.Link>
            </Nav.Item>

            <Nav.Item className="navItem">
              <Nav.Link className="navLink" href="/listaArea">
                <ImportContactsTwoToneIcon sx={{ marginRight: "30px" }} />
                Área
              </Nav.Link>
            </Nav.Item>

            {
              token === null
                ?
                <button className="sair" onClick={deslogar}
                ><ExitToAppOutlinedIcon sx={{ marginRight: "30px" }} /> <p

                  className="sairP">Logar</p></button>

                :

                <button className="sair" onClick={deslogar}
                ><ExitToAppOutlinedIcon sx={{ marginRight: "30px" }} /> <p

                  className="sairP">Sair</p></button>

            }


          </Nav>
        </div>
      </div>
    </>
  );
}

export default MenuLateral;
