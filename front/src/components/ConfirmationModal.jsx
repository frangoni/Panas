import React from 'react';
import { TransitionModal } from './styledcomponents';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import {
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  FormControl,
} from '@material-ui/core';

const ConfirmationModal = ({ setHidden, handleNext, text, method, setMethod, user }) => {
  return (
    <TransitionModal>
      <div id='modal'>
        <h2 style={{ color: 'wheat' }}>{text}</h2>
        {user && user.rol == 'caja' ? (
          <FormControl style={{ margin: '5vh 0' }}>
            <FormLabel style={{ color: 'white' }} component='legend'>
              Método
            </FormLabel>
            <RadioGroup
              aria-label='metodo'
              value={method}
              onChange={e => {
                let value = e.target.value;
                setMethod(value);
              }}
            >
              <FormControlLabel
                value='tarjeta'
                control={<Radio style={{ color: 'wheat' }} />}
                label='Tarjeta'
                style={{ color: 'white' }}
              />
              <FormControlLabel
                value='efectivo'
                control={<Radio style={{ color: 'wheat' }} />}
                label='Efectivo'
                style={{ color: 'white' }}
              />
            </RadioGroup>
          </FormControl>
        ) : null}
        <span>
          <IconButton>
            <CheckCircleIcon style={{ color: 'wheat' }} fontSize='large' onClick={handleNext} />
          </IconButton>
          <IconButton>
            <CancelIcon fontSize='large' onClick={() => setHidden(true)} />
          </IconButton>
        </span>
      </div>
    </TransitionModal>
  );
};

export default ConfirmationModal;
