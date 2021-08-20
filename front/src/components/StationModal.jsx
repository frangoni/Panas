import React from 'react';
import { TransitionModal } from './styledcomponents';
import CancelIcon from '@material-ui/icons/Cancel';
import { IconButton } from '@material-ui/core';

const StationModal = ({ setVisible, service }) => {
  console.log('service :', service);
  const date = new Date(service.checkin);
  console.log('date :', typeof date);
  return (
    <TransitionModal>
      <div id='modal'>
        <>
          <h3 style={{ color: 'wheat' }}>Recepción: {date.toLocaleString()}</h3>
          <h3 style={{ color: 'wheat' }}>Producto: {service.producto.nombre}</h3>
          <h3 style={{ color: 'wheat' }}>Estado: {service.estado}</h3>
          <h3 style={{ color: 'wheat' }}>Observaciones: {service.observaciones}</h3>
          <h3 style={{ color: 'wheat' }}>Patente: {service.cliente.patente}</h3>
          <h3 style={{ color: 'wheat' }}>Nombre: {service.cliente.nombre}</h3>
          <h3 style={{ color: 'wheat' }}>Telefono: {service.cliente.telefono}</h3>
          <h3 style={{ color: 'wheat' }}>Email: {service.cliente.email}</h3>
        </>
        <>
          <IconButton>
            <CancelIcon fontSize='large' onClick={() => setVisible(false)} />
          </IconButton>
        </>
      </div>
    </TransitionModal>
  );
};

export default StationModal;
