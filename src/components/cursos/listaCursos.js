import { useEffect, useState } from 'react'
import  './lista.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import  {ToastContainer,toast}  from  'react-toastify' ; 
import  'react-toastify/dist/ReactToastify.css' ;




//função pra listar todos os cursos cadastrados
function ListaCursos({excluir, selecionarCurso, post, cadastrar, sucesso, sucessoExcluir}){

  //enviar notificação de sucesso
  sucesso = () => {
    toast.success("Alterado com sucesso!", {
      position: "top-center",
      autoClose: 1500,
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

      //captura dados digitados no formulario
      post = (e) => {
  
        console.log(e.target)
        setObjCurso({ ...objCurso, [e.target.name]: e.target.value })
      }

      //faz uma requisição ao back-end de cadastro
      cadastrar = () => {
        fetch("http://localhost:8080/api/curso", {
          method: 'post',
          body: JSON.stringify(objCurso), //passa o objeto curso pro corpo da resposta
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

    //faz uma requisição ao back-end de excluir
    excluir = async (id) => {
       let result = await fetch("http://localhost:8080/api/curso/"+id, {
          method: 'delete',
          
    
        })
        if(result) {
          getCursos() 
        }

      }

       
      //pega os valores do curso e passa para o input
      selecionarCurso = (indice) => {

        //puxa o curso pelo indice dele, pegando assim o id
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

            //puxa os cursos pra fazer a busca
            const getCursos = async ( ) => {
                let result = await fetch(`http://localhost:8080/api/curso`)
                result = await result.json();
                setCursos(result)
            }

          //busca os cursos
          const buscarCs = async (event) =>{
                let key = event.target.value;
                if (key) {
                    let result = 
                    //faz uma requisição ao back-end pra buscar a api de pesquisar cursos
                    await fetch(`http://localhost:8080/api/curso/buscar/${key}`)
                    result = await result.json();
                    if (result) {

                        setCursos(result)
                    }
                    
                }else{
                  getCursos();
                }
                
            }

    return(
        //lista de cursos
        <div className="lista">
        
        
        <h1 className="titulo">Lista de cursos</h1>

        <form>
            <label>Buscar cursos</label>
            <input
                //faz a busca de cursos
                onChange={buscarCs} 
                type="" 
                className="inputNome"
                name="parametro"
                required="required"
                />
        </form>

         {/*Tabela que irá mostrar os cursos */}
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
      //trás os dados do curso
      cursos.map((obj, indice) => (
        //atribui uma chave para a linha, ao qual obtem os dados dos cursos
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
              <td><button type='button' className="btn btn-danger" onClick={() => { 
                //excluir curso pelo id
                excluir(obj.id)
                
              }}>Excluir</button></td>
              <td> <Button variant="warning" onClick={() => {
                  //puxa os valores/dados do curso pelo indice
                  selecionarCurso(indice)
                  //chama a modal
                  handleShow()
                  

              }}>
                                Alterar
                            </Button>
                        </td>

                        {/*modal de alterar */}
                        <Modal
                        show={show}
                        onHide={handleClose}
                        scrollable={true}
                                    >
                        <Modal.Header closeButton>  
                        <Modal.Title>Alterar</Modal.Title>
                        </Modal.Header>
                        {/*corpo da Modal */}
                        <Modal.Body>

                           {/*Formulario que permite a visualização e alteração de dados dos cursos */}
                        <form className="formAlterar">
                          <label>Nome:</label>

                           {/*DefaultValue permite editar os input e alterar os dados */}  {/*On change permite alterar os dados do
                           curso com o cadastro, pois puxa pelo id atribuido ao indice */}
                          <input type="text" className="inputNome" name="nome" defaultValue={objCurso.nome} onChange={post}/>

                          <label>Objetivo:</label>                         
                          <input type="text" className="inputNome" name="objetivo" defaultValue={objCurso.objetivo} onChange={post}/>
                          
                          <label>Pré-Requisito:</label>
                          <input type="text" className="inputNome" name="preRequisito" defaultValue={objCurso.preRequisito} onChange={post}/>

                          <label>conteúdo Programático:</label>
                          <input type="text" className="inputNome" name="conteudoProgramatico" defaultValue={objCurso.conteudoProgramatico} onChange={post}/>

                          <label>Sigla:</label>
                          <input type="text" className="inputNome" name="sigla" defaultValue={objCurso.sigla} onChange={post}/>

                          <label>carga Horária:</label>
                          <input type="text" className="inputNome" name="cargaHoraria" defaultValue={objCurso.cargaHoraria} onChange={post}/>

                          <label>Valor:</label>
                          <input type="text" className="inputNome" name="valor" defaultValue={objCurso.valor} onChange={post}/>

                          </form>
                        
                        </Modal.Body>
                        <Modal.Footer>
                        <Button type='submit' variant="danger" onClick={() => {
                          //fecha a modal
                          handleClose()
                          //atualiza a página
                          window.location.reload();
                          }}>
                            Fechar
                        </Button>

                        <Button type='button' variant="warning" onClick={() => {
                          //exibir notificação de sucesso
                          sucesso()
                          //efetua a alteração através do cadastro, pois puxa pelo indice que tem o id
                          cadastrar()
                          //atualiza a página depois de um tempo
                          setInterval(function () {window.location.reload();}, 1500);
                          }}>
                            Alterar
                        </Button>
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

                    </tr>

                    
                ))
        }

        </tbody>

        </table>

        
        
        </div>
    )
}
export default ListaCursos