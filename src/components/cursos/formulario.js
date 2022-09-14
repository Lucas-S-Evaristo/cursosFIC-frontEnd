
import React, { useEffect, useState } from 'react';

import  './styles.css'

import  {ToastContainer,toast}  from  'react-toastify' ; 
import  'react-toastify/dist/ReactToastify.css' ;

//função pra cadastrar cursos


function Formulario({ post, cadastrar, sucesso, erroCad, curso, erroServ  }) {

  const [idArea, setIdArea] = useState()

  const [nome, setNome] = useState()

  const [objetivo, setObjetivo] = useState()

  const [preRequisito, setPreRequisito] = useState()

  const [conteudoProgramatico, setConteudoProgramatico] = useState()

  const [sigla, setSigla] = useState()

  const [cargaHoraria, setCargaHoraria] = useState()

  const [valor, setValor] = useState()

  const [valueNivel, setValueNivel] = useState()

  const [valueTipoAtend, setValueTip] = useState()

  

  curso  = {
    id: 0,
    nome: nome,
    objetivo: objetivo,
    preRequisito: preRequisito,
    conteudoProgramatico: conteudoProgramatico,
    sigla: sigla,
    area: {
      id: idArea
    },
    nivel: valueNivel,
    tipoAtendimento: valueTipoAtend,
    cargaHoraria: cargaHoraria,
    valor: valor
  }

  const [objCurso, setObjCurso] = useState(curso)

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

       erroServ = () => {
        toast.error("Erro, tente novamente!", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          theme: 'colored',
          draggable: true,
          progress: undefined,})
       }

      //captura dados digitados no formulario
    post = (e) => {
  
        console.log("digitado input: ", e.target.value)
        setObjCurso({ ...objCurso, [e.target.name]: e.target.value })

      }

      
      //faz uma requisição ao back-end de cadastro
      cadastrar = () => {
        fetch("http://localhost:8080/api/curso", {
          method: 'post',
          body: JSON.stringify(curso),
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
            erroServ()
            
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


        const [nivel, setNivel] = useState([])

        const [tipoAtendimento, setTipoAtendimento] = useState([])

      console.warn("ID AREA: ", idArea)
      console.warn("nome: ", nome)
      console.warn("objetivo: ", objetivo)
      console.warn("pre Req: ", preRequisito)
      console.warn("Conteudo prog: ", conteudoProgramatico)
      console.warn("Sigla: ", sigla)
      console.warn("Nivel: ", valueNivel)
      console.warn("Tipo Atendimento: ", valueTipoAtend)


     
      const [area, setArea] = useState([])

       
      

      

    return (
        <div className="body">

            {/*Formulario de cursos */}
            <form className="formulario">
                <h1>cadastrar cursos</h1>

                <input
                    required
                    value={nome}
                    name="nome" className="Nome"
                    type="text" placeholder="Nome do curso"
                    onChange={(e) => {

                      setNome(e.target.value)
    
                     
    
                      }}
                />
                
                <label>selecione a area do Curso</label>
                <select value={idArea} className="form-select form-select-sm" aria-label=".form-select-sm example"  name="area" onChange={(e) => {

                  setIdArea(e.target.value)

                  post(e)

                  }

                  }>
                              
              {
                  area.map((obj) => (
                    
                      <option id="idArea" name="area" key={obj.id} value={obj.id}>
                      {obj.nome}
                      </option>
                  ))}

                </select>

                <input
                    required
                    name="objetivo" className="obj_curso"
                    type="text" placeholder="objetivo do curso"
                    value={objetivo}
                    onChange={(e) => {

                      setObjetivo(e.target.value)
    
                      post(e)
    
                      }}

                />
                <input
                    required
                    name="preRequisito" className="req_pré"
                    type="text" placeholder="Pré requisito"
                    value={preRequisito}
                    onChange={(e) => {

                      setPreRequisito(e.target.value)
    
                      post(e)
    
                      }}
                />
                <input
                    required
                    name="conteudoProgramatico" className="cont_prog"
                    type="text" placeholder="Conteúdo programático"
                    value={conteudoProgramatico}
                    onChange={(e) => {

                      setConteudoProgramatico(e.target.value)
    
                      post(e)
    
                      }}
                />
                <input
                    required
                    name="sigla" className="sigla"
                    type="text" placeholder="Sigla do curso"
                    value={sigla}
                    onChange={(e) => {

                      setSigla(e.target.value)
    
                      post(e)
    
                      }}
                />

                <label>selecione o nivel do curso</label>
                <select value={valueNivel} onChange={(e) => {setValueNivel(e.target.value)}} name="nivel" className="form-select form-select-sm" aria-label=".form-select-sm example">
                   {
                    nivel.map((obj, indice) => (
                      
                    <option key={indice} defaultValue={obj}>
                      {obj}
                    </option>
                  ))}
                </select> 

                <label>selecione o tipo de atendimento</label>
                <select value={valueTipoAtend} name="tipoAtendimento" onChange={(e) => {setValueTip(e.target.value)}} className="form-select form-select-sm" aria-label=".form-select-sm example" >
                    {
                    tipoAtendimento.map((obj, indice) => (
                      
                    <option key={indice} defaultValue={obj}>
                      
                      {obj}
                      
                    </option>
                  ))}
                </select>
                <input
                    required
                    name="cargaHoraria" className="carga_horaria"
                    type="number" placeholder="Carga horaria"
                    value={cargaHoraria}
                    onChange={(e) => {

                      setCargaHoraria(e.target.value)
    
                      post(e)
    
                      }}
                />
                <input
                    required
                    name="valor" className="valor_cursos"
                    type="number" placeholder="valor"
                    value={valor}
                    onChange={(e) => {

                      setValor(e.target.value)
    
                      post(e)
    
                      }}
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