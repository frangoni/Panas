import React from "react";
import { Table, TableRow, TableData, TableHeader } from "./styledcomponents";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];
const colorData = "wheat";

export default function AllProducts({ handleEdit }) {
  return (
    <Table>
      <TableRow>
        <TableHeader>Dessert </TableHeader>
        <TableHeader>Protein&nbsp;(g)</TableHeader>
        <TableHeader>Editar</TableHeader>
      </TableRow>
      {rows.map((row) => (
        <TableRow key={row.name}>
          <TableData> {row.name}</TableData>
          <TableData>{row.calories}</TableData>
          <IconButton onClick={handleEdit} style={{ margin: "15px 0" }} color="inherit">
            <EditIcon />
          </IconButton>
        </TableRow>
      ))}
      <TableRow>
        <TableData>PRODUCTOS ACTUALES</TableData>
      </TableRow>
    </Table>
  );
}
