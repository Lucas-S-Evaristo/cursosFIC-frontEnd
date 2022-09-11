
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
        nivel: "",
        area: {
          id: ""
        },
        tipoAtendimento: "",
        cargaHoraria: 0,
        valor: 0
      }

      //captura dados digitados no formulario
    post = (e) => {
  
        console.log(e.target.value)
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
          if(retorno.status === 409){
            erroCad()
            
          }else if(retorno.status === 400){
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

      //get na api de area
      useEffect(() => {
        fetch("http://localhost:8080/api/area")
        .then(retorno => retorno.json())
        .then(retorno_convertido => setArea(retorno_convertido))//retorno convertido tem a lista de todos as areas
    }, []) 

    //get na api de enum de tipo de atendimento
      useEffect(() => {
      fetch("http://localhost:8080/api/enum/tipoAtendimento")
      .then(retorno => retorno.json())
      .then(retorno_convertido => setTipoAtendimento(retorno_convertido))//retorno convertido tem a lista de todos as enum de tipoAtendimento
  }, [])
  
  //get na api de enum de nivel do curso
  useEffect(() => {
    fetch("http://localhost:8080/api/enum/nivel")
    .then(retorno => retorno.json())
    .then(retorno_convertido => setNivel(retorno_convertido))//retorno convertido tem a lista de todos as enum de nivel
}, []) 

      const [objCurso, setObjCurso] = useState(curso)

      const [area, setArea] = useState([])

      const [nivel, setNivel] = useState([])

      const [tipoAtendimento, setTipoAtendimento] = useState([])


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
                <select className="form-select form-select-sm" aria-label=".form-select-sm example"  name="area" onChange={post}>
                              
              {
                  area.map((obj) => (
                      <option key={obj.id}>
                      {obj.nome}
                      </option>
                  ))}

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
                <select onChange={post} name="nivel" className="form-select form-select-sm" aria-label=".form-select-sm example">
                   {
                    nivel.map((obj, indice) => (
                      
                    <option key={indice} value={obj}>
                      {obj}
                    </option>
                  ))}
                </select> 

                <label>selecione o tipo de atendimento</label>
                <select name="tipoAtendimento" onChange={post} className="form-select form-select-sm" aria-label=".form-select-sm example" >
                    {
                    tipoAtendimento.map((obj, indice) => (
                      
                    <option key={indice} value={obj}>
                      
                      {obj}
                      
                    </option>
                  ))}
                </select>
                <input
                    required
                    name="cargaHoraria" className="carga_horaria"
                    type="number" placeholder="Carga horaria"
                    onChange={post}
                />
                <input
                    required
                    name="valor" className="valor_cursos"
                    type="number" placeholder="valor"
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