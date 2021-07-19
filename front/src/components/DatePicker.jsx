import 'date-fns';
import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { Picker } from './styledcomponents';
import { IconButton } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const DatePicker = ({ checkinDate, parkingDate, setParkingDate, setCheckinDate }) => {
  const colorInput = 'white';
  const colorLabel = 'wheat';
  const [icon, setIcon] = useState(<ExpandMoreIcon fontSize='large' />);
  const [opened, setOpened] = useState(false);

  const handleDate = date => {
    return new Date(date.replace(/^(\d{1,2}\/)(\d{1,2}\/)(\d{4})$/, '$2$1$3')).getTime();
  };
  const handleToggle = () => {
    setOpened(v => !v);
    opened
      ? setIcon(<ExpandMoreIcon fontSize='large' />)
      : setIcon(<ExpandLessIcon fontSize='large' />);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {opened && (
        <Picker style={{ zIndex: 1000 }}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin='normal'
              strictCompareDates={true}
              label='Desde'
              inputVariant='outlined'
              format='dd/MM/yyyy'
              value={checkinDate}
              onChange={(e, v) => {
                let timestamp = handleDate(v);
                setCheckinDate(timestamp);
              }}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              InputProps={{ style: { color: colorInput } }}
              InputLabelProps={{ style: { color: colorLabel } }}
              KeyboardButtonProps={{ style: { color: colorLabel } }}
            />

            <KeyboardDatePicker
              margin='normal'
              strictCompareDates={true}
              label='Hasta'
              inputVariant='outlined'
              format='dd/MM/yyyy'
              value={parkingDate}
              onChange={(e, v) => {
                let timestamp = handleDate(v);
                setParkingDate(timestamp);
              }}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              InputProps={{ style: { color: colorInput } }}
              InputLabelProps={{ style: { color: colorLabel } }}
              KeyboardButtonProps={{ style: { color: colorLabel } }}
            />
          </MuiPickersUtilsProvider>
        </Picker>
      )}
      <IconButton
        onClick={handleToggle}
        style={{
          backgroundColor: opened ? 'rgba(0,0,0,0)' : 'rgba(81, 79, 76)',
          boxShadow: opened
            ? null
            : 'inset -10px -10px 15px rgb(40 44 52 / 70%), inset 10px 10px 15px rgb(255 255 255 / 17%)',
          transform: 'scale(1.1)',
          position: 'fixed',
          top: '8px',
          color: colorLabel,
          zIndex: 1000,
        }}
      >
        {icon}
      </IconButton>
    </div>
  );
};

export default DatePicker;
