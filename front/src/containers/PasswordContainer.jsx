import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import messageHandler from '../../utils/notification';
import { changePassword, getUsers } from '../../store/reducer/user';
import Password from '../components/Password';
import ConfirmationModal from '../components/ConfirmationModal';

const PasswordContainer = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [id, setId] = useState(0);
  const [hidden, setHidden] = useState(true);
  const { users, changed } = useSelector(({ user }) => user);
  const notification = messageHandler(useSnackbar());
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const handleSubmit = () => {
    const data = { id, password };
    if (!password || id == 0) {
      notification.error('Verificar campos');
    } else {
      dispatch(changePassword(data));
      setPassword('');
    }
    setHidden(true);
  };

  useEffect(() => {
    if (changed == 'yes') {
      notification.success(`Contraseña cambiada con éxito`);
    }
    if (changed == 'no') {
      notification.error('Verificar campos');
    }
  }, [changed]);
  return (
    <>
      <Password
        users={users}
        password={password}
        setPassword={setPassword}
        setHidden={setHidden}
        setId={setId}
      />
      {hidden ? null : (
        <ConfirmationModal
          text={`¿Confirmar acción?`}
          setHidden={setHidden}
          handleNext={handleSubmit}
        />
      )}
    </>
  );
};

export default PasswordContainer;
