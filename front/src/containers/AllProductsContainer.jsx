import React, { useState, useEffect } from "react";
import AllProducts from "../components/AllProducts";
import { editProduct } from "../../store/reducer/product";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import messageHandler from "../../utils/notifications";
let initialRender = true;

const AddProductsContainer = () => {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const dispatch = useDispatch();
  const notification = messageHandler(useSnackbar());

  const handleEdit = () => {};
  return <AllProducts handleEdit={handleEdit} />;
};

export default AddProductsContainer;
