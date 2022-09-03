import { useEffect, useState } from 'react'
import  './lista.css'




function ListaCursos({excluir}){

    const cursoExcluir = {
        id: 0,
        nome: "",
        objetivo: "",
        preRequisito: "",
        conteudoProgramatico: "",
        sigla: "",
        cargaHoraria: 0,
        valor: 0
      }

    


    //useEffect faz a requisição com o back end pra receber os cursos e enviar ao use State
    useEffect(() => {
        fetch("http://localhost:8080/api/curso")
        .then(retorno => retorno.json())
        .then(retorno_convertido => setCursos(retorno_convertido))//retorno convertido tem a lista de todos os cursos
    }, [])

    excluir = () => {
        fetch("http://localhost:8080/api/curso/"+objCurso.id, {
          method: 'delete',
          headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
          }
    
        })
        .then(retorno => retorno.json())
        .then(retorno_convertido => {
         

            alert("excluido com sucesso")

            let vetorTemporario = [...cursos] //vetorTemporario vai ter acesso a todos os cursos

            //vetorIndex retorna a posição dos objetos
            let indice = vetorTemporario.findIndex((p) =>{

                
                return p.id === objCurso.id
            }) 

            //remover curso do vetorTemporario
             vetorTemporario.splice(indice, 1)

            //atualizar o vetor de cursos

            setCursos(vetorTemporario)

        })
      }


    const [cursos, setCursos] = useState([])

    const [objCurso] = useState(cursoExcluir)
    

    return(
        
        <div class="lista">
        
        
        <h1 class="titulo">Lista de cursos</h1>

        <table class="table">
 
    <thead class="table-dark">
     <tr  >
              <th>id:</th>
              <th>Nome:</th>
        
              <th>Carga Horaria:</th>
              <th>Conteúdo programático:</th>
            
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
            
                cursos.map((obj) => (
                    <tr>
                        <td  >{obj.id}</td>
                       
                        <td>{obj.nome}</td>
                    
                        <td>{obj.cargaHoraria}</td>
                        <td>{obj.conteudoProgramatico}</td>
                        
                        <td>{obj.nivel}</td>
                        <td>{obj.objetivo}</td>
                        <td>{obj.preRequisito}</td>
                        <td>{obj.sigla}</td>
                        <td>{obj.tipoAtendimento}</td>
                        <td>{obj.area}</td>
                        <td><button class="btn btn-secondary" onClick={excluir}>Excluir</button></td>

                    </tr>
                ))
        }

        </tbody>

        </table>
        
        </div>
    )
}
export default ListaCursos