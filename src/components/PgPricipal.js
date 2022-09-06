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





const drawerWidth = 240;




const PgPricipal = ({ vetor }) => {
  const [instrutor, setInstrutor] = useState([]);
  useEffect(() => {
    getiInstrutor();

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

  console.log(vetor)
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  const buscarInstrutor = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:8080/api/instrutor/buscar/${key}`)
      result = await result.json();
      if (result) {
        setInstrutor(result)

      }

      }else{
        getiInstrutor();
      }
  }
    const deleteinstrutor = async (id) => {
         
    let result = await fetch(`http://localhost:8080/api/instrutor/${id}`, {

      method: "DELETE"
    });
    
    if (result) 
    {
     
      getiInstrutor();
      
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
        <Button style={{ margin: 24, width: 100 }} variant="contained">teste</Button>

        {/* <Link
        href="./teste1"
      >EEEEEE</Link> */}

        <Link
          href="/teste1"
          onClick={() => {

          }}
        >EEEEEE</Link>

        {/* <Link to="/teste1">EEEEE</Link> */}
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

        <TextField fullWidth onChange={buscarInstrutor} style={{ marginBottom: 25 }} label="buscar istrutor" id="fullWidth" type="" name="parametro" required="required" />



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
                  <StyledTableCell align="right"><Button onClick={() => deleteinstrutor(obj.id)} variant="contained">DELETAR</Button></StyledTableCell>
                  <StyledTableCell align="right"><Button variant="contained">ALTERAR</Button></StyledTableCell>
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
