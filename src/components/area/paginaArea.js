
import {useEffect, useState} from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import  './listaArea.css'

import  {ToastContainer,toast}  from  'react-toastify' ; 
import  'react-toastify/dist/ReactToastify.css' ;



function Area(selecionarArea, cadastrar, post, excluir, sucesso, sucessoAlterar) {

  sucesso = () => {
    toast.success("Cadastrado com Sucesso!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: 'colored',
      draggable: true,
      progress: undefined,})
   }

   sucessoAlterar = () => {
    toast.success("Alterado com Sucesso!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: 'colored',
      draggable: true,
      progress: undefined,})
   }

    const area = {
        id: 0,
        nome: "",
       
      }

      
      cadastrar = () => {
        fetch("http://localhost:8080/api/area", {
          method: 'post',
          body: JSON.stringify(objArea),
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

      excluir = (id) => {
        fetch("http://localhost:8080/api/area/"+id, {
          method: 'delete',
          headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
          }
    
        })
        .then(retorno => retorno.json())
        .then(retorno_convertido => {
         
            let vetorTemporario = [...areas] //vetorTemporario vai ter acesso a todos as areas

            console.log(vetorTemporario)

         

            //vetorIndex retorna a posição dos objetos
            let indice = vetorTemporario.findIndex((p) =>{

                
                return p.id === objArea.id
            }) 

            //remover area do vetorTemporario
             vetorTemporario.splice(indice, 1)

            //atualizar o vetor de areas

            setArea(vetorTemporario)

            window.location.reload();

        })
      }

      post = (e) => {
  
        console.log(e.target)
        setObjArea({ ...objArea, [e.target.name]: e.target.value })
      }

    useEffect(() => {
        fetch("http://localhost:8080/api/area")
        .then(retorno => retorno.json())
        .then(retorno_convertido => setArea(retorno_convertido))//retorno convertido tem a lista de todos os cursos
    }, [])

    selecionarArea = (indice) => {

        setObjArea(areas[indice])
        setBtnCadastro(false)
        
      }

    const [areas, setArea] = useState([])

    const [show, setShow] = useState(false);

    const [show2, setShow2] = useState(false);

    const [objArea, setObjArea] = useState(area)
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleShow2 = () => setShow2(true);
    const handleClose2 = () => setShow2(false);
 
   const [btnCadastro, setBtnCadastro] = useState(true)

    return (

        <div className="botaoCadastrar">
        <h1 className="titulo">Lista de Area</h1>

        <div>
        <Button variant="primary" className="botaoCadastrar" onClick={() => {
            handleShow2()

            }}>
         cadastrar Area
        </Button>
        </div>

        <Modal
                        show={show2}
                        onHide={handleClose2}
                                    >
                        <Modal.Header closeButton>  
                        <Modal.Title>Cadastrar</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <form>
                          <input className="inputNome" type="text" name="nome"onChange={post}/>

                          </form>
                        
                        </Modal.Body>
                        <Modal.Footer>
                        <Button type="submit" variant="danger" onClick={() => {
                          handleClose2()
                          window.location.reload()
                          }}>
                            Fechar
                        </Button>

                        <Button type='button' variant="warning" onClick={() => {
                          
                            cadastrar()
                            sucesso()
                            setInterval(function () {window.location.reload();}, 6000);
                           
                            

                        }}>
                            Cadastrar
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

        <table className="table">

<thead className="table-dark">
     <tr>
              <th>id:</th>
              <th>Nome:</th>
              <th>Excluir:</th>
              <th>Alterar:</th>
             
     </tr>
     </thead>

        <tbody>
            {
            
                areas.map((obj, indice) => (
                    <tr key={indice}>
                        <td  >{obj.id}</td>
                       
                        <td>{obj.nome}</td>
                    
                        <td><button className="btn btn-danger" onClick={() => excluir(obj.id)}>Excluir</button></td>
                        <td> <Button variant="warning" onClick={() => {
                            selecionarArea(indice)
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
                          <input className="inputNome" type="text" name="nome" defaultValue={objArea.nome} onChange={post}/>

                          </form>
                        
                        </Modal.Body>
                        <Modal.Footer>
                        <Button type="submit" variant="danger" onClick={() => {
                          handleClose()
                          window.location.reload()
                          }}>
                            Fechar
                        </Button>

                        <Button type='button' variant="warning" onClick={() => {
                          
                            cadastrar()
                            sucessoAlterar()
                            setInterval(function () {window.location.reload();}, 6000);
                           
                            

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

export default Area