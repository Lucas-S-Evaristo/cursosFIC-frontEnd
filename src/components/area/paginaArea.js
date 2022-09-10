
import {useEffect, useState} from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import  './listaArea.css'

import  {ToastContainer,toast}  from  'react-toastify' ; 
import  'react-toastify/dist/ReactToastify.css' ;


//função pra listar todos as areas cadastradas
function Area(selecionarArea, cadastrar, post, excluir, sucesso, sucessoAlterar) {

  //enviar notificação de sucesso
  sucesso = () => {
    toast.success("Cadastrado com Sucesso!", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: 'colored',
      draggable: true,
      progress: undefined,})
   }
//enivar notiificação de sucesso ao Alterar
   sucessoAlterar = () => {
    toast.success("Alterado com Sucesso!", {
      position: "top-center",
      autoClose: 1500,
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

      //faz uma requisição ao back-end de cadastro
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
      //faz uma requisição ao back-end de excluir
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
      //captura dados digitados no formulario
      post = (e) => {
  
        console.log(e.target)
        setObjArea({ ...objArea, [e.target.name]: e.target.value })
      }
    //useEffect faz a requisição com o back end pra receber as areas e enviar ao use State
    useEffect(() => {
        fetch("http://localhost:8080/api/area")
        .then(retorno => retorno.json())
        .then(retorno_convertido => setArea(retorno_convertido))//retorno convertido tem a lista de todos as areas
    }, [])

     //pega os valores da area e passa para o input
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
        //cadastro de area
        <div className="botaoCadastrar">
        <h1 className="titulo">Lista de Area</h1>

        <div>
        <Button variant="primary" className="botaoCadastrar" onClick={() => {
          //abre a segunda modal
            handleShow2()

            }}>
         cadastrar Area
        </Button>
        </div>

         {/*modal de cadastro */}     
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
                          //fecha a segunda modal
                          handleClose2()
                          //recarrega a página
                          window.location.reload()
                          }}>
                            Fechar
                        </Button>

                        <Button type='button' variant="warning" onClick={() => {
                          
                            //realiza o cadastro
                            cadastrar()
                            //exibir notificação de sucesso
                            sucesso()
                             //atualiza a página depois de um tempo
                            setInterval(function () {window.location.reload();}, 1500);
                           
                            

                        }}>
                            Cadastrar
                        </Button>
                         {/*trás a notificação de sucesso*/}
                        <ToastContainer position="top-center"
                          autoClose={1500}
                          hideProgressBar={false}
                          newestOnTop={false}
                          closeOnClick
                          rtl={false}
                          pauseOnFocusLoss
                          draggable
                          pauseOnHover/>
                            
                        </Modal.Footer>
                    </Modal>

         {/*Tabela que irá mostrar as areas */}         
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
                //trás os dados da área
                areas.map((obj, indice) => (
                  //atribui uma chave para a linha, ao qual obtem os dados das áreas
                    <tr key={indice}>
                        <td  >{obj.id}</td>
                       
                        <td>{obj.nome}</td>
                    
                        <td><button className="btn btn-danger" onClick={() => excluir(obj.id)}>Excluir</button></td>
                        <td> <Button variant="warning" onClick={() => {
                           //puxa os valores/dados da área pelo indice
                            selecionarArea(indice)
                            //abre a primeira modal
                            handleShow()

                        }}>
                                Alterar
                            </Button>
                        </td>

                    {/*modal de alterar */}
                    <Modal
                        show={show}
                        onHide={handleClose}
                                    >
                        <Modal.Header closeButton>  
                        <Modal.Title>Alterar</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <form>
                          <label>Nome:</label>
                          <input className="inputNome" type="text" name="nome" defaultValue={objArea.nome} onChange={post}/>

                          </form>
                        
                        </Modal.Body>
                        <Modal.Footer>
                        <Button type="submit" variant="danger" onClick={() => {
                          //fecha a modal
                          handleClose()
                          //atualiza a página
                          window.location.reload()
                          }}>
                            Fechar
                        </Button>

                        <Button type='button' variant="warning" onClick={() => {
                            //efetua a alteração através do cadastro, pois puxa pelo indice que tem o id
                            cadastrar()
                            //exibir notificação de sucesso
                            sucessoAlterar()
                            //atualiza a página depois de um tempo
                            setInterval(function () {window.location.reload();}, 1500);
                           
                            

                        }}>
                            Alterar
                        </Button>

                        {/*trás a notificação de sucesso*/}
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