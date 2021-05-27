import React from 'react';
import na from '../images/not-authorized.png';

const notAuthorized = () => {
  return <img style={{ display: 'flex', justifyContent: 'center', marginTop: '5%', width: '80vw', height: '80vh' }} src={na}></img>;
};

export default notAuthorized;
