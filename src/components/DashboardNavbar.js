import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';
import Logo from './Logo';
import { useNavigate } from 'react-router-dom';


const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
    const navigate = useNavigate();

  return (
    <AppBar
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box sx={{ flexGrow: 1 }} />
        <Hidden lgDown>
          
          <IconButton color="inherit" onClick={() => {
            if(localStorage.getItem('role') == 'admin')navigate('/Login', { replace: true });
            if(localStorage.getItem('role') == 'super')navigate('/Loginsu', { replace: true });
                    localStorage.setItem('loginAdmin','');
                    localStorage.setItem('idAgence', '');
                    localStorage.setItem('idAdmin','');
                    localStorage.setItem('role', '');}}>
                      
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;
