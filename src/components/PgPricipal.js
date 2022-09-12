import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import teste1 from './teste1'
import { Link as RouterLink, MemoryRouter } from 'react-router-dom';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Alert from '@material-ui/lab/Alert';
import { toast, ToastContainer, cssTransition } from 'react-toastify';
import Grid from '@material-ui/core/Grid';





const drawerWidth = 240;
//modal css
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}))
const msgAlteracao = () => {

  console.log("entrei")

  toast.success("Usuário Alterado com Sucesso", {

    position: "top-right",

    autoClose: 1500,

    hideProgressBar: false,

    closeOnClick: true,

    pauseOnHover: true,

    theme: 'light',

    // faz com que seja possivel arrastar

    draggable: true,

    progress: undefined




  })

}


const PgPricipal = () => {
  const [instrutor, setInstrutor] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [idistrutor, setidisntrutor] = useState([])
  const [nomeistrutor, setnomeisntrutor] = useState([])
  const classes = useStyles();
  const modalCadastroAbrindo = () => setOpen(true);
  const modalCadastroFechando = () => setOpen(false);
  const modalAlterarAbrindo = (id, nome) => {
    setOpen2(true)
    setidisntrutor(id)
    setnomeisntrutor(nome)

  };
  const modalAlterarFechando = () => {
    setOpen2(false)
  };


  // metodo de msg de alteração feita com sucesso







  useEffect(() => {
    getiInstrutor();
    msgAlteracao();


  }, []);


  const getiInstrutor = async () => {
    let result = await fetch(`http://localhost:8080/api/instrutor`)
    result = await result.json();
    setInstrutor(result)

  }
  console.log(instrutor)

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


  const buscarInstrutor = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:8080/api/instrutor/buscar/${key}`)
      result = await result.json();
      if (result) {
        setInstrutor(result)

      }

    } else {
      getiInstrutor();
    }
  }
  const deleteinstrutor = async (id) => {
    let result = await fetch(`http://localhost:8080/api/instrutor/${id}`, {
      method: "DELETE"
    });

    if (result) {

      getiInstrutor();

    }


  }
  const cadastroInstrutor = async (event) => {

    event.preventDefault();
    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData)
    console.warn("teste", data)
    console.log("oi brasil", data.nome)
    console.warn("EVENTO", event.target)


    let obgj = {
      nome: data
    }
    console.warn(data)

    let result = await fetch(`http://localhost:8080/api/instrutor`, {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
    if (result) {
      getiInstrutor();
    }

  }
  const alterainstrutor = async (event) => {

    console.warn(event.target)

    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData)
    console.warn("teste", data)
    let obgj = {
      id: idistrutor,
      nome: data.nome

    }
    console.warn(obgj)
    let result = await fetch(`http://localhost:8080/api/instrutor/${idistrutor}`, {
      method: 'PUT',
      body: JSON.stringify(obgj),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })

    if (result) {
      console.warn("ENTREEEEI")
      getiInstrutor();
      msgAlteracao();
    }




  }



  /* const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false); */

  /*  const handleDrawerToggle = () => {
     setMobileOpen(!mobileOpen);
   }; */

  const drawer = (


    <div>


      <Toolbar />
      <a href="/">
        <img style={{ width: 150, margin: 20, position: 'relative', bottom: 72, left: 20 }} src="https://upload.wikimedia.org/wikipedia/commons/8/8c/SENAI_S%C3%A3o_Paulo_logo.png" alt="Senai"></img>
      </a>
      <Divider />
      <List>
        <Button onClick={modalCadastroAbrindo} style={{ margin: 10 }} variant="contained">cadastrar  isntrutor</Button>

        <Modal
          open={open}
          onClose={modalCadastroFechando}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"

        >
          <Box sx={style}>
            <h2 id="transition-modal-title">cadastro de instrutor</h2>
            <form onSubmit={cadastroInstrutor} >
              <TextField name="nome" type="text" label="nome" variant="outlined" />
              <Button variant="contained" style={{ margin: 10 }} type="submit" >cadastrar</Button>
            </form>
          </Box>
        </Modal>
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (








    <Box sx={{ display: 'flex' }}>

      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(0% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton

          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          /* container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }} */
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />

        <TextField fullWidth onChange={buscarInstrutor} style={{ marginBottom: 25 }} label="buscar istrutor" id="fullWidth" type="text" name="parametro" required="required" />
       
        <Box p={1}  m={1}    bgcolor="secondary.main" color="secondary.contrastText">
        <ToastContainer 
           
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell align="right">NOME</StyledTableCell>
                <StyledTableCell align="right">DELETAR</StyledTableCell>
                <StyledTableCell align="right">ALTERAR</StyledTableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {instrutor.map((obj) => (
                <StyledTableRow key={obj.id}>
                  <StyledTableCell component="th" scope="row">
                    {obj.id}
                  </StyledTableCell>
                  <StyledTableCell align="right">{obj.nome}</StyledTableCell>
                  <StyledTableCell align="right">< Button onClick={() => deleteinstrutor(obj.id)} variant="contained" color="primary" className={classes.button} startIcon={<DeleteIcon />} >DELETAR</Button></StyledTableCell>
                  <StyledTableCell align="right">< Button onClick={() => modalAlterarAbrindo(obj.id, obj.nome)} variant="contained" color="primary" className={classes.button} startIcon={<EditIcon />} >ALTERAR</Button></StyledTableCell>
                  <Modal
                    open={open2}
                    onClose={modalAlterarFechando}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"

                  >
                    <Box sx={style}>
                      <h2 id="transition-modal-title">alterar insturtor</h2>
                      <form onSubmit={alterainstrutor} >
                        <TextField name="nome" type="text" label="nome" defaultValue={nomeistrutor} placeholder={nomeistrutor} variant="outlined" />
                        <Button variant="contained" style={{ margin: 10 }} type="submit" >alterar</Button>
                      </form>



                    </Box>
                  </Modal>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>

  );
}

/**  ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
/**  window: PropTypes.func,*/
/**}; */

export default PgPricipal;
