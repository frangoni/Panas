import React from 'react';
import { Table, TableRow, TableData, TableHeader, Input } from './styledcomponents';
import IconButton from '@material-ui/core/IconButton';
/* import {ClearIcon, EditIcon} from '@material-ui/icons'; */
import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
const colorData = 'wheat';

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
