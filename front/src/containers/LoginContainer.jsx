import React, { useState, useEffect } from 'react';
import Login from '../components/Login';
import { TransitionDiv } from '../components/styledcomponents';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/reducer/user';
import messageHandler from '../../utils/notifications';
import { useSnackbar } from 'notistack';

export default function LoginContainer({ history }) {
  const notification = messageHandler(useSnackbar());
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [nombre, setNombre] = useState('');
  const [clave, setClave] = useState('');
  const [border, setBorder] = useState('transparent');
  const { didLogin } = useSelector((state) => state.user);

  const emptyForm = () => {
    setNombre('');
    setClave('');
  };

  const handleBorder = (color) => {
    setBorder(color);
    setTimeout(() => {
      setBorder('');
    }, 2500);
  };
  const handleVisible = () => {
    setVisible((v) => !v);
  };

  const handleLogin = () => {
    dispatch(login({ nombre, clave }));
  };

  useEffect(() => {
    if (didLogin == 'yes') {
      setBorder('lime');
      notification.success('Usuario logueado!');
      setTimeout(() => {
        history.push('/');
      }, 1500);
    } else if (didLogin == 'no') {
      handleBorder('red');
      notification.error('No se pudo loguear, corrobore los datos ingresados');
      emptyForm();
    }
  }, [didLogin]);

  return (
    <TransitionDiv>
      <Login
        visible={visible}
        handleVisible={handleVisible}
        handleLogin={handleLogin}
        nombre={nombre}
        clave={clave}
        setNombre={setNombre}
        setClave={setClave}
        border={border}
      />
    </TransitionDiv>
  );
}
