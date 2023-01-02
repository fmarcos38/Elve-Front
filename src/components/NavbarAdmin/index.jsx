import React,{useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../imagenes/logo.jpg";
import store from "../../localStorage/service";
import styles from "./styles.module.css";
//--material--
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
//-----------


function NavbarAdmin() {

  //estados para los menu
  const [anchorElNav, setAnchorElNav] = useState(null);//menu barra
  const [anchorElUser, setAnchorElUser] = useState(null);//menu user
  //estado para  user log
  const [userActual, setUserActual] = useState(undefined);
  const navigate = useNavigate();

  //actualizo user logueado
  useEffect(()=>{
    const userLog = store.getUserActual();
    if(userLog){
      setUserActual(userLog);
    }
  },[]);

  //logout
  const logout = () => {
    store.logout();
    navigate('/');
    window.location.reload();
  };

  //--actualizaciones de estados de los menu barra y  user
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
 
  return (
    <div className={styles.barra}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* logo */}
          <Link to="/" style={{ textDecoration: "none" }}>            
            <img src={logo} alt="logo not found" className={styles.logo}/>
          </Link>

          {/* menu pant grande */}
          <Box sx={{ minWidth: 120}} className={styles.menuPantallaG}>
            {/* Categorías */}
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small" className={styles.inpProd}>Categorías</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-simple-select"              
                label="Categorías"  
                className={styles.selectProd}            
              >
                <MenuItem>
                   <Link to={'/createCat'} className={styles.linkProd}>Crea/elimina categoría</Link>
                </MenuItem>
              </Select>
            </FormControl>
            
            {/* Productos */}
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small" className={styles.inpProd}>Productos</InputLabel>
              {/* Productos */}
              <Select
                labelId="demo-select-small"
                id="demo-simple-select"              
                label="Productos"  
                className={styles.selectProd}            
              >
                <MenuItem>
                 <Link to={'/formProd'} className={styles.linkProd}>Crea Producto</Link>
                </MenuItem>
                <MenuItem>
                   <Link to={'/home'} className={styles.linkProd}>Muestra Menú</Link>
                </MenuItem>
                <MenuItem>
                   <Link to={'/muestraListProds'} className={styles.linkProd}>Lista de Productos -Modifica - Elimina</Link>
                </MenuItem>
              </Select>                       
            </FormControl>
            
            {/* Clientes */} 
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small" className={styles.inpProd}>Clientes</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-simple-select"              
                label="Clientes"  
                className={styles.selectProd}            
              >
                <MenuItem>
                   <Link to={'/listaClientes'} className={styles.linkProd}>Muestra/Bloquea/Elim clientes</Link>
                </MenuItem>
              </Select>
            </FormControl>

            {/* Ventas */} 
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small" className={styles.inpProd}>Ventas</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-simple-select"              
                label="Ventas"  
                className={styles.selectProd}            
              >
                <MenuItem>
                   <Link to={'/listaVentas'} className={styles.linkProd}>Lista ventas</Link>
                </MenuItem>
              </Select>
            </FormControl>
          </Box>


          {/* icono/btn menu pant chica */}
          <Box sx={{ flexGrow: 1 }} className={styles.menuPantallaCH}>
            <IconButton
               size="large"
               aria-label="account of current user"
               aria-controls="menu-appbar"
               aria-haspopup="true"
               onClick={handleOpenNavMenu}
            >
               <MenuIcon />
            </IconButton>

            {/* composición del menu pantalla chica */}
            <Menu id="menu-appbar" anchorEl={anchorElNav}  anchorOrigin={{vertical: "bottom", horizontal: "left"}}
                keepMounted transformOrigin={{vertical: "top", horizontal: "left"}}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" }}}
            >
              {/* items categoría */}
              <MenuItem >
                <Link to="/createCat" style={{ textDecoration: "none"}}>
                  <Button textalign="center">Crea/elim Categoria</Button>
                </Link>
              </MenuItem>
              {/* muestra menú */}
              <MenuItem >
                <Link to="/home" style={{ textDecoration: "none"}}>
                  <Button textalign="center">Muestra Menú</Button>
                </Link>
              </MenuItem> 

              {/* lista todos los products */}
              <MenuItem>
                <Link to="/muestraListProds" style={{ textDecoration: "none" }}>
                  <Button textalign="center">Lista Productos-Modif-Elim</Button>
                </Link>
              </MenuItem>
                            
              {/* items Clientes */}
              <MenuItem>
                <Link to="/listaClientes" style={{ textDecoration: "none" }}>
                  <Button textalign="center">Lista Clientes-Bloq-Elim</Button>
                </Link>
              </MenuItem>

              {/* items ventas */}
              <MenuItem>
                <Link to="/listaVentas" style={{ textDecoration: "none" }}>
                  <Button textalign="center">Lista Ventas</Button>
                </Link>
              </MenuItem>
            </Menu>
          </Box>

          {/* menu para usuario logueado Cuando pasa el mouse*/}
          {
            userActual ? 
            (
              <Box  className={styles.contInfoUserLog}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {userActual.user.email === 'franco_freakout@hotmail.com' && <p className={styles.nombUser}>Hola, {userActual.user.name} novio de La Cande</p> }
                    {userActual.user.email === 'franco.mellado@hotmail.com' && <p className={styles.nombUser}>Hola, {userActual.user.name} pedazo de PUTO !!</p> }                   
                    {userActual.user.email === 'fmarcos_23@hotmail.com' && <p className={styles.nombUser}>Hola, {userActual.user.name} admin de esta cool Page</p> }                    
                  </IconButton>
                </Tooltip>
        
                <Menu sx={{ mt: "45px" }} id="menu-appbar" anchorEl={anchorElUser} 
                  anchorOrigin={{ vertical: "top", horizontal: "right"}} keepMounted
                  transformOrigin={{ vertical: "top", horizontal: "right"}}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {/* pantalla userProfile */}
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Link to="/userProfile" style={{ textDecoration: "none", color: "black" }}>
                      <Typography textalign="center">Perfil</Typography>
                    </Link>
                  </MenuItem>
                        
                  {/* logout */}      
                  <MenuItem>
                    <Typography sx={{ display: "flex", justifyContent: "center", alignItems: "center"}} onClick={logout}>
                      Logout <LogoutIcon sx={{ ml: "5px" }} />
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Link style={{ textDecoration: "none" }} to={"/Login"}>
                <Button>
                  {" "}
                  Login <LoginIcon fontSize="medium" />
                </Button>
              </Link>
            )
          }

        </Toolbar>
      </Container>
    </div>
  )
}

export default NavbarAdmin