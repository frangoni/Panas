import React from 'react';
import { TransitionModal } from './styledcomponents';
import CancelIcon from '@material-ui/icons/Cancel';
import { IconButton } from '@material-ui/core';

const StationModal = ({ setVisible, service }) => {
  return (
    <TransitionModal>
      <div id='modal'>
        <h2 style={{ color: 'wheat' }}> {service._id}</h2>
        <span>
          <IconButton>
            <CancelIcon fontSize='large' onClick={() => setVisible(false)} />
          </IconButton>
        </span>
      </div>
    </TransitionModal>
  );
};

export default StationModal;
