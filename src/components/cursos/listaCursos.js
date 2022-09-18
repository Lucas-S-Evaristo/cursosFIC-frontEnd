import { useEffect, useState } from 'react'
import  './lista.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import  {ToastContainer,toast}  from  'react-toastify' ; 
import  'react-toastify/dist/ReactToastify.css' ;




//função pra listar todos os cursos cadastrados
function ListaCursos({excluir, selecionarCurso, post, alterar, sucesso}){

  const [nome, setNome] = useState()

  const [objetivo, setObjetivo] = useState()

  const [preRequisito, setPreRequisito] = useState()

  const [conteudoProgramatico, setConteudoProgramatico] = useState()

  const [sigla, setSigla] = useState()

  const [cargaHoraria, setCargaHoraria] = useState()

  const [valor, setValor] = useState()

  const [valueNivel, setValueNivel] = useState()

  const [valueTipoAtend, setValueTipoAtend] = useState()

  const [idArea, setIdArea] = useState()

  const curso = {
    id: "",
    nome: "",
    objetivo: "",
    preRequisito:"",
    conteudoProgramatico: "",
    area: {
      id: idArea
    },
    sigla:"",
    cargaHoraria:"",
    valor: ""
  }

  
  const [objCurso, setObjCurso] = useState(curso)

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

      //captura dados digitados no formulario
      const nomeValor = (e) => {
  
        console.log("NOME: ", e.target)
        setNome({ ...nome, [e.target.name]: e.target.value })
      }

      const valorIdArea = (e) => {
  
        console.log("id AREA: ", e.target.value)
        setIdArea({ ...idArea, [e.target.name]: e.target.value })
      }

     const preReqValor = (e) => {
  
        console.log(e.target)
        setPreRequisito({ ...preRequisito, [e.target.name]: e.target.value })
      }

      const objetivoValor = (e) => {
  
        console.log(e.target)
        setObjetivo({ ...objetivo, [e.target.name]: e.target.value })
      }

      const conteudoProgValor = (e) => {
  
        console.log(e.target)
        setConteudoProgramatico({ ...conteudoProgramatico, [e.target.name]: e.target.value })
      }

      const siglaValor = (e) => {
  
        console.log(e.target)
        setSigla({ ...sigla, [e.target.name]: e.target.value })
      }

      const cargaHorariaValor = (e) => {
  
        console.log(e.target)
        setCargaHoraria({ ...cargaHoraria, [e.target.name]: e.target.value })
      }

      const valorValue = (e) => {
  
        console.log(e.target)
        setValor({ ...valor, [e.target.name]: e.target.value })
      }

      const pegarValueNivel = (e) => {

        setValueNivel({...valueNivel, [e.target.name]: e.target.value})
      }

      const pegarvalueTipoAtend = (e) => {
        setValueTipoAtend({...valueTipoAtend, [e.target.name]: e.target.value})
      }

      console.warn(idArea)

      post = (e) => {
  
        console.log(e.target)
        setObjCurso({ ...objCurso, [e.target.name]: e.target.value })
      }

      //faz uma requisição ao back-end de alteração
      alterar = async (id) => {
        // requisição ao back-end
       let resultado = await fetch("http://localhost:8080/api/curso/" +id, {
          method: 'PUT',
          body: JSON.stringify(objCurso),
          headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
          }
        })
      
        // verifica se existe resultado
        if (resultado) {    
          // exibe a msg de alteração concluida
          sucesso()
          setInterval(function () {window.location.reload();}, 1500);
        }
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

      //get na api de enum de tipo de atendimento
      useEffect(() => {
        fetch("http://localhost:8080/api/enum/tipoAtendimento")
        .then(retorno => retorno.json())
        .then(retorno_convertido => setTipoAtendimento(retorno_convertido))
        //retorno convertido tem a lista de todos as enum de tipoAtendimento
    }, [])
    
      //get na api de enum de nivel do curso
      useEffect(() => {
        fetch("http://localhost:8080/api/enum/nivel")
        .then(retorno => retorno.json())
        .then(retorno_convertido => setNivel(retorno_convertido))//retorno convertido tem a lista de todos as enum de nivel
    }, []) 

    //get na api de area
    useEffect(() => {
      fetch("http://localhost:8080/api/area")
      .then(retorno => retorno.json())
      .then(retorno_convertido => setArea(retorno_convertido))//retorno convertido tem a lista de todos as areas
  }, []) 



    //const pra puxar os dados do curso    
    const [cursos, setCursos] = useState([])

    
    //const pra abrir a modal
    const [modalAlterar, setShow] = useState(false);
    
    const [modalExcluir, setShowExcluir] = useState(false);
  
    //quando handleClose é chamado ele da um false no show e fecha a modal
    const fecharModalAlterar = () => setShow(false);
    //quando handleShow é chamado ele da um true no show e abre a modal
    const abrirModalAlterar = () => setShow(true);

    const abrirModalExcluir = () => setShowExcluir(true);

    const fecharModalExcluir = () => setShowExcluir(false);

    //const pra puxar os niveis
    const [nivel, setNivel] = useState([])

    //const pra puxar as areas
    const [area, setArea] = useState([])

    //const pra puxar os tipos de atendimentos
    const [tipoAtendimento, setTipoAtendimento] = useState([])



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

          <div className="painel">
            

            </div>

        <div class="buscar">

        <form>

      <div className='divInputPesquisa'>
        <i className="bi bi-search "><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search iconePesq" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg></i>
            <input
                //faz a busca de cursos
                onChange={buscarCs} 
                type="" 
                className="inputBusca"
                name="parametro"
                required="required"
                />
                </div>
        </form>

        <a href="/"><button className='addCadastro'><i class="bi bi-person-plus-fill"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-plus-fill" viewBox="0 0 16 16">
  <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
  <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
</svg></i></button></a>
        
        </div>

        
        <div className='conteudoFormulario'>

         {/*Tabela que irá mostrar os cursos */}
         <div className='divTabela'>
        <table className="table">
 
    <thead>
     <tr className='theadTabela'  >
              <th>id:</th>
              <th>Nome:</th>
        
              <th>Carga Horaria:</th>
              <th>Conteúdo programático:</th>
              <th>Valor:</th>
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
              <td>{obj.valor}</td>
              <td>{obj.nivel}</td>
              <td>{obj.objetivo}</td>
              <td>{obj.preRequisito}</td>
              <td>{obj.sigla}</td>
              <td>{obj.tipoAtendimento}</td>
              <td>{obj.area.nome}</td>
              <td><button type='button' className="btn btn-danger botaoExcluir" onClick={abrirModalExcluir}>
              <i class="bi bi-trash3-fill"></i>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
</svg>
                </button></td> 

              <Modal 
              show={modalExcluir} 
              onHide={fecharModalExcluir}
              backdrop="static"
              aria-labelledby="contained-modal-title-vcenter"
              centered>

                
                  <Modal.Header closeButton className="bodyExcluir">
                    <Modal.Title className='tituloExcluir'>ALERTA!</Modal.Title>
                  </Modal.Header>
                  <Modal.Body><h4 className="textoExcluir">Tem Certeza que deseja excluir?</h4></Modal.Body>
                 
                  <Modal.Footer>
                    <Button variant="secondary" onClick={fecharModalExcluir}>
                      Não
                    </Button>
                    <Button variant="danger" onClick={() => { 
                //excluir curso pelo id
                excluir(obj.id)
                fecharModalExcluir()}}>
                      Sim
                    </Button>
                  </Modal.Footer>
                 
                </Modal>
          
              
              <td> <Button variant="warning" className='botaoAlterar' onClick={() => {
                  //puxa os valores/dados do curso pelo indice
                  selecionarCurso(indice)
                  //chama a modal
                  abrirModalAlterar()
                  
              }}><i class="bi bi-pencil-square"></i><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
            </svg>
                              
                            </Button>
                        </td>

                        {/*modal de alterar */}
                        <Modal
                        show={modalAlterar}
                        onHide={fecharModalAlterar}
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

                           {/*DefaultValue permite editar os input e alterar os dados */}  
                           {/*On change captura os dados informados */}
                          <input type="text" className="inputNome" name="nome" defaultValue={objCurso.nome} 
                          onChange={(e) => {
                            nomeValor(e)
                            post(e)}}/>

                          <label>Objetivo:</label>                         
                          <input type="text" className="inputNome" name="objetivo" 
                          defaultValue={objCurso.objetivo}  onChange={(e) => {
                            objetivoValor(e)
                            post(e)}}/>

                          <label>Pré-Requisito:</label>
                          <input type="text" className="inputNome" name="preRequisito" 
                          defaultValue={objCurso.preRequisito}  onChange={(e) => {
                            preReqValor(e)
                            post(e)}}/>

                          <label>Conteúdo Programático:</label>
                          <input type="text" className="inputNome" name="conteudoProgramatico" 
                          defaultValue={objCurso.conteudoProgramatico}  onChange={(e) => {
                            conteudoProgValor(e)
                            post(e)}}/>

                          <label>Sigla:</label>
                          <input type="text" className="inputNome" name="sigla" 
                          defaultValue={objCurso.sigla}  onChange={(e) => {
                            siglaValor(e)
                            post(e)}}/>

                          <label>Carga Horária:</label>
                          <input type="text" className="inputNome" name="cargaHoraria" 
                          defaultValue={objCurso.cargaHoraria}  onChange={(e) => {
                            cargaHorariaValor(e)
                            post(e)}}/>

                          <label>Valor:</label>
                          <input type="text" className="inputNome" name="valor" 
                          defaultValue={objCurso.valor}  onChange={(e) => {
                            valorValue(e)
                            post(e)}}/>


                          <label>Nivel:</label>
                          <select  onChange={(e) => {
                            pegarValueNivel(e)
                            post(e)}}
                            name="nivel" className="form-select form-select-sm" 
                          aria-label=".form-select-sm example" defaultValue={objCurso.nivel}>
                            {
                              //puxa os niveis
                              nivel.map((obj, indice) => (
                                
                              <option key={indice} value={obj}>
                                {obj}
                              </option>
                            ))}
                          </select> 

                          <label>Área:</label>
                          <select name="area" className="form-select form-select-sm" defaultValue={objCurso.area.nome}
                          aria-label=".form-select-sm example"  onChange={(e) => {
                            valorIdArea(e)
                            post(e)}}>
                            {
                               //mostra os nomes das áreas cadastradas
                              area.map((obj, indice) => (
                                
                              <option key={obj.id}>
                                {obj.nome}
                              </option>
                            ))}
                          </select> 

                          <label>Tipo de atendimento:</label>
                          <select name="tipoAtendimento"
                            onChange={(e) => {
                            pegarvalueTipoAtend(e)
                            post(e)}}
                            className="form-select form-select-sm" 
                          aria-label=".form-select-sm example" defaultValue={objCurso.tipoAtendimento} >
                              {
                                //puxa os tipos de atendimento
                              tipoAtendimento.map((obj, indice) => (
                                
                              <option key={indice} value={obj}>
                                
                                {obj}
                                
                              </option>
                            ))}
                          </select>
                          </form>
                        
                        </Modal.Body>
                        <Modal.Footer>
                        <Button type='submit' variant="danger" onClick={() => {
                          //fecha a modal
                          fecharModalAlterar()
                          //atualiza a página
                          window.location.reload();
                          }}>
                            Fechar
                        </Button>
                        
                                                                              {/*efetua a alteração */ }
                        <Button type='button' variant="warning" onClick={() => alterar(objCurso.id)}>
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
        
        </div>

        </div>
    )
}
export default ListaCursos