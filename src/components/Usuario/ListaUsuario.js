import { TextField } from '@mui/material';
import { useEffect, useState } from 'react'

function ListaUsuario() {

    const [usuarios, setUsuario] = useState([])

    // BUSCA O USUARIO NO BANCO E MOSTRA NA TELA
    const buscaUsuario = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:8080/api/usuario/buscar/${key}`)
            result = await result.json()
            if (result) {setUsuario(result)}
            }else{
                getUsuario();
              }
    }

    // FAZ A EXCLUSÃO NA LISTA DE USUARIO
    const deletaUsuario = async (id) => {
        let result = await fetch(`http://localhost:8080/api/usuario/${id}`, {
            method: "DELETE"
        })
        if(result)
        {getUsuario()}
    }

    // GET NOS USUARIOS
    const getUsuario = async () => {
        let result = await fetch(`http://localhost:8080/api/usuario`) // await = espera uma promessa
        result = await result.json();
        setUsuario(result)

        /* 
        código de cima substitui esse fetch =>
        
        fetch("http://10.92.198.11:8080/api/usuario")
        .then(resp => resp.json())
        .then(retorno_convertido => setUsuario(retorno_convertido))//lista os usuarios
        */
    }
   useEffect(() => {
        getUsuario()
    }, [])

    console.log(usuarios)
    
    return (
        <div>

            <TextField onChange={buscaUsuario} name="parametro" />
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Nif</th>
                        <th>E-mail</th>
                        <th>Senha</th>
                        <th>Tipo Usuario</th>
                        <th>Alterar</th>
                        <th>Deletar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usuarios.map((objeto) => (
                            <tr>
                                <td>{objeto.id}</td>
                                <td>{objeto.nome}</td>
                                <td>{objeto.nif}</td>
                                <td>{objeto.email}</td>
                                <td>{objeto.senha}</td>
                                <td>{objeto.tipoUsuario}</td>
                                <td><button>Alterar</button></td>
                                <td><button onClick={() => deletaUsuario(objeto.id)} >Excluir</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>

    )
}
export default ListaUsuario