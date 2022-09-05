import { useEffect, useState } from 'react'

function ListaUsuario() {

    const [usuarios, setUsuario] = useState([])

    useEffect(() => {
        fetch("http://localhost:8080/api/usuario")
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
                        <th>Tipo</th>
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
                                <td><button /* onClick={excluir} */>Excluir</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>

    )
}
export default ListaUsuario