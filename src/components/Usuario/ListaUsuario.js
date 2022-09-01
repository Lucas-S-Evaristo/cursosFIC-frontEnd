function ListaUsuario({vetor}){
    return(
        <table className='tabelaUsuario'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>NIF</th>
              <th>Email</th>
              <th>Senha</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <tbody>
            {
              vetor.map((objeto,indice)=>(  
                <tr key={indice}>
                  <td>{objeto.id}</td>
                  <td>{objeto.nome}</td>
                  <td>{objeto.nif}</td>
                  <td>{objeto.email}</td>
                  <td>{objeto.senha}</td>
                  <td>{objeto.TipoUsuario}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
    )
}
export default ListaUsuario