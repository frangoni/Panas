import React from "react";
import { Button, TextField } from "@material-ui/core";
import { GlassCard } from "./styledcomponents";

const AdminProducts = ({ handleSubmit, setNombre, setPrecio, border, nombre, precio }) => {
  const colorInput = "white";
  const colorLabel = "wheat";

  return (
    <GlassCard style={{ border: `thin solid ${border}` }}>
      <h2 className="title"> NUEVO PRODUCTO</h2>
      <div id="form">
        <TextField
          InputProps={{ style: { color: colorInput } }}
          InputLabelProps={{ style: { color: colorLabel } }}
          name="producto"
          variant="outlined"
          value={nombre}
          required
          label="Nombre"
          autoFocus
          onChange={({ target: { value } }) => setNombre(value)}
        />
        <TextField
          InputProps={{ style: { color: colorInput } }}
          InputLabelProps={{ style: { color: colorLabel } }}
          variant="outlined"
          required
          value={precio}
          label="Precio"
          name="precio"
          onChange={({ target: { value } }) => /^[0-9]{0,5}$/.test(value) && setPrecio(Number(value))}
        />
        <Button onClick={handleSubmit} id="btn" size="large" style={{ border: `thin solid ${border}` }}>
          CREAR
        </Button>
      </div>
    </GlassCard>
  );
};

export default AdminProducts;
