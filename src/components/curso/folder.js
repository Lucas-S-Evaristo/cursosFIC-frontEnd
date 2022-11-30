import  React,{useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from '@mui/material/Modal';
import { width } from '@mui/system';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "46vh",
  height:"17.9vh",
  bgcolor: 'background.paper',
  boxShadow: 0,
  borderRadius:5,
  p: 4,
}

const msgWarning = () => {
  toast.warning("Selecione um curso existente", {
    position: "top-center",
    autoClose: 7500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    theme: "dark",
    // faz com que seja possivel arrastar
    draggable: true,
    progress: undefined,
  });
};

 function Folder() {
  const [cursos, setCursos] = useState([]);


  useEffect(() => {
    fetch("http://localhost:8080/api/curso")
      .then((resp) => resp.json())
      .then((retorno_convertido) => setCursos(retorno_convertido)); //lista de cursos
  }, []);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function gerarFolderCurso() {
    let id = document.getElementById("selectFolderC").value;

    console.log(id)

    if(id === "selecione"){
       
       msgWarning();
    }else{

       window.location.href = "http://localhost:8080/api/folder/curso/" + id;
    }
    

     

    
  }

  return (
    <div>
      <Button onClick={handleOpen} className="gerarfol" variant='contained' style={{backgroundColor:"black" ,position:"absolute", left:"161vh", top:"1.5vh"}}>Gerar folder</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <section className="sectFolderC">
          <h1 className="h1Modal">Escolha um curso</h1>
          <select
        id="selectFolderC"
        >
              <option>selecione</option>
                    {cursos.map((obj) => (
                      <option value={obj.id}>{obj.nome}</option>
                    ))}
         </select>

        <button onClick={gerarFolderCurso} className="btnfolderC"> GERAR </button>
          </section>
        </Box>
      </Modal>
    </div>
  );
}
export default Folder;