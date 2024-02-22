import React, {useState, useEffect} from 'react';
import { Box, CssBaseline, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import {Home, ViewList, Person} from '@mui/icons-material';
import { useLocation, useHref } from 'react-router-dom';
import logo from '../img/logo.jpg'

interface props {
	window?: () => Window;
}

const Sidebar: React.FC<props> = () => {
	const isSidebarOpen = false;
	const drawerWidth = 240
  const location = useLocation();
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

	useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


	return (
		<Box sx={{display: 'flex'}}>
			<CssBaseline />
			<Drawer
        sx={{
          width: windowSize.width <= 1200 ? 0 : drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: windowSize.width <= 1200 ? 0 : drawerWidth,
            boxSizing: 'border-box',
            background: 'gray'
          },
        }}
        variant="permanent"
        anchor="left"
				open={isSidebarOpen}
      >
        <Toolbar>
          <img src={logo} style={{width: 20, height: 20}} />
        </Toolbar>
        <Divider />
        <List>
          <ListItem disablePadding sx={{ color: '#757575' }}>
            <a href='/'>

            <ListItemButton sx={{ borderRadius: '15px', margin: '15px',backgroundColor: location.pathname === '/' ? '#fff' : 'transparent', '&:hover': { backgroundColor: '#fff', '& .MuiListItemIcon-root, & .MuiListItemText-primary': { color: '#757575' } } }}>
              <ListItemIcon sx={{ color: location.pathname === '/' ? '#757575' : '#fff' }}>
                <Home />
              </ListItemIcon>
              <ListItemText primary={"Inicio"} sx={{ color: location.pathname === '/' ? '#757575' : '#fff' }} />
            </ListItemButton>
            </a>
          </ListItem>
					<ListItem disablePadding sx={{ color: '#757575' }}>
            <a href='/perfil'>
            <ListItemButton sx={{ borderRadius: '15px', margin: '15px',backgroundColor: location.pathname === '/perfil' ? '#fff' : 'transparent', '&:hover': { backgroundColor: '#fff', '& .MuiListItemIcon-root, & .MuiListItemText-primary': { color: '#757575' } } }} >
              <ListItemIcon sx={{ color: location.pathname === '/perfil' ? '#757575' : '#fff' }}>
                <Person />
              </ListItemIcon>
              <ListItemText primary={"Perfil"} sx={{ color: location.pathname === '/perfil' ? '#757575' : '#fff' }} />
            </ListItemButton>
            </a>
          </ListItem>
					<ListItem disablePadding sx={{ color: '#757575' }}>
            <a href='/vista' >
            <ListItemButton sx={{ borderRadius: '15px', margin: '15px',backgroundColor: location.pathname === '/vista' ? '#fff' : 'transparent', '&:hover': { backgroundColor: '#fff', '& .MuiListItemIcon-root, & .MuiListItemText-primary': { color: '#757575' } } }}>
              <ListItemIcon sx={{ color: location.pathname === '/vista' ? '#757575' : '#fff' }}>
                <ViewList />
              </ListItemIcon>
              <ListItemText primary={"Vista"} sx={{ color: location.pathname === '/vista' ? '#757575' : '#fff' }}/>
            </ListItemButton>
            </a>
          </ListItem>
        </List>
      </Drawer>
		</Box>
	)
}

export default Sidebar;
