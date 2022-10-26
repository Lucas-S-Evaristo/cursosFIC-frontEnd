import { Button, Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material"
import { useState } from "react"
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import MenuLateral from "../menu/MenuLateral"
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import TablePagination from '@mui/material/TablePagination';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function ListaArea() {

  const [idArea, setIdArea] = useState()
  const [area, setArea] = useState([])

  const [nome, setNome] = useState()

  const cadastrarArea = async (event) => {

    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData)

    let area = {
      nome: data
    }
    console.warn(data)

    let result = await fetch(`http://localhost:8080/api/area`, {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
    if (result) {
      getArea()
    }

  }

  const alterarArea = async (event) => {

    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData)

    let obgj = {
      id: idArea,
      horario: data.nome

    }
    console.warn(obgj)
    let result = await fetch(`http://localhost:8080/api/area/${idArea}`, {
      method: 'PUT',
      body: JSON.stringify(obgj),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })

    if (result) {
      getArea()
    }
  }

  const deletar = async (id) => {
    let result = await fetch(`http://localhost:8080/api/turma/${id}`, {
        method: "DELETE"
    })
    // caso já exista uma turma a ser deletado, ele atualiza a lista assim removendo a turma deletado
    if (result) {
      
    }
}

  const getArea = async () => {
    let result = await fetch(`http://localhost:8080/api/area`)
    result = await result.json();
    setArea(result)

  }

  const selecionarArea = (id, nome) => {

    setIdArea(id)
    setNome(nome)
   

}

  const [rowsPerPage, setRowsPerPage] = useState(10);

    const [page, setPage] = useState(0);

    const handleChangePage = (event, newPage) => {

        console.log("EVENTO" + event);

        console.log("PAGINA" + newPage);

        setPage(newPage);

    };

  const handleChangeRowsPerPage = (event) => {

    setRowsPerPage(parseInt(event.target.value, 10));

    setPage(0);
};

const [modalCadastrar, setShowCadastrar] = useState(false);

const [modalAlterar, setShow] = useState(false);

const abrirModalCadastrar = () => setShowCadastrar(true);

const fecharModalCadastrar = () => setShowCadastrar(false);

 //quando handleShow é chamado ele da um true no show e abre a modal
const abrirModalAlterar = () => setShow(true);

//quando handleClose é chamado ele da um false no show e fecha a modal
const fecharModalAlterar = () => setShow(false);

  return (
    <>
      <MenuLateral />
      <header>
        <div className="divBotaoAdd">
          <Button className="botaoAdd" variant="contained" color="primary"><AddOutlinedIcon />Novo</Button>
        </div>

        <form className="formBusca">
          <input
            //faz a busca
            name="parametro"
            required="required"
            className="buscarInput"
            type="text"
          />
        </form>

      </header>

      <div className="conteudoTabela">
        <TableContainer className="tabelaContainer">

          <Table sx={{ minWidth: 1500 }} aria-label="customized table" className="tabelaTurma">
            <TableHead className="theadTurma">
              <TableRow>
                <StyledTableCell>Id</StyledTableCell>
                <StyledTableCell>Nome</StyledTableCell>
                <StyledTableCell>Alterar</StyledTableCell>
                <StyledTableCell>Excluir</StyledTableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {area.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((
                { id, nome }) => (
                <StyledTableRow>

                  <StyledTableCell>{id}</StyledTableCell>
                  <StyledTableCell>{nome}</StyledTableCell>
                  

                  <StyledTableCell>
                    <button className="botaoAlterarTurma" onClick={() => {
                                            selecionarArea(id, nome)
                                            abrirModalAlterar()
                                          }}
                                            >
                      <ModeEditOutlinedIcon /></button>

                  </StyledTableCell>
                  <StyledTableCell><button className="botaoDeleteTurma" onClick={() => deletar(id)}><DeleteForeverOutlinedIcon /></button></StyledTableCell>
                </StyledTableRow>
              ))
              }
            </TableBody>
          </Table>
          <TablePagination

            sx={{

              marginTop: "40px",

              alignItems: "center",

              textAlign: "center",

            }}

            rowsPerPageOptions={[3, 5, 10, 15]}

            component="div"

            count={area.length}

            rowsPerPage={rowsPerPage}

            page={page}

            onPageChange={handleChangePage}

            onRowsPerPageChange={handleChangeRowsPerPage}

          />
        </TableContainer>



      </div>

    </>

  )

}

export default ListaArea