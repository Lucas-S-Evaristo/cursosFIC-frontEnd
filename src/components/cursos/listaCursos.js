import { useEffect, useState } from 'react'
import  './lista.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

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
    const [show, setShow] = useState(false);
  
    //quando handleClose é chamado ele da um false no show e fecha a modal
    const handleClose = () => setShow(false);
    //quando handleShow é chamado ele da um true no show e abre a modal
    const handleShow = () => setShow(true);

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
                          handleClose()
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
    )
}
export default ListaCursos