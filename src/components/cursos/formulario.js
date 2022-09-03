import { red } from "@mui/material/colors"
import React, { Component, useEffect, useState } from 'react';

import  './styles.css'


function Formulario({ post, cadastrar }) {

    const curso = {
        id: 0,
        nome: "",
        objetivo: "",
        preRequisito: "",
        conteudoProgramatico: "",
        sigla: "",
        cargaHoraria: 0,
        valor: 0
      }

    post = (e) => {
  
        console.log(e.target)
        setObjCurso({ ...objCurso, [e.target.name]: e.target.value })
      }

      cadastrar = () => {
        fetch("http://localhost:8080/api/curso", {
          method: 'post',
          body: JSON.stringify(objCurso),
          headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
          }
    
        })
        .then(retorno => retorno.json())
        .then(retorno_convertido => {
          console.log(retorno_convertido)
        })
      }

      const [objCurso, setObjCurso] = useState(curso)


    return (
        <div class="body">

            <form class="formulario">

                
                <h1>cadastrar cursos</h1>

                <input
                    required
                    name="nome" className="Nome"
                    type="text" placeholder="Nome do curso"
                    onChange={post}
                />
                
                <label>selecione a area do atendimento</label>
                <select class="form-select form-select-sm   " aria-label=".form-select-sm example"  name="area" onChange={post}>
                    <option placeholder>
                        
 
                    </option>
                </select>
                <input
                    required
                    name="objetivo" className="obj_curso"
                    type="text" placeholder="objetivo do curso"
                    onChange={post}

                />
                <input
                    required
                    name="preRequisito" className="req_pré"
                    type="text" placeholder="Pré requisito"
                    onChange={post}
                />
                <input
                    required
                    name="conteudoProgramatico" className="cont_prog"
                    type="text" placeholder="Conteúdo programático"
                    onChange={post}
                />
                <input
                    required
                    name="sigla" className="sigla"
                    type="text" placeholder="Sigla do curso"
                    onChange={post}
                />

                <label>selecione o nivel do curso</label>
                <select class="form-select form-select-sm" aria-label=".form-select-sm example">
                    <option onChange={post} ></option>
                </select>

                <label>selecione o tipo de atendimento</label>
                <select class="form-select form-select-sm" aria-label=".form-select-sm example" >
                    <option>
                      
                    </option>
                </select>
                <input
                    required
                    name="cargaHoraria" className="carga_horaria"
                    type="text" placeholder="Carga horaria"
                    onChange={post}
                />
                <input
                    required
                    name="valor" className="valor_cursos"
                    type="text" placeholder="valor"
                    onChange={post}
                />
                <button class="botao" onClick={cadastrar}>cadastrar</button>

            </form>
        </div>
    )
}
export default Formulario