import React from "react";
import { Select, MenuItem, TextField, Button } from "@material-ui/core";
import GlassCard from "./styledcomponents";
const Checkin = ({ datos, setters, handleSubmit, border, handlePatente, disabled }) => {
  const { patente, marca, modelo, nombre, telefono, email, estado, observaciones, producto } = datos;
  const { setMarca, setModelo, setNombre, setTelefono, setEmail, setEstado, setObservaciones, setProducto } = setters;
  const colorInput = "white";
  const colorLabel = "wheat";

  return (
    <GlassCard style={{ border: `thin solid ${border}` }}>
      <h2 className="title">CHECK-IN</h2>
      <div id="form">
        <TextField
          InputProps={{ style: { color: colorInput } }}
          InputLabelProps={{ style: { color: colorLabel } }}
          label="Patente"
          variant="outlined"
          value={patente}
          onChange={handlePatente}
        />
        <TextField
          InputProps={{ style: { color: colorInput } }}
          InputLabelProps={{ style: { color: colorLabel } }}
          required
          label="Marca"
          variant="outlined"
          value={marca}
          disabled={disabled}
          onChange={({ target: { value } }) => setMarca(value)}
        />
        <TextField
          InputProps={{ style: { color: colorInput } }}
          InputLabelProps={{ style: { color: colorLabel } }}
          required
          variant="outlined"
          label="Modelo"
          value={modelo}
          disabled={disabled}
          onChange={({ target: { value } }) => setModelo(value)}
        />
        <TextField
          InputProps={{ style: { color: colorInput } }}
          InputLabelProps={{ style: { color: colorLabel } }}
          required
          variant="outlined"
          label="Nombre completo"
          value={nombre}
          disabled={disabled}
          onChange={({ target: { value } }) => setNombre(value)}
        />
        <div>
          <TextField
            InputProps={{ style: { color: colorInput } }}
            InputLabelProps={{ style: { color: colorLabel } }}
            disabled
            label="Teléfono"
            defaultValue={`+54 011`}
            style={{ width: " 30%" }}
          />
          <TextField
            InputProps={{ style: { color: colorInput } }}
            InputLabelProps={{ style: { color: colorLabel } }}
            required
            variant="outlined"
            style={{ width: "70%" }}
            value={telefono}
            disabled={disabled}
            onChange={({ target: { value } }) => /^[0-9\b]+$/.test(value) && setTelefono(value)}
          />
        </div>
        <TextField
          InputProps={{ style: { color: colorInput } }}
          InputLabelProps={{ style: { color: colorLabel } }}
          required
          variant="outlined"
          label="Email"
          value={email}
          disabled={disabled}
          onChange={({ target: { value } }) => setEmail(value)}
        />

        <TextField
          InputProps={{ style: { color: colorInput } }}
          InputLabelProps={{ style: { color: colorLabel } }}
          label="Estado"
          variant="outlined"
          multiline
          rowsMax={4}
          rows={3}
          value={estado}
          onChange={({ target: { value } }) => setEstado(value)}
        />

        <TextField
          InputProps={{ style: { color: colorInput } }}
          InputLabelProps={{ style: { color: colorLabel } }}
          variant="outlined"
          label="Observaciones"
          multiline
          rowsMax={4}
          rows={3}
          value={observaciones}
          onChange={({ target: { value } }) => setObservaciones(value)}
        />
        <Select
          native
          required
          inputProps={{ style: { color: colorInput } }}
          value={producto}
          onChange={({ target: { value } }) => setProducto(value)}
          label="Productos"
        >
          <option value={"Lavado 1"}>Lavado 1</option>
          <option value={"Lavado 2"}>Lavado 2</option>
          <option value={"Lavado 3"}>Lavado 3</option>
        </Select>
        <Button id="btn" size="large" style={{ border: `thin solid ${border}` }} onClick={handleSubmit}>
          CHECKIN
        </Button>
      </div>
    </GlassCard>
  );
};

export default Checkin;
