import {
    Box,
    Button,
    AppBar,
    Toolbar,
    Divider,
    CssBaseline,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    Typography,
    Drawer,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { House, Person, Build, Dashboard, Brightness7, Brightness4, AccountCircle, Logout, Login  } from '@mui/icons-material'
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../utility/ThemeContext';
import { useAuth } from '../utility/AuthContext';



const drawerWidth = 240;

export default function Navbar() {
    const { isAuthenticated, logout } = useAuth();
    const { darkMode, toggleDarkMode } = useContext(ThemeContext);
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();

    const handleToggleDrawer = () => setMobileOpen((prevState) => !prevState);

    const handleAuthAction = () => {
        if (isAuthenticated) {
            logout(navigate);
        } else {
            navigate('/login');
        }
    };


    // links in mobile menu drawer
    const drawer = (
        <Box onClick={handleToggleDrawer} sx={{textAlign: 'center', paddingTop: 2}} >
            <Typography variant='overline' sx={{fontSize: '.75rem'}}>v 1 : 3</Typography>
            <Divider sx={{paddingTop: 1}}/>
            <List>
                <ListItem disablePadding>
                    <ListItemButton sx={{textAlign: 'start'}} to='/'>
                        <IconButton>
                            <House />
                        </IconButton>
                        <ListItemText primary='Home' sx={{marginLeft: 2}} />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton sx={{textAlign: 'start'}} to='/users'>
                        <IconButton>
                            <Person />
                        </IconButton>
                        <ListItemText primary='Users' sx={{marginLeft: 2}}/>
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton sx={{ textAlign: 'start' }} onClick={handleAuthAction}>
                        <IconButton>
                            {isAuthenticated ? <Logout /> : <Login />}
                        </IconButton>
                        <ListItemText primary={isAuthenticated ? 'Logout' : 'Login'} sx={{ marginLeft: 2 }} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    )


    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <IconButton color='inherit'
                                aria-label='open drawer'
                                edge='start'
                                onClick={handleToggleDrawer}
                                sx={{mr: 2, display: {sm: 'none'} }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography varaint='overline' component='div' sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}>
                        1.3
                    </Typography>
                    <Box sx={{ display: {xs: 'none', sm: 'block'} }}>

                        <Button variant='text' color='inherit' component={Link} to='/'
                                sx={{ textDecoration: 'none'}}>
                            Home
                        </Button>

                        <Button variant='text' color='inherit' component={Link} to='/users'
                                sx={{ textDecoration: 'none'}}>
                            Users
                        </Button>

                        <Button variant='text' color='inherit' onClick={handleAuthAction}>
                            {isAuthenticated ? 'Logout' : 'Login' }
                        </Button>
                    </Box>
                    <Button color='inherit' onClick={toggleDarkMode} >
                        { darkMode ? <Brightness7 /> : <Brightness4 /> }
                    </Button>
                    <IconButton>
                        <AccountCircle />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    variant='temporary'
                    open={mobileOpen}
                    onClose={handleToggleDrawer}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: {xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
        </Box>
    );
}