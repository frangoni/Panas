import 'date-fns';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMetrics } from '../../../back/controllers/service';
import DatePicker from '../components/DatePicker';
import Metrics from '../components/Metrics';
import { TransitionDiv } from '../components/styledcomponents';

const MetricsContainer = () => {
  const [checkinDate, setCheckinDate] = useState(new Date());
  const [parkingDate, setParkingDate] = useState(new Date());
  const dispatch = useDispatch();
  const { metrics } = useSelector((state) => state.metrics);

  useEffect(() => {
    dispatch(getMetrics(checkinDate, parkingDate));
  }, []);
  return (
    <>
      <DatePicker checkinDate={checkinDate} parkingDate={parkingDate} setParkingDate={setParkingDate} setCheckinDate={setCheckinDate} />
      <TransitionDiv>
        <Metrics />
      </TransitionDiv>
    </>
  );
};

export default MetricsContainer;
