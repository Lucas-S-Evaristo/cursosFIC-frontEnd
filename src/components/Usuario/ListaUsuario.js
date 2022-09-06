import { useEffect, useState } from 'react'

function ListaUsuario() {

    const [usuarios, setUsuario] = useState([])

    // GET NOS USUARIOS
    useEffect(() => {
        fetch("http://10.92.198.11:8080/api/usuario")
        .then(resp => resp.json())
        .then(retorno_convertido => setUsuario(retorno_convertido))//lista os usuarios
    }, [])
    
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
                                <td><button>Excluir</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>

    )
}
export default ListaUsuario