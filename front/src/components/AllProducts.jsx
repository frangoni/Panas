import React from 'react';
import { Table, TableRow, TableData, TableHeader, Input } from './styledcomponents';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';

export default function AllProducts({ handleEdit, products, editable, handleEditable, handleDelete, nombre, precio, setNombre, setPrecio }) {
  return (
    <Table>
      <TableRow>
        <TableHeader>Producto </TableHeader>
        <TableHeader>Precio</TableHeader>
        <TableHeader>Editar</TableHeader>
      </TableRow>
      {products &&
        products.map((product) => (
          <TableRow key={product._id}>
            <TableData>
              {editable == product._id ? (
                <Input value={nombre} onChange={({ target: { value } }) => setNombre(value)} placeholder={product.nombre} />
              ) : (
                <p>{product.nombre}</p>
              )}
            </TableData>
            <TableData>
              {editable == product._id ? (
                <Input
                  value={precio}
                  onChange={({ target: { value } }) => /^[0-9]{0,5}$/.test(value) && setPrecio(value)}
                  placeholder={product.precio}
                />
              ) : (
                <p>${product.precio}</p>
              )}
            </TableData>

            <TableData>
              {editable == product._id ? (
                <>
                  <IconButton onClick={() => handleEditable()} style={{ margin: '15px 0', outline: 'none' }} color='inherit'>
                    <ClearIcon />
                  </IconButton>
                  <IconButton onClick={() => handleEdit(product._id)} style={{ margin: '15px 0', outline: 'none' }} color='inherit'>
                    <DoneIcon />
                  </IconButton>
                </>
              ) : (
                <>
                  <IconButton onClick={() => handleEditable(product._id)} style={{ margin: '15px 0', outline: 'none' }} color='inherit'>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(product._id)} style={{ margin: '15px 0', outline: 'none' }} color='inherit'>
                    <DeleteIcon />
                  </IconButton>
                </>
              )}
            </TableData>
          </TableRow>
        ))}
    </Table>
  );
}
