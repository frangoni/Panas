import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { logout } from '../../store/reducer/user';
import { IconButton } from '@material-ui/core';
import messageHandler from '../../utils/notifications';
import { useSnackbar } from 'notistack';

const Logout = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const notification = messageHandler(useSnackbar());

  const handleLogout = () => {
    dispatch(logout());
    notification.success('Usuario deslogueado');
    history.push('/login');
  };
  if (location.pathname != '/login')
    return (
      <IconButton id='logout' onClick={handleLogout}>
        <PowerSettingsNewIcon fontSize='large' />
      </IconButton>
    );
  return null;
};

export default Logout;
