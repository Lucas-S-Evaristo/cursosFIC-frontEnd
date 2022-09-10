
import React, { useEffect, useState } from 'react';

import  './styles.css'

import  {ToastContainer,toast}  from  'react-toastify' ; 
import  'react-toastify/dist/ReactToastify.css' ;


//função pra cadastrar cursos
function Formulario({ post, cadastrar, sucesso, erroCad }) {

    //enviar notificação de sucesso
    sucesso = () => {
        toast.success("Cadastrado com sucesso!", {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: 'colored',
            draggable: true,
            progress: undefined,})
       }

       erroCad = () => {
        toast.error("Preencha os campos corretamente!", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          theme: 'colored',
          draggable: true,
          progress: undefined,})
       }
    

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

      //captura dados digitados no formulario
    post = (e) => {
  
        console.log(e.target)
        setObjCurso({ ...objCurso, [e.target.name]: e.target.value })
      }
      //faz uma requisição ao back-end de cadastro
      cadastrar = () => {
        fetch("http://localhost:8080/api/curso", {
          method: 'post',
          body: JSON.stringify(objCurso),
          headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
          }
    
        })

        
        .then(retorno => {
          //se o input estiver vazio, passar uma resposta de erro e enviar mensagem de erro
          if(retorno.status == 409){
            erroCad()
          }else {
            //faz o processo de cadastro
            retorno.json()
        .then(retorno_convertido => {

          
           //exibir notificação de sucesso
           sucesso()
           //atualiza a página depois de um tempo
          setInterval(function () {window.location.reload();}, 1500);
          console.log(retorno_convertido)
        }
        )
          }
        })
      }

      useEffect(() => {
        fetch("http://localhost:8080/api/area")
        .then(retorno => retorno.json())
        .then(retorno_convertido => setArea(retorno_convertido))//retorno convertido tem a lista de todos as areas
    }, [])

    

    

      const [objCurso, setObjCurso] = useState(curso)

      const [area, setArea] = useState([])


    return (
        <div className="body">

            {/*Formulario de cursos */}
            <form className="formulario">

                
                <h1>cadastrar cursos</h1>

                <input
                    required
                    name="nome" className="Nome"
                    type="text" placeholder="Nome do curso"
                    onChange={post}
                />
                
                <label>selecione a area do Curso</label>
                <select className="form-select form-select-sm   " aria-label=".form-select-sm example"  name="area" onChange={post}>
                   
                        
                        {
                            area.map((obj, indice) => (
                                <option key={indice}>
                                {obj.nome}
                                </option>
                            )
                            )
                        }
 
                   
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
                <select className="form-select form-select-sm" aria-label=".form-select-sm example">
                    <option onChange={post} ></option>
                </select>

                <label>selecione o tipo de atendimento</label>
                <select className="form-select form-select-sm" aria-label=".form-select-sm example" >
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
                <button type='button' className="botao" onClick={() => {
                      //efetua o cadastro 
                    cadastrar()
                    
                    setInterval(function () {window.location.reload();}, 1500);
                    }}>cadastrar</button>
            <ToastContainer/>
            </form>
        </div>
    )
}
export default Formulario