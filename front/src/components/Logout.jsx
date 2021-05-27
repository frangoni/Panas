import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { logout } from '../../store/reducer/user';
import { IconButton } from '@material-ui/core';
import messageHandler from '../../utils/notifications';
import { useSnackbar } from 'notistack';
import LogoutModal from './LogoutModal';

const Logout = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [hidden, setHidden] = useState(true);
  const notification = messageHandler(useSnackbar());

  const handleLogout = () => {
    dispatch(logout());
    setHidden(true);
    notification.success('Usuario deslogueado');
    history.push('/login');
  };
  if (location.pathname != '/login')
    return (
      <>
        <IconButton id='logout' onClick={() => setHidden(false)}>
          <PowerSettingsNewIcon fontSize='large' />
        </IconButton>
        {hidden ? null : <LogoutModal setHidden={setHidden} handleLogout={handleLogout} />}
      </>
    );
  return null;
};

export default Logout;
