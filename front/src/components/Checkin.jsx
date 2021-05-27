import React from 'react';
import { TextField, Button, NativeSelect } from '@material-ui/core';
import { GlassCard } from './styledcomponents';
import logo from '../images/color.png';

const Checkin = ({ datos, setters, handleSubmit, border, handlePatente, disabled }) => {
  const { patente, marca, modelo, nombre, telefono, email, estado, observaciones, products } = datos;
  const { setMarca, setModelo, setNombre, setTelefono, setEmail, setEstado, setObservaciones, handleProduct } = setters;
  const colorInput = 'white';
  const colorLabel = 'wheat';

  return (
    <GlassCard style={{ border: `thin solid ${border}` }}>
      <div id='form'>
        <img src={logo} id='logo' alt='' />
        <h2 className='title'>CHECK-IN</h2>
        <TextField
          InputProps={{ style: { color: colorInput } }}
          InputLabelProps={{ style: { color: colorLabel } }}
          label='Patente'
          variant='outlined'
          value={patente}
          onChange={handlePatente}
        />
        <TextField
          InputProps={{ style: { color: colorInput } }}
          InputLabelProps={{ style: { color: colorLabel } }}
          required
          label='Marca'
          variant='outlined'
          value={marca}
          disabled={disabled}
          onChange={({ target: { value } }) => setMarca(value)}
        />
        <TextField
          InputProps={{ style: { color: colorInput } }}
          InputLabelProps={{ style: { color: colorLabel } }}
          required
          variant='outlined'
          label='Modelo'
          value={modelo}
          disabled={disabled}
          onChange={({ target: { value } }) => setModelo(value)}
        />
        <TextField
          InputProps={{ style: { color: colorInput } }}
          InputLabelProps={{ style: { color: colorLabel } }}
          required
          variant='outlined'
          label='Nombre completo'
          value={nombre}
          disabled={disabled}
          onChange={({ target: { value } }) => setNombre(value)}
        />
        <div>
          <TextField
            InputProps={{ style: { color: colorInput } }}
            InputLabelProps={{ style: { color: colorLabel } }}
            disabled
            label='Teléfono'
            defaultValue={`+54 011`}
            style={{ width: ' 30%' }}
          />
          <TextField
            InputProps={{ style: { color: colorInput } }}
            InputLabelProps={{ style: { color: colorLabel } }}
            required
            variant='outlined'
            style={{ width: '70%' }}
            value={telefono}
            disabled={disabled}
            onChange={({ target: { value } }) => /^[0-9\b]+$/.test(value) && setTelefono(value)}
          />
        </div>
        <TextField
          InputProps={{ style: { color: colorInput } }}
          InputLabelProps={{ style: { color: colorLabel } }}
          required
          variant='outlined'
          label='Email'
          value={email}
          disabled={disabled}
          onChange={({ target: { value } }) => setEmail(value)}
        />

        <TextField
          InputProps={{ style: { color: colorInput } }}
          InputLabelProps={{ style: { color: colorLabel } }}
          label='Estado'
          variant='outlined'
          multiline
          rowsMax={4}
          rows={3}
          value={estado}
          onChange={({ target: { value } }) => setEstado(value)}
        />

        <TextField
          InputProps={{ style: { color: colorInput } }}
          InputLabelProps={{ style: { color: colorLabel } }}
          variant='outlined'
          label='Observaciones'
          multiline
          rowsMax={4}
          rows={3}
          value={observaciones}
          onChange={({ target: { value } }) => setObservaciones(value)}
        />
        <NativeSelect inputProps={{ style: { color: colorInput } }} onChange={({ target: { value } }) => handleProduct(value)} label='Productos'>
          <option selected disabled>
            ELEGIR PRODUCTO
          </option>
          {products &&
            products.map((product, i) => (
              <option style={{ color: 'black' }} key={i} value={i}>
                {product.nombre}
              </option>
            ))}
        </NativeSelect>
        <Button id='btn' fontSize='large' style={{ border: `thin solid ${border}` }} onClick={handleSubmit}>
          CHECKIN
        </Button>
      </div>
    </GlassCard>
  );
};

export default Checkin;
