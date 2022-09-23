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
import { keyframes } from 'styled-components';
import { CheckBox, Construction } from '@mui/icons-material';




//função pra listar todos os cursos cadastrados
function ListaCursos({excluir, selecionarCurso, post, alterar, sucessoAlterar, sucesso,  erroServ, manterDadosPag, erroCadSelect, erroCad, cadastrar, curso, postAlterar}){

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

  const [idCurso, setIdCurso] = useState()

  const cursoAlterar = {
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

  const [objCursoAlterar, setObjCursoAlterar] = useState(cursoAlterar)

  //enviar notificação de sucesso
  sucessoAlterar = () => {
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

 //envia uma notificação de erro, caso o usuario não preencha os campos corretamente
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

 //erro pra caso o usuario não selecionar os valores do select
 erroCadSelect = () => {
  toast.error("Selecione os valores corretamente!", {
    position: "top-center",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    theme: 'colored',
    draggable: true,
    progress: undefined,})
 }

 //mensagem de erro pro servidor
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

      const valorIdCurso = (e) => {
  
        console.log(e.target)
        setIdCurso({ ...idCurso, [e.target.name]: e.target.value })
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

      post = (e) => {
  
        console.log(e.target)
        setObjCurso({ ...objCurso, [e.target.name]: e.target.value })
      }

      postAlterar = (e) => {
  
        console.log(e.target)
        setObjCursoAlterar({ ...objCursoAlterar, [e.target.name]: e.target.value })
      }

      //faz uma requisição ao back-end de cadastro
      cadastrar = () => {
        fetch("http://localhost:8080/api/curso", {
          method: 'post',
          body: JSON.stringify(curso),//corpo da resposta recebe um curso
          headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
          }
    
        })

        .then(retorno => {
          //se o input estiver vazio, passar uma resposta de erro e enviar mensagem de erro
          if(retorno.status === 409){
            erroCad()
            manterDadosPag()
            //se o input estiver vazio, passar uma resposta de erro e enviar mensagem de erro
          }else if(retorno.status === 418){
          erroCadSelect()

          manterDadosPag()
      }else {
            //faz o processo de cadastro
            retorno.json()
        .then(retorno_convertido => {

           //exibir notificação de sucesso
           sucesso()
           //atualiza a página depois de um tempo
          setInterval(function () {window.location.reload();  }, 1500);
         
  
        }
        )
          }
        })
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
          sucessoAlterar()
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

      let [valorCheck, setValueCheck] = useState([])

      const [botaoExcluir, setBtnExcluir] = useState(false)

      const [botaoAlterar, setBtnAlterar] = useState(false)

      const [checks, setChecks] = useState(0)

      

      const handleCheckBox = (e) =>{

        const{value, checked} = e.target;

     

        //se tiver um checkbox checado
        if (checked) {
    
          
          console.log("if")

          setValueCheck([...valorCheck, value], value);

          setBtnExcluir(true)

         
          
          //se não tiver checado
        } else{
    
          setChecks(checks-1)
          setValueCheck(valorCheck.filter((e)=> e!== value));
        
          if(valorCheck.length == 0){
         
          setBtnExcluir(false)

        
          }

          console.log("else")

      }
    
      }

      function marcarTodos(e) {

        const { value, checked } = e.target;
    

        let listid = document.querySelectorAll('input[name="id"]'); ;
    
        let i = 0;
    
        console.warn("input" + listid);
    
        if (checked) {
    
          for (i = 0; i < listid.length; i++) {
    
            valorCheck.push(listid[i].value);
    
            listid[i].checked = checked;

            setBtnExcluir(true)
    
          }
    
        } else {
    
          for (i = 0; i < listid.length; i++) {
    
            listid[i].checked = false;
    
            valorCheck = valorCheck.filter((e) => e !== listid[i].value);

            setBtnExcluir(false)
            
            setInterval(function () {window.location.reload();}, 1000);
          }
    
          listid = [];
    
        }
      }
        const deletar = async()=>{

              excluir(valorCheck)
              setInterval(function () {window.location.reload();}, 5);
              

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

    const [modalCadastrar, setShowCadastrar] = useState(false);
    
    const [modalExcluir, setShowExcluir] = useState(false);
  
    //quando handleClose é chamado ele da um false no show e fecha a modal
    const fecharModalAlterar = () => setShow(false);
    //quando handleShow é chamado ele da um true no show e abre a modal
    const abrirModalAlterar = () => setShow(true);

    const abrirModalExcluir = () => setShowExcluir(true);

    const fecharModalExcluir = () => setShowExcluir(false);

    const abrirModalCadastrar = () => setShowCadastrar(true);

    const fecharModalCadastrar = () => setShowCadastrar(false);

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
                    await fetch(`http://localhost:8080/api/curso/buscarCurso/${key}`)
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

        <div className="buscar">

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

        <button className='addCadastro' onClick={abrirModalCadastrar}><i className="bi bi-person-plus-fill"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-plus-fill" viewBox="0 0 16 16">
  <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
  <path fillRule
="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
</svg></i></button>


 {/*modal de cadastrar */}
 <Modal
                        show={modalCadastrar}
                        onHide={fecharModalCadastrar}
                        scrollable={true}
                                    >
                        <Modal.Header closeButton>  
                        <Modal.Title>Cadastrar</Modal.Title>
                        </Modal.Header>
                        {/*corpo da Modal */}
                        <Modal.Body>

                           {/*Formulario de cursos */}
            <form className="formAlterar">
          
                <input
                    required
                    value={nome}//recebe o que foi digitado no input
                    name="nome" className="inputNomeCadastro"
                    type="text" placeholder="Nome"
                    onChange={(e) => {
                      //puxa o valor do nome digitado no input
                      setNome(e.target.value)
                      }}
                />
                
             
                <select value={idArea} className="form-select form-select-sm inputSelect" aria-label=".form-select-sm example"  
                name="area" onChange={(e) => {
                  setIdArea(e.target.value)

                  post(e)

                  }

                  }>

                    <option>ÁREA: </option>
                              
              {
                //mostra os nomes das áreas cadastradas
                  area.map((obj) => (
                    
                      <option id="idArea" name="area" key={obj.id} value={obj.id}>
                      {obj.nome}
                      </option>
                  ))}

                </select>

                <input
                    required
                    name="objetivo" className="inputNomeCadastro"
                    type="text" placeholder="objetivo do curso"
                    value={objetivo}
                    onChange={(e) => {

                      setObjetivo(e.target.value)
    
                      post(e)
    
                      }}

                />
                <input
                    required
                    name="preRequisito" className="inputNomeCadastro"
                    type="text" placeholder="Pré requisito"
                    value={preRequisito}
                    onChange={(e) => {

                      setPreRequisito(e.target.value)
    
                      post(e)
    
                      }}
                />
                <input
                    required
                    name="conteudoProgramatico" className="inputNomeCadastro"
                    type="text" placeholder="Conteúdo programático"
                    value={conteudoProgramatico}
                    onChange={(e) => {

                      setConteudoProgramatico(e.target.value)
    
                      post(e)
    
                      }}
                />

          
                <select value={valueNivel} onChange={(e) => {setValueNivel(e.target.value)}} 
                name="nivel" className="form-select form-select-sm inputSelect" aria-label=".form-select-sm example">

                <option>NIVEL: </option>
                   {
                    //puxa os niveis
                    nivel.map((obj, indice) => (
                      
                    <option key={indice} defaultValue={obj}>
                      {obj}
                    </option>
                  ))}
                </select> 

              
                <select value={valueTipoAtend} name="tipoAtendimento" onChange={(e) => {setValueTipoAtend(e.target.value)}}
                 className="form-select form-select-sm inputSelect" aria-label=".form-select-sm example" >
                    
                <option>TIPO ATENDIMENTO: </option>
                    {
                      //puxa os tipos de atendimento
                    tipoAtendimento.map((obj, indice) => (
                      
                    <option key={indice} defaultValue={obj}>
                      
                      {obj}
                      
                    </option>
                  ))}
                </select>
                <input
                    required
                    name="cargaHoraria" className="inputNomeCadastro"
                    type="number" placeholder="Carga horaria"
                    value={cargaHoraria}
                    onChange={(e) => {

                      setCargaHoraria(e.target.value)
    
                      post(e)
    
                      }}
                />
                <input
                    required
                    name="valor" className="inputNomeCadastro"
                    type="number" placeholder="valor"
                    value={valor}
                    onChange={(e) => {

                      setValor(e.target.value)
    
                      post(e)
    
                      }}
                />
            <ToastContainer/>
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
                        <Button type='button' variant="warning" onClick={() =>   cadastrar()}>
                            Cadastrar
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

        
        </div>

        
        <div className='conteudoFormulario'>

         {/*Tabela que irá mostrar os cursos */}
         <div className='divTabela'>
        <table className="table">
 

        {
          botaoExcluir
          ?     
          <button className='btn btn-danger botaoExcluir' onClick={abrirModalExcluir}  style={valorCheck.length === 0 ? {visibility:"hidden"} : {visibility:"visible"}} ><i className="bi bi-trash3-fill"></i>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
       <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
          </svg></button>
        :
        <></>
    }

    <thead>
  <tr className='theadTabela'>
          <th><input type="checkbox" onChange={marcarTodos}/></th>
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
          <th>Alterar:</th>
          
  </tr>
     </thead>

        <tbody>
            {
      //trás os dados do curso
      cursos.map((obj, indice) => (
        //atribui uma chave para a linha, ao qual obtem os dados dos cursos
              <tr key={obj.id}>
                 <td  name="id"><input type="checkbox" name="id" value={obj.id} onChange={handleCheckBox}/></td>
              <td >{obj.id}</td>
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
              <td><button  className='btn btn-warning botaoAlterar' style={valorCheck.length >= 1 ? {visibility:"hidden"} : {visibility:"visible"}}  onClick={() => {
        selecionarCurso(indice)
        abrirModalAlterar()
      }}><i className="bi bi-pencil-square"></i><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
        <path fillRule
="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
      </svg>
          
        </button>
        </td>
             
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
                deletar()
                fecharModalExcluir()}}>
                      Sim
                    </Button>
                  </Modal.Footer>
                 
                </Modal>
          
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
                            postAlterar(e)}}/>

                          <label>Conteúdo Programático:</label>
                          <input type="text" className="inputNome" name="conteudoProgramatico" 
                          defaultValue={objCurso.conteudoProgramatico}  onChange={(e) => {
                            conteudoProgValor(e)
                            postAlterar(e)}}/>

                          <label>Sigla:</label>
                          <input type="text" className="inputNome" name="sigla" 
                          defaultValue={objCurso.sigla}  onChange={(e) => {
                            siglaValor(e)
                            postAlterar(e)}}/>

                          <label>Carga Horária:</label>
                          <input type="number" className="inputNome" name="cargaHoraria" 
                          defaultValue={objCurso.cargaHoraria}  onChange={(e) => {
                            cargaHorariaValor(e)
                            postAlterar(e)}}/>

                          <label>Valor:</label>
                          <input type="number" className="inputNome" name="valor" 
                          defaultValue={objCurso.valor}  onChange={(e) => {
                            valorValue(e)
                            postAlterar(e)}}/>


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