import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logo from '../assets/MyTinerary.png'
import {Link as LinkRouter, useNavigate} from "react-router-dom"; 
import  { useSelector } from 'react-redux';
import {useDispatch} from 'react-redux'
import userActions from '../Redux/action/userAction'


const pages = [
  { nombre: "Home", to: "/" },
  { nombre: "Cities", to: "/Cities" },     //nombre del estado  en la constante  entre [] va el valor del estado inicial.
];
const settings = [
  { nombre: "Sign In", to:"/Users" }, 
  { nombre:"Sign Up", to:"/SingUp" }
];

const NavBar = () => {
  const user = useSelector ((store) => store.userReducer.user)
  console.log(user)
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  async function signOut() {
    await dispatch(userActions.signOut(user.user.email))
      .then(navigate("/",{replace:true}))
  }

  return (
    <AppBar position="static" sx={{
      backgroundColor : 'black',
    }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box  sx={{
      alignItems:'center',
      marginTop:'0.3rem'
    }}>
          <img className='logo' src={logo} />
          </Box>
          


          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu} //Es un evento en donde onclick llama a la función
              color="inherit"
            >
            <MenuIcon /> 
              </IconButton>
              <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
             {pages.map((page, index) => (
                <LinkRouter
                  key={index}
                  to={page.to}
                  onClick={handleCloseNavMenu}
                >
                  <MenuItem sx={{'&:hover': {bgcolor: 'rgb(224,224,224)'}}} onClick={handleCloseUserMenu}>
                    <Typography sx={{padding: '2px', paddingLeft: '6px', paddingRight: '6px', color: 'rgb(2,0,3)'}} onClick={signOut}>Sign Out</Typography>
                  </MenuItem>
                </LinkRouter>
              ))}
            </Menu>
          </Box>
        
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              
            }}
          >
            My Tinerary
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {pages.map((page, index) => (
              <LinkRouter key={index} to={page.to} onClick={handleCloseNavMenu}>
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  {page.nombre}
                </Button>
              </LinkRouter>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              {user?<Avatar alt="imgUser" src={user.user?.avatar} sx={{ width: 40, height: 40 }} />
              :<Avatar alt="Remy Sharp" src="/broken-image.jpg"/>
              }
              </IconButton>

            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
             {user?(<MenuItem sx={{'&:hover': {bgcolor: 'rgb(224,224,224)'}}} onClick={handleCloseUserMenu}>
                    <Typography sx={{padding: '2px', paddingLeft: '6px', paddingRight: '6px', color: 'rgb(2,0,3)'}} onClick={signOut}>Sign Out</Typography>
                  </MenuItem>
                  )
             : settings.map((setting, index) => (
                <LinkRouter key={index} to={setting.to} onClick={handleCloseUserMenu}>
                  <Button textalign="center">{setting.nombre}</Button>
                </LinkRouter>
              ))}
              
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
