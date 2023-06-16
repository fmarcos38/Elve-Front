import React, { useEffect, useState } from 'react';
import styles from "./style.module.css";
import userLog from "../../localStorage/service";
import NavbarAdmin from "../NavbarAdmin";
import logo from "../../imagenes/logo.jpg";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import store from "../../localStorage/service";

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
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import NoiseControlOffIcon from '@mui/icons-material/NoiseControlOff';
//-----------

export default function Navbar() {
    
    const [userActual, setUserActual] = useState();//estado para actualizar user log
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const cart = useSelector((state) => state.cart);
    const navigate = useNavigate(); 

    //actualizo user logueado
    useEffect(()=>{
      const userLog = store.getUserActual(); 
      if(userLog){
        setUserActual(userLog);
      }
    },[]);
    
    //--para manejo de menues
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
    const logOut = ()=>{
        userLog.logout();
        navigate('/')
        window.location.reload();
    };

    
    return userActual?.user.role === 'admin' ? //sino pongo la bandera(?) desp de user no renderiza
    (
      <>
        <NavbarAdmin/>
      </> 
    ) : (
    <div className={styles.barra}>
      <Container maxWidth="xl">
          <Toolbar disableGutters>
                {/* logo */}
                <Link to="/" style={{ textDecoration: "none" }}>            
                  <img src={logo} alt="logo not found" className={styles.logo}/>
                </Link>

                {/* menu pant grande */}
                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                    {/* menu */}
                    <Link style={{ textDecoration: "none" }} to="/home">
                        <Button onClick={handleCloseNavMenu} className={styles.btnNavbar}
                            sx={{ my: 2, color: "black", display: "block" }}
                        >
                        Menú
                        </Button>              
                    </Link>
                    {/* Promos */}
                    <Link style={{ textDecoration: "none" }} to="/listaProdsOferta">
                      <Button onClick={handleCloseNavMenu} className={styles.btnNavbar} sx={{ my: 2, color: "black", display: "block" }}>
                        Promos
                      </Button>
                    </Link> 
                </Box>

                {/* icono/btn menu pant chica */}
                <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
                        <MenuItem >
                          <Link to="/home" style={{ textDecoration: "none"}}>
                            <Button textalign="center">Menú</Button>
                          </Link>
                        </MenuItem>
              
                        <MenuItem>
                          <Link to="/listaProdsOferta" style={{ textDecoration: "none" }}>
                            <Button textalign="center">Promos</Button>
                          </Link>
                        </MenuItem>
                        
                    </Menu>
                </Box>

                {/* carrito */}
                {
                  userActual &&
                  (
                    <Box>
                      <IconButton sx={{ mr: "6px", mt: "4px", p: "9px 6px 8px 6px" }}>
                        <Link to="/carrito" style={{ color: "grey" }}>
                          <AddShoppingCartIcon  fontSize="medium"/>
                          {
                            cart.length !==0 && 
                            <NoiseControlOffIcon sx={{color:'#7f0000',verticalAlign: 'top',ml:'-8px'}}/>
                          }
                        </Link>
                      </IconButton>
                    </Box>
                  )
                }

                {/* menu para usuario logueado Cuando pasa el mouse*/}
                {
                    userActual ? 
                    (
                      <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <p className={styles.nombUser}>Hola, {userActual.user.name}</p>
                            {/* <Avatar src={currentUser?.user.img || "/broken-image.jpg"} /> */}
                          </IconButton>
                        </Tooltip>
        
                        <Menu sx={{ mt: "45px" }} id="menu-appbar" anchorEl={anchorElUser} 
                          anchorOrigin={{ vertical: "top", horizontal: "right"}} keepMounted
                          transformOrigin={{ vertical: "top", horizontal: "right"}}
                          open={Boolean(anchorElUser)}
                          onClose={handleCloseUserMenu}
                        >
                        <MenuItem onClick={handleCloseUserMenu}>
                          <Link to="/userProfile" style={{ textDecoration: "none", color: "black" }}>
                            <Typography textalign="center">Perfil</Typography>
                          </Link>
                        </MenuItem>
                        <MenuItem>
                          <Link to="/userFavorites" style={{ textDecoration: "none", color: "black" }}>
                            <Typography textaling="center">Favorites</Typography>
                          </Link>
                        </MenuItem>
                        
                        <MenuItem>
                          <Typography sx={{ display: "flex", justifyContent: "center", alignItems: "center"}} onClick={logOut}>
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

