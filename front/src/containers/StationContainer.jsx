import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchServices } from '../../store/reducer/service';
import Station from '../components/Station';

const StationContainer = () => {
  const dispatch = useDispatch();
  const { services } = useSelector((state) => state.service);
  const { user } = useSelector((state) => state.user);

  const handleNext = (id) => {
    console.log(id);
  };

  useEffect(() => {
    dispatch(fetchServices());
  }, []);

  return <Station services={services} user={user} handleNext={handleNext} />;
};

export default StationContainer;
