import React, { useEffect } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useState } from "react";
import { toast, ToastContainer, cssTransition} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import { Alert, Collapse, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import Snackbar from "@mui/material/Snackbar";

function CadUser(){

  //  USE ESTATE USADO PARA CONTROLAR O ESTADO DE UMA VARIAVEL
     // estado da modal
    const [open,setOpen] = useState(false)
    const [modalAlt,setModalAlt] = useState(false)
     // estado do obj do ususario
    const [objUsuario, setObjUsuario] = useState(usuario)
    // metodo que abre a modal
    const  handleOpen  =  ( )  =>  setOpen ( true ) ;
      // metodo que fecha a modal
    const  handleClose  =  ( )  =>  setOpen ( false );
    // variavel que tem acesso a um array com todos os usuarios
    const [usuarios,setUsuario] =useState([])
    // variavel que tem acesso a um array com todos os tipos de usuarios
    const [tipoUsuario,setTipoUsuario] = useState([])

   // metodo que captura informações do input
    const capturarDados = (e) => {
  
         console.log(e.target.value)      
        setObjUsuario({ ...objUsuario, [e.target.name]: e.target.value })
        
    }


    // REQUISIÇÃO GET PARA PUXAR TODOS OS USUARIOS
  useEffect ( ( )  =>  {
    fetch ( "http://localhost:8080/api/usuario" )
    .then ( resp  =>  resp . json ( ) )
    .then ( retorno_convertido  =>  setUsuario ( retorno_convertido ) ) //lista de usuários
} ,  [ ] )

  // REQUISIÇÃO GET PARA PUXAR TODOS OS TIPOS DE USUARIOS
  useEffect ( ( )  =>  {
    fetch ( "http://localhost:8080/api/enum/tipoUsuario" )
    .then ( resp  =>  resp . json ( ) )
    .then ( retorno_convertido  =>  setTipoUsuario ( retorno_convertido ) ) //lista de usuários
} ,  [ ] )


// função que espera receber um id
const alterar = async (id) => {
  // requisição ao back-end
 let resultado = await fetch("http://localhost:8080/api/usuario/" +id, {
    method: 'PUT',
    body: JSON.stringify(objUsuario),
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
  })

  // verifica se existe resultado
  if (resultado) {
    // atualiza a lista com o usuario alterado
    atualizaLista();
    // fecha a modal de alterar
    setModalAlt(false)
    // exibe a msg de alteração concluida
    msgAlteracao()
  }
}


  // metodo que efetua o cadastro do usuario
    const cadastrar = () => {
      //requisição ao back end
        fetch("http://localhost:8080/api/usuario", {
          method: 'post',
          body: JSON.stringify(objUsuario),
          headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
          }
    
        })
        // convertendo a resposta da promessa em json
        .then(retorno => retorno.json())
        // pegando o retorno convertido
        .then(retorno_convertido => {
          console.log(retorno_convertido)
          // metodo que atualiza a lista, que faz com que ao clicar seja adicionado "automaticamente"
          atualizaLista()
          // fecha modal
         handleClose()
         // limpa o formulario
         limparForm()
         // exibindo a msg de aviso de cadastro
          msgCadastro()
         
        })
    }

    // metodo que capta o usuario que foi selecionado
    const selecionarUsuario = (indice) =>{
     setObjUsuario(usuarios[indice])
    }

    
   

    // metodo que atualiza a lista, puxando todos os usuarios da rest api  
    const  atualizaLista  =  async  ( )  =>  {
        const  result  =  await  fetch ( "http://localhost:8080/api/usuario" )  // await = espera uma promessa
       const resultado  =  await result.json ( ) ;
        setUsuario (resultado)

    }
  
    // metodo que deleta o usuario
    const deletar = async (id) => {
        let result = await fetch(`http://localhost:8080/api/usuario/${id}`, {
            method: "DELETE"
        })
        // caso exista um usuario a ser deletado, ele atualiza a lista assim removendo o usuario deletado
        if(result) {
        
           atualizaLista()
           msgExclusao()
           
        }

       
    }

    // metodo que limpa os inputs do form
    const limparForm = () =>{

      setObjUsuario('')

       }


       // metodo que busca um usuario
    const buscaUsuario = async (event) => {

      // valor que esta sendo digitado no input de pesquisa
      let key = event.target.value;
      console.log(key)

      // verifica se existe 'valor'
      if(key){
       
        // fazendo uma requisição na api de busca e passando a key
        let result = await fetch("http://localhost:8080/api/usuario/busca/" + key)
        // tranformando a promessa em json
        result = await result.json();
        console.log(result)

        // verifica se existe algum resultado
        if(result){

          // setando os usuarios que a api retornou de sua resposta de busca
          setUsuario(result)
        }

        
        // caso não exista chave, atualiza a lista
      }else{

        atualizaLista();
      }
    }

    // toda vez que a modal é chamada, ela sera limpa e fechada
    const clearClose= () =>{

      handleClose()
      limparForm()
    }


// metodo de msg de cadastro efetuado com sucesso
const msgCadastro = () =>{

  toast.success("Usuário Cadastrado com Sucesso",{
    position:"top-right",
    autoClose:1500,
    hideProgressBar:false,
    closeOnClick:true,
    pauseOnHover:true,
    theme:'colored',
    // faz com que seja possivel arrastar
    draggable:true,
    progress:undefined


  })
}

// metodo de msg de exclusão feita com sucesso
const msgExclusao = () =>{

  toast.error("Usuário Removido com Sucesso",{
    position:"top-right",
    autoClose:1500,
    hideProgressBar:false,
    closeOnClick:true,
    pauseOnHover:true,
    theme:'light',
    // faz com que seja possivel arrastar
    draggable:true,
    progress:undefined


  })
}

// metodo de msg de alteração feita com sucesso
const msgAlteracao = () =>{

  toast.warn("Usuário Alterado com Sucesso",{
    position:"top-right",
    autoClose:1500,
    hideProgressBar:false,
    closeOnClick:true,
    pauseOnHover:true,
    theme:'light',
    // faz com que seja possivel arrastar
    draggable:true,
    progress:undefined


  })
}


    return(

         <>       
     
        
    <ToastContainer position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
    />
      <Button onClick={handleOpen} style={{margin: 10,float:'left',borderRadius:'8px'}} variant="contained" color="primary" >ADICIONAR USUÁRIO </Button>
      
      <Modal
        open={open}
        onClose={clearClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
      
          <form>
          <TextField sx={styleTextField} className="textField" onChange={capturarDados} name="nome" type="text" label="NOME" variant="outlined" />
          <InputLabel  id="demo-simple-select-label">Tipo Usuario</InputLabel>
          <select
          style={styleTextField}
          name="tipoUsuario"
          required
          className="form-control"
            onChange={capturarDados}
        >

          <option>Selecione:</option>
               
                    {
                        tipoUsuario.map((obj,indice) => (
                       
                           <option key={indice}>
                           {obj}
                           </option>
                        ))
                    }
    
        </select>
          <TextField required sx={styleTextField} onChange={capturarDados} name="nif" type="text" label="NIF" variant="outlined" />
          <TextField required sx={styleTextField} onChange={capturarDados} name="email" type="email" label="EMAIL" variant="outlined" />
          <TextField required sx={styleTextField} onChange={capturarDados}  name="senha" type="password" label="SENHA" variant="outlined" />
          <Button variant="contained" color="success"  style={{margin:10}}  onClick={() => {
                                          cadastrar()
                                        
                                        }}  >Cadastrar</Button>


          <Button variant="contained" color="error"  style={{margin:10}} onClick={() => {
                                          limparForm()
                                          handleClose()
                                        }} >Fechar</Button>

          </form>
        </Box>
      </Modal>




      <Modal
        open={modalAlt}
        onClose={clearClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <form>
          <TextField required defaultValue={objUsuario.nome}  sx={styleTextField} className="textField" onChange={capturarDados} name="nome" type="text" label="NOME" variant="outlined" />
          <InputLabel  id="demo-simple-select-label">Tipo Usuario</InputLabel>
          <select
          defaultValue={objUsuario.tipoUsuario}
          style={styleTextField}
          name="tipoUsuario"
          className="form-control"
            onChange={capturarDados}
        >
 
               
                    {
                        tipoUsuario.map((obj,indice) => (
                       
                           <option key={indice}>
                           {obj}
                           </option>
                        ))
                    }
    
        </select>
          <TextField defaultValue={objUsuario.nif} required sx={styleTextField} onChange={capturarDados} name="nif" type="text" label="NIF" variant="outlined" />
          <TextField defaultValue={objUsuario.email}  required sx={styleTextField} onChange={capturarDados} name="email" type="email" label="EMAIL" variant="outlined" />
          <TextField required sx={styleTextField} onChange={capturarDados}  name="senha" type="password" label="SENHA" variant="outlined" />
          <Button variant="contained" color="success"  style={{margin:10}} onClick={() => alterar(objUsuario.id)}  >Alterar</Button>


          <Button variant="contained" color="error"  style={{margin:10}} onClick={() => {
                                         
                                         setModalAlt(false)
                                        }} >Fechar</Button>

          </form>
        </Box>
      </Modal>


   
                 

                           

                           <h1 style={styleTitle}>Lista de Usuarios</h1>  
                          <input placeholder="Busque por um Usuário" onChange={buscaUsuario} style={styletSearch}/>

                           <table className="table">
                            <thead>
                             
                                <th>NOME</th>
                                <th>EMAIL</th>
                                <th>NIF</th>
                                <th>TIPO USUÁRIO</th>
                                <th>ALTERAR</th>
                                <th>DELETAR</th>
                              </thead>

                              <tbody>

                             {
                                usuarios.map((obj,indice) => (
                                   
                                        <tr key={indice}>
                                       
                                        <td>{obj.nome}</td>
                                        <td>{obj.email}</td>
                                        <td>{obj.nif}</td>
                                        <td>{obj.tipoUsuario}</td>
                                        <td><Button variant="contained" color="warning" onClick={() => {
                                          selecionarUsuario(indice)
                                         setModalAlt(true)
                                        }}>Alterar</Button></td>
                                        <td><Button variant="contained" color="error"  onClick={() => deletar(obj.id)}>Remover</Button></td>
                                        </tr>
                                      
                         
                              ))

                                }

                              </tbody>
                           
                           </table>

                          
      </>
    )
}

const usuario = {
    id: '',
    nome: '',
    nif: '',
    tipoUsuario: '',
    email: '',
    senha: '',
}


const styleTextField = {
    display:'flex',
    flexDirection:'row',
     marginBottom:'30px'

  };

  const styleTitle = {
   
   textAlign: 'center',
   marginBottom:'30px',
   color:'blue'

  };

  const styletSearch ={
    border: '2px solid blue',
    alignItems:'center',
     marginLeft: '500px',
    padding:'10px',
    borderRadius:'6px',
    marginBottom:'30px',  
    boxShadow: 24,
  
  }

  const snackStyle ={

    float:'right'
  }

const style = {
    position: 'absolute',
    top: '50%',
    display:'flex',
    flexDirection:'row',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
export default CadUser;