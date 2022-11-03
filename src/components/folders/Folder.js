import { useState, useEffect } from "react";

function gerarFolderTurma(){

    window.location.href = 'http://localhost:8080/api/folder/turma'
}

function gerarFolderCurso(){

  let id =  document.getElementById("selectFolder").value

  window.location.href = 'http://localhost:8080/api/folder/curso/' + id 
}

const estiloDiv = {
    marginTop:"500px"
  };

function Folder() {

    const [curso, setCurso] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/curso")
            .then((resp) => resp.json())
            .then((retorno_convertido) => setCurso(retorno_convertido)); //lista de curso
    }, []);


    return (

        <>
        <select
        id="selectFolder">
              <option>Selecione um curso para gerar o folder:</option>
                    {curso.map((obj) => (
                      <option value={obj.id}>{obj.nome}</option>
                    ))}
         </select>

        <button onClick={gerarFolderCurso}> GERAR FOLDER CURSO</button>


        <div style={estiloDiv}>

        <button onClick={gerarFolderTurma}> GERAR FOLDER TURMA</button>
        </div>
     

         </>
    )
}

export default Folder