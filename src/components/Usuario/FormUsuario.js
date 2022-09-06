import { useEffect, useState } from 'react'

function FormUsuario({ post}) {

    const usuario = {
        id: "",
        nome: '',
        nif: '',
        tipoUsuario: '',
        email: '',
        senha: '',
    }

    // CAPTURANDO TODOS OS DADOS INFORMADOS NOS INPUT
    post = (e) => {
  
        console.log(e.target)
        setObjUsuario({ ...objUsuario, [e.target.name]: e.target.value })
    }

    // REQUISIÇÃO POST PARA CADASTRAR NOVOS USUARIOS
    const cadastrar = () => {
        fetch("http://10.92.198.11:8080/api/usuario", {
          method: 'post',
          body: JSON.stringify(objUsuario),
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

    // REQUISIÇÃO GET PARA PUXAR TODOS OS TIPOS DE USUARIOS
    useEffect(() => {
        fetch("http://10.92.198.11:8080/api/enum/tipoUsuario")
        .then(resp => resp.json())
        .then(retorno_convertido => setTipoUsuario(retorno_convertido))//lista os usuarios
    }, [])

    const [objUsuario, setObjUsuario] = useState(usuario)
    const [tipoUsuarios, setTipoUsuario] = useState([])

    return(
        <div>
            <form>
                <input
                    required
                    name="nome" className="Nome"
                    type="text" placeholder="Informe o nome"
                    onChange={post}
                />
                <input
                    required
                    name="nif" className="nif"
                    type="text" placeholder="Informe o nif"
                    onChange={post}
                />
                <input
                    required
                    name="email" className="email"
                    type="text" placeholder="Informe o E-mail"
                    onChange={post}
                />
                <input
                    required
                    name="senha" className="senha"
                    type="text" placeholder="Digite sua senha"
                    onChange={post}
                />
                <label>selecione o tipo de usuário</label>
                <select name="tipoUsuario" onChange={post}>
                    {
                        tipoUsuarios.map((obj) => (
                            <option key={obj}>
                            {obj}
                            </option>
                        ))
                    }
                </select>
                <button onClick={cadastrar}>Cadastrar</button>
            </form>
        </div>
    )
}
export default FormUsuario