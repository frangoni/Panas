import React from 'react';
import { TransitionDiv, GlassCard } from './styledcomponents';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import { IconButton } from '@material-ui/core';

const ConfirmationModal = ({ hidden, handleClose }) => {
  return (
    <TransitionDiv style={{ position: 'fixed', top: '50%', left: '50%', transform: ' translate(-50%, -50%)' }}>
      <GlassCard hidden={hidden} onClose={handleClose}>
        <div id='modal'>
          <h2 style={{ color: 'wheat' }}>¿Estación terminada?</h2>
          <span>
            <IconButton size='large'>
              <CheckCircleIcon style={{ color: 'wheat' }} fontSize='large' />
            </IconButton>
            <IconButton>
              <CancelIcon fontSize='large' />
            </IconButton>
          </span>
        </div>
      </GlassCard>
    </TransitionDiv>
  );
};

export default ConfirmationModal;
