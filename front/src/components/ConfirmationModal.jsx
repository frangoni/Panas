import React from 'react';
import { TransitionModal } from './styledcomponents';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import { IconButton } from '@material-ui/core';

const ConfirmationModal = ({ setHidden, handleNext }) => {
  return (
    <TransitionModal>
      <div id='modal'>
        <h2 style={{ color: 'wheat' }}>¿Estación terminada?</h2>
        <span>
          <IconButton size='large'>
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
