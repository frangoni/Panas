import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import messageHandler from '../../utils/notification';
import SearchPlate from '../components/SearchPlate';
import { getServicesByPlate } from '../../store/reducer/service';

const SearchPlateContainer = () => {
  const dispatch = useDispatch();
  const notification = messageHandler(useSnackbar());
  const [patente, setPatente] = useState('');
  const { services } = useSelector(({ service }) => service);

  useEffect(() => {
    if (patente.length > 5) {
      dispatch(getServicesByPlate(patente));
    }
  }, [patente]);
  return (
    <>
      <SearchPlate patente={patente} setPatente={setPatente} services={services} />
    </>
  );
};

export default SearchPlateContainer;
