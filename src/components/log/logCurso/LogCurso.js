import MenuLateral from "../../menu/MenuLateral";
import { Button, InputAdornment, Table, TableBody, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import TablePagination from '@mui/material/TablePagination';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useState, useEffect } from "react"

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

export default function LogCurso() {

    const [logCurso, setLogCurso] = useState([])

    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [page, setPage] = useState(0);

    const handleChangePage = (event, newPage) => {

        setPage(newPage);

    };

  const handleChangeRowsPerPage = (event) => {

    setRowsPerPage(parseInt(event.target.value, 10));

    setPage(0);
};

useEffect(() => {
    fetch("http://localhost:8080/api/log/logCurso")
      .then((resp) => resp.json())
      .then((retorno_convertido) => setLogCurso(retorno_convertido)); //lista de turmas
  }, []);
    
    return (

        <div>

            <MenuLateral/>

            <div className="conteudoTabela">
        <TableContainer className="tabelaContainer">

          <Table sx={{ minWidth: 1500 }} aria-label="customized table" className="tabelaTurma">
            <TableHead className="theadTurma">

              <TableRow>
                
                <StyledTableCell>Mensagem</StyledTableCell>
                <StyledTableCell>Nif</StyledTableCell>
                <StyledTableCell>Data</StyledTableCell>
                <StyledTableCell>Hora</StyledTableCell>
               

              </TableRow>
            </TableHead>
            <TableBody>

                {logCurso.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(
                    ({nomeUsuario, hora, data, logsEnum, nifUsuario}) => (
                        <StyledTableRow>
                             <StyledTableCell>O usuário {nomeUsuario} {logsEnum} um Curso</StyledTableCell>
                             <StyledTableCell>{nifUsuario}</StyledTableCell>
                             <StyledTableCell>{data}</StyledTableCell>
                             <StyledTableCell>{hora}</StyledTableCell>
                           
                        </StyledTableRow>
                    )
                )}
             
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

            count={logCurso.length}

            rowsPerPage={rowsPerPage}

            page={page}

            onPageChange={handleChangePage}

            onRowsPerPageChange={handleChangeRowsPerPage}

          />
        </TableContainer>
        </div>

        </div>

    )
}