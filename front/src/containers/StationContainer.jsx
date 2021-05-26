import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchServices, updateService } from '../../store/reducer/service';
import Station from '../components/Station';
import ConfirmationModal from '../components/ConfirmationModal';
import messageHandler from '../../utils/notifications';
import { useSnackbar } from 'notistack';
import io from 'socket.io-client';

const StationContainer = () => {
  const dispatch = useDispatch();
  const { services } = useSelector((state) => state.service);
  const { user } = useSelector((state) => state.user);
  const [hidden, setHidden] = useState(false);
  const notification = messageHandler(useSnackbar());
  const socket = io(window.location.origin);

  const handleNext = (id) => {
    dispatch(updateService(id));
    const message = user.rol == 'parking' ? 'Servicio finalizado' : 'Auto enviado a próxima estación';
    notification.success(message);
  };

  const handleClose = () => {
    setHidden(true);
  };

  useEffect(() => {
    dispatch(fetchServices());
    socket.on('station', () => {
      dispatch(fetchServices());
    });
  }, []);

  return (
    <>
      <Station services={services} user={user} handleNext={handleNext} />
      <ConfirmationModal hidden={hidden} handleClose={handleClose} />
    </>
  );
};

export default StationContainer;
