import { useEffect, useState } from 'react'
import  './lista.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import  {ToastContainer,toast}  from  'react-toastify' ; 
import  'react-toastify/dist/ReactToastify.css' ;





function ListaCursos({excluir, alterar, selecionarCurso, post, cadastrar, sucesso, erro}){

  sucesso = () => {
    toast.success("Alterado com sucesso!", {position: "top-center",
                                            autoClose: 5000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            theme: 'colored',
                                            draggable: true,
                                            progress: undefined,})
   }

   erro = () => {
    toast.error("Excluido com sucesso!", {position: "top-center",
                                            autoClose: 5000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            theme: 'colored',
                                            draggable: true,
                                            progress: undefined,})
   }

    const cursoExcluir = {
        id: "",
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

    //useEffect faz a requisição com o back end pra receber os cursos e enviar ao use State
    useEffect(() => {
        fetch("http://localhost:8080/api/curso")
        .then(retorno => retorno.json())
        .then(retorno_convertido => setCursos(retorno_convertido))//retorno convertido tem a lista de todos os cursos
    }, [])

    excluir = (id) => {
        fetch("http://localhost:8080/api/curso/"+id, {
          method: 'delete',
          headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
          }
    
        })
        .then(retorno => retorno.json())
        .then(retorno_convertido => {
         

            alert("excluido com sucesso")

            let vetorTemporario = [...cursos] //vetorTemporario vai ter acesso a todos os cursos

            console.log(vetorTemporario)

            console.log(cursos)

            //vetorIndex retorna a posição dos objetos
            let indice = vetorTemporario.findIndex((p) =>{

                
                return p.id === objCurso.id
            }) 

            //remover curso do vetorTemporario
             vetorTemporario.splice(indice, 1)

            //atualizar o vetor de cursos

            setCursos(vetorTemporario)
            window.location.reload();

        })
      }

      alterar = (id) => {
        fetch("http://localhost:8080/api/curso/"+id, {
          method: 'put',
          body:JSON.stringify(objCurso),
          headers:{
            'Content-type':'application/json',
            'Accept':'application/json'
          }
    
        })
        .then(retorno => retorno.json())
        .then(retorno_convertido => {
          console.log(retorno_convertido)

          let vetorTemporario = [...cursos] //vetorTemporario vai ter acesso a todos os cursos

          console.log(vetorTemporario)

          console.log(cursos)

          //vetorIndex retorna a posição dos objetos
          let indice = vetorTemporario.findIndex((p) =>{

              
              return p.id === objCurso.id
          }) 

          //alterar curso do vetorTemporario
           vetorTemporario[indice] = objCurso

          //atualizar o vetor de cursos

          setCursos(vetorTemporario)

        })
      }

      selecionarCurso = (indice) => {

        setObjCurso(cursos[indice])
        
      }


    const [cursos, setCursos] = useState([])

    const [objCurso, setObjCurso] = useState(cursoExcluir)

    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

              useEffect(() => {
                getCursos();
            }, []);
            const getCursos = async ( ) => {
                let result = await fetch(`http://localhost:8080/api/curso`)
                result = await result.json();
                setCursos(result)
            }

          const buscarCs = async (event) =>{
                let key = event.target.value;
                if (key) {
                    let result = 
                    await fetch(`http://localhost:8080/api/curso/buscar/${key}`)
                    result = await result.json();
                    if (result) {
                        setCursos(result)
                    }

                    else{
                        getCursos();
                    }
                }
                
            }

    return(
        
        <div className="lista">
        
        
        <h1 className="titulo">Lista de cursos</h1>

        <form>
            <label>Buscar cursos</label>
            <input
                onChange={buscarCs} 
                type="" 
                className="inBuscar"
                name="parametro"
                required="required"
                />
        </form>

        <table className="table">
 
    <thead className="table-dark">
     <tr  >
              <th>id:</th>
              <th>Nome:</th>
        
              <th>Carga Horaria:</th>
              <th>Conteúdo programático:</th>
            
              <th>Nivel:</th>
              <th>Objetivo:</th>
              <th>Pre Requisito:</th>
              <th>Sigla:</th>
              <th>Tipo de atendimento:</th>
              <th>Área:</th>
              <th>Excluir:</th>
              <th>Alterar:</th>
             
     </tr>
     </thead>

        <tbody>
            {
            
                cursos.map((obj, indice) => (
                    <tr key={indice}>
                        <td  >{obj.id}</td>
                       
                        <td>{obj.nome}</td>
                    
                        <td>{obj.cargaHoraria}</td>
                        <td>{obj.conteudoProgramatico}</td>
                        
                        <td>{obj.nivel}</td>
                        <td>{obj.objetivo}</td>
                        <td>{obj.preRequisito}</td>
                        <td>{obj.sigla}</td>
                        <td>{obj.tipoAtendimento}</td>
                        <td>{obj.area}</td>
                        <td><button className="btn btn-danger" onClick={() => excluir(obj.id)}>Excluir</button></td>
                        <td> <Button variant="warning" onClick={() => {
                            selecionarCurso(indice)
                            handleShow()

                        }}>
                                Alterar
                            </Button>
                        </td>

                        <Modal
                        show={show}
                        onHide={handleClose}
                                    >
                        <Modal.Header closeButton>  
                        <Modal.Title>Alterar</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <form>
                          <input type="text" className="inputNome" name="nome" defaultValue={objCurso.nome} onChange={post}/>

                          <input type="text" className="inputNome" name="objetivo" defaultValue={objCurso.objetivo} onChange={post}/>

                          <input type="text" className="inputNome" name="preRequisito" defaultValue={objCurso.preRequisito} onChange={post}/>

                          <input type="text" className="inputNome" name="conteudoProgramatico" defaultValue={objCurso.conteudoProgramatico} onChange={post}/>

                          <input type="text" className="inputNome" name="sigla" defaultValue={objCurso.sigla} onChange={post}/>

                          <input type="text" className="inputNome" name="cargaHoraria" defaultValue={objCurso.cargaHoraria} onChange={post}/>

                          <input type="text" className="inputNome" name="valor" defaultValue={objCurso.valor} onChange={post}/>

                          </form>
                        
                        </Modal.Body>
                        <Modal.Footer>
                        <Button type='submit' variant="danger" onClick={() => {
                          handleClose()
                          window.location.reload();
                          }}>
                            Fechar
                        </Button>

                        <Button type='submit' variant="warning" onClick={() => {
                          sucesso()
                          cadastrar()
                          }}>
                            Alterar
                        </Button>
                        <ToastContainer position="top-center"
                          autoClose={5000}
                          hideProgressBar={false}
                          newestOnTop={false}
                          closeOnClick
                          rtl={false}
                          pauseOnFocusLoss
                          draggable
                          pauseOnHover/>
                            
                        </Modal.Footer>
                    </Modal>

                    </tr>

                    
                ))
        }

        </tbody>

        </table>

        
        
        </div>
    )
}
export default ListaCursos