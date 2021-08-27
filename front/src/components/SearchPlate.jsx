import React, { useState, useEffect } from 'react';
import {
  GlassCard,
  Input,
  Table,
  TableData,
  TableHeader,
  TableRow,
  TransitionDiv,
} from './styledcomponents';

const SearchPlate = ({ patente, setPatente, services }) => {
  const capitalize = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  return (
    <TransitionDiv>
      <GlassCard>
        <h2 className='title'> BUSCAR POR PATENTE</h2>
        <Input
          style={{ width: '50vw', height: '5vh', margin: '0 2vw 5vh' }}
          autoFocus
          placeholder={`Buscar patente`}
          title='message'
          type='text'
          value={patente}
          onChange={({ target }) => {
            setPatente(target.value.toUpperCase());
          }}
        />
      </GlassCard>
      {services.length ? (
        <TransitionDiv>
          <Table>
            <TableRow>
              <TableHeader>Ingreso</TableHeader>
              <TableHeader>Egreso</TableHeader>
              <TableHeader>Producto</TableHeader>
              <TableHeader>Cliente</TableHeader>
              <TableHeader>Teléfono</TableHeader>
              <TableHeader>Medio de pago</TableHeader>
              <TableHeader>Abonó</TableHeader>
            </TableRow>
            {services.map(service => {
              const ingreso = new Date(service.checkin);
              const egreso = new Date(service.parking);
              return (
                <TableRow key={service._id}>
                  <TableData>
                    <p>{`${ingreso.toLocaleDateString()} - ${ingreso.toLocaleTimeString()}`}</p>
                  </TableData>
                  <TableData>
                    <p>{`${egreso.toLocaleDateString()} - ${egreso.toLocaleTimeString()}`}</p>
                  </TableData>
                  <TableData>
                    <p>{service.producto.nombre}</p>
                  </TableData>
                  <TableData>
                    <p>{service.cliente.nombre}</p>
                  </TableData>
                  <TableData>
                    <p>{service.cliente.telefono}</p>
                  </TableData>
                  <TableData>
                    <p>{capitalize(service.medioDePago)}</p>
                  </TableData>
                  <TableData>
                    <p>{service.abonado ? 'Si' : 'No'}</p>
                  </TableData>
                </TableRow>
              );
            })}
          </Table>
        </TransitionDiv>
      ) : null}
    </TransitionDiv>
  );
};

export default SearchPlate;
