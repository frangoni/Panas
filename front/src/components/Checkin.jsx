import React from "react";
import { Select, MenuItem, TextField, Button } from "@material-ui/core";
import GlassCard from "./styledcomponents";
const Checkin = ({ datos, setters, handleSubmit, border, handlePatente }) => {
  const { patente, marca, modelo, nombre, telefono, email, estado, observaciones, producto } = datos;
  const { setMarca, setModelo, setNombre, setTelefono, setEmail, setEstado, setObservaciones, setProducto } = setters;
  const colorInput = "white";
  const colorLabel = "wheat";

  return (
    <GlassCard style={{ border: `thin solid ${border}` }}>
      <h2 className="title">CHECK-IN</h2>
      <div id="checkin">
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
          onChange={({ target: { value } }) => setMarca(value)}
        />
        <TextField
          InputProps={{ style: { color: colorInput } }}
          InputLabelProps={{ style: { color: colorLabel } }}
          required
          variant="outlined"
          label="Modelo"
          value={modelo}
          onChange={({ target: { value } }) => setModelo(value)}
        />
        <TextField
          InputProps={{ style: { color: colorInput } }}
          InputLabelProps={{ style: { color: colorLabel } }}
          required
          variant="outlined"
          label="Nombre completo"
          value={nombre}
          onChange={({ target: { value } }) => setNombre(value)}
        />
        <div>
          <TextField
            InputProps={{ style: { color: colorInput } }}
            InputLabelProps={{ style: { color: colorLabel } }}
            required
            disabled={true}
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
            onChange={({ target: { value } }) => setTelefono(value)}
          />
        </div>
        <TextField
          InputProps={{ style: { color: colorInput } }}
          InputLabelProps={{ style: { color: colorLabel } }}
          required
          variant="outlined"
          label="Email"
          value={email}
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
        <Select required value={producto} onChange={({ target: { value } }) => setProducto(value)} label="Productos">
          <MenuItem value={"Lavado 1"}>Lavado 1</MenuItem>
          <MenuItem value={"Lavado 2"}>Lavado 2</MenuItem>
          <MenuItem value={"Lavado 3"}>Lavado 3</MenuItem>
        </Select>
        <Button id="btn-checkin" size="large" style={{ border: `thin solid ${border}` }} onClick={handleSubmit}>
          CHECKIN
        </Button>
      </div>
    </GlassCard>
  );
};

export default Checkin;
