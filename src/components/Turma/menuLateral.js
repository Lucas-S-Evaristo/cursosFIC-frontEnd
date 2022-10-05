import React, { useEffect } from "react";
import  './menulateral.css'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Person3OutlinedIcon from '@mui/icons-material/Person3Outlined';
import CardMembershipOutlinedIcon from '@mui/icons-material/CardMembershipOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import SchoolIcon from '@mui/icons-material/School';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import Nav from "react-bootstrap/Nav";
import GroupIcon from '@mui/icons-material/Group';

function MenuLateral(){

    return(
        <>
        <div className="painelComponent">
            
        <img className="imagemLogo" src={require("./senai.png")}></img>
        <p className="linha"></p>

        <div className="navegacao">
            
                <nav class="nav">
                    <a><HomeOutlinedIcon/> Home</a>
                    <a><Person3OutlinedIcon/> Usuários</a>
                    <a><BadgeOutlinedIcon/> Instrutores</a>
                    <a href="/" target="blank"><CardMembershipOutlinedIcon/> Cursos</a>
                    <a><GroupIcon/> Turmas</a>
                    <a><QueryBuilderIcon/> Horário</a>
                    <a><SchoolIcon/> Área</a>


                </nav>
            </div>
            
            </div>

            
            </>



       
      
    )
}

export default MenuLateral