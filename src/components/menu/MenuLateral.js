import React, { useEffect } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Person3OutlinedIcon from "@mui/icons-material/Person3Outlined";
import "./usuario.css";
import Nav from "react-bootstrap/Nav";
import CardMembershipOutlinedIcon from "@mui/icons-material/CardMembershipOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import SchoolIcon from "@mui/icons-material/School";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import GroupIcon from "@mui/icons-material/Group";
import "bootstrap/dist/css/bootstrap.min.css";

function MenuLateral() {
  return (
    <>
      <div className="painelComponent">
        <img className="imagemLogo" src={require("./logoSenai.png")}></img>

        <div className="navegacao">
          <Nav variant="tabs" defaultActiveKey="/instrutores">
            <Nav.Item className="navItem">
              <Nav.Link className="navLink" href="/home">
                <HomeOutlinedIcon sx={{ marginRight: "30px" }} />
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="navItem">
              <Nav.Link className="navLink" href="/Usuario">
                <Person3OutlinedIcon sx={{ marginRight: "30px" }} />
                Usuários
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="navItem">
              <Nav.Link
                className="navLink"
                style={{ backgroundColor: "#0496ff", color: "#fff" }}
                href="/instrutores"
              >
                <BadgeOutlinedIcon sx={{ marginRight: "30px" }} />
                Instrutores
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="navItem">
              <Nav.Link className="navLink" href="/cursos">
                <CardMembershipOutlinedIcon sx={{ marginRight: "30px" }} />
                Cursos
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="navItem">
              <Nav.Link className="navLink" href="/turmas">
                <GroupIcon sx={{ marginRight: "30px" }} /> Turmas
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="navItem">
              <Nav.Link className="navLink" href="/horarios">
                <QueryBuilderIcon sx={{ marginRight: "30px" }} />
                Horário
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
      </div>
    </>
  );
}

export default MenuLateral;
