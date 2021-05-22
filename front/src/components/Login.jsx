import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GlassCard } from './styledcomponents';
import { IconButton, TextField } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import logo from '../images/color.png';

const colorInput = 'white';
const colorLabel = 'wheat';

export default function Login({ border, handleLogin, handleVisible, visible, nombre, setNombre, clave, setClave }) {
  const button = () => {
    return (
      <IconButton style={{ color: 'wheat', outline: 'none' }} onClick={handleVisible}>
        {visible ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    );
  };
  return (
    <GlassCard style={{ border: `thin solid ${border}` }}>
      <span id='login'>
        <img src={logo} id='logo' alt='' />
        <h2 className='title'>LOGIN</h2>
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
      </span>
      <div id='form'>
        <TextField
          InputProps={{ style: { color: colorInput } }}
          InputLabelProps={{ style: { color: colorLabel } }}
          label='Nombre'
          variant='outlined'
          value={nombre}
          onChange={({ target: { value } }) => {
            setNombre(value);
          }}
          autoFocus
        />
        <TextField
          InputProps={{ style: { color: colorInput }, endAdornment: button() }}
          InputLabelProps={{ style: { color: colorLabel } }}
          label='Clave'
          variant='outlined'
          type={visible ? 'text' : 'password'}
          value={clave}
          onChange={({ target: { value } }) => {
            setClave(value);
          }}
        />
        <Button id='btn' size='large' onClick={handleLogin}>
          LOGIN
        </Button>
      </div>
    </GlassCard>
  );
}
