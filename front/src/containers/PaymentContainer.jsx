import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchServices, setPaid } from '../../store/reducer/service';
import ConfirmationModal from '../components/ConfirmationModal';
import messageHandler from '../../utils/notification';
import { useSnackbar } from 'notistack';
import io from 'socket.io-client';
import StationModal from '../components/StationModal';
import Payment from '../components/Payment';

const PaymentContainer = () => {
  const dispatch = useDispatch();
  const { services } = useSelector(state => state.service);
  const { user } = useSelector(state => state.user);
  const [hidden, setHidden] = useState(true);
  const [visible, setVisible] = useState(false);
  const [method, setMethod] = useState('');
  const [id, setId] = useState('');
  const notification = messageHandler(useSnackbar());

  const handleNext = () => {
    const data = { id, method };
    if (!method.length) {
      notification.error('Seleccionar método');
    } else {
      dispatch(setPaid(data));
      setHidden(true);
      setMethod('');
      notification.success(`Servicio abonado con ${method}`);
    }
  };

  const filterServices = () => {
    return services.find(service => service._id == id);
  };

  useEffect(() => {
    dispatch(fetchServices());
    const socket = io(window.location.origin);
    socket.on('station', () => {
      dispatch(fetchServices());
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <Payment
        services={services}
        user={user}
        setId={setId}
        setHidden={setHidden}
        setVisible={setVisible}
        setMethod={setMethod}
        method={method}
      />
      {hidden ? null : (
        <ConfirmationModal
          setHidden={setHidden}
          handleNext={handleNext}
          text={`¿Confirmar pago?`}
          setMethod={setMethod}
          method={method}
          user={user}
        />
      )}
      {visible ? <StationModal setVisible={setVisible} service={filterServices()} /> : null}
    </>
  );
};

export default PaymentContainer;
