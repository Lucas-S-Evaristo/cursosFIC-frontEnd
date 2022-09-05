import { useEffect, useState } from 'react'

function ListaUsuario() {

    const usuario = {
        id: "",
        nome: '',
        nif: '',
        tipoUsuario: '',
        email: '',
        senha: '',
    }

    const [usuarios, setUsuario] = useState([])
    const [objUsuario, setObjUsuario] = useState(usuario)

    // GET NOS USUARIOS
    useEffect(() => {
        fetch("http://10.92.198.11:8080/api/usuario")
        .then(resp => resp.json())
        .then(retorno_convertido => setUsuario(retorno_convertido))//lista os usuarios
    }, [])


    
    

    const deletar = (id) => {

        fetch("http://10.92.198.11:8080/api/usuario/" + id, {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
          }
    
          
        })
        .then(retorno => retorno.json())
        .then(retorno_convertido => {

            alert("EXCLUIDO COM SUCESSO")

            // copia do vetor de usuarios
            let vetorTemp = [...usuarios]

            // indice tem a posição que foi removida do vetor
            //findIndex percorre o vetor
            let indice = vetorTemp.findIndex((u)=>{
                return u.id === objUsuario.id;
            });

            // remover produto do vetor temp
            vetorTemp.splice(indice, 1)

            // atualizar vetor de usuarios, sem o usuario deletado
            setUsuario(vetorTemp)
        })
    
    }

    
    return (

        <div>
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
                                <td><button  onClick={() => deletar(objeto.id)} >Excluir</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>

    )
}
export default ListaUsuario