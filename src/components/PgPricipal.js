import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Input from '@material-ui/core/Input';
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
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';






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

    theme: 'colored',

    // faz com que seja possivel arrastar

    draggable: true,

    progress: undefined




  })

}


const PgPricipal = () => {
  const [horario, setHorario] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [idiHorario, setidHorario] = useState([]);
  const [pegarHorario, setpegarHorario] = useState([])
  const classes = useStyles();
  const modalCadastroAbrindo = () => setOpen(true);
  const modalCadastroFechando = () => setOpen(false);
  const modalAlterarAbrindo = (id, horario) => {
    setOpen2(true)
    setidHorario(id)
    setpegarHorario(horario)

  };
  const modalAlterarFechando = () => {
    setOpen2(false)
  };
 
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClick = () => {
    setOpen3(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen3(false);
  };
   

  // metodo de msg de alteração feita com sucesso







  useEffect(() => {
    getiHorario();
   
    
    
    


  }, []);


  const getiHorario = async () => {
    let result = await fetch(`http://localhost:8080/api/horario`)
    result = await result.json();
    setHorario(result)

  }
  

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

  const deletetarHorario = async (id) => {
    let result = await fetch(`http://localhost:8080/api/horario/${id}`, {
      method: "DELETE"
    });

    if (result) {
  
      getiHorario();

    }


  }
  const cadastroHorario = async (event) => {

    
    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData)
    console.warn("teste", data)
    console.log("oi brasil", data.nome)
    console.warn("EVENTO", event.target)


    let obgj = {
      nome: data
    }
    console.warn(data)

    let result = await fetch(`http://localhost:8080/api/horario`, {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
    if (result) {
      getiHorario();
    }

  }
  const alteraHorario = async (event) => {
   
    console.warn(event.target)

    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData)
    console.warn("teste", data)
    let obgj = {
      id: idiHorario,
      horario: data.horario

    }
    console.warn(obgj)
    let result = await fetch(`http://localhost:8080/api/horario/${idiHorario}`, {
      method: 'PUT',
      body: JSON.stringify(obgj),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })

    if (result) {
      console.warn("ENTREEEEI")
      getiHorario();
      
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
        <Button onClick={modalCadastroAbrindo} style={{ margin: 10 }} variant="contained">cadastrar  Horaio</Button>

        <Modal
          open={open}
          onClose={modalCadastroFechando}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"

        >
          <Box sx={style}>
            <h2 id="transition-modal-title">cadastro de horario</h2>
            <form onSubmit={cadastroHorario} >
              <TextField name="horario" type="time" label="horario" variant="outlined" 
           />
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

        <Snackbar open={open3} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          This is a success message!
        </Alert>
      </Snackbar>
      
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell align="right">Horario cadastrado</StyledTableCell>
                <StyledTableCell align="right">DELETAR</StyledTableCell>
                <StyledTableCell align="right">ALTERAR</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {horario.map((obj) => (
                <StyledTableRow key={obj.id}>
                  <StyledTableCell component="th" scope="row">
                    {obj.id}
                  </StyledTableCell>
                  <StyledTableCell align="right">{obj.horario}</StyledTableCell>
                  <StyledTableCell align="right">< Button onClick={() => deletetarHorario(obj.id)} variant="contained" color="primary" className={classes.button} startIcon={<DeleteIcon />} >DELETAR</Button></StyledTableCell>
                  <StyledTableCell align="right">< Button onClick={() => modalAlterarAbrindo(obj.id, obj.horario)} variant="contained" color="primary" className={classes.button} startIcon={<EditIcon />} >ALTERAR</Button></StyledTableCell>
                  <Modal
                    open={open2}
                    onClose={modalAlterarFechando}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"

                  >
                    <Box sx={style}>
                      <h2 id="transition-modal-title">alterar horario</h2>
                      <form onSubmit={alteraHorario}  >
                        <TextField name="horario" type="time" label="horario" defaultValue={pegarHorario}  variant="outlined" />
                        <Button variant="contained" style={{ margin: 10 }} type="submit"  >alterar</Button>
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
