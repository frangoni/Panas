import React, { useState, useEffect } from "react";
import AddProducts from "../components/AddProduct";
import { createProduct } from "../../store/reducer/product";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import messageHandler from "../../utils/notifications";
let initialRender = true;

const AddProductsContainer = () => {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const dispatch = useDispatch();
  const notification = messageHandler(useSnackbar());
  const [border, setBorder] = useState("lime");
  const { product, created } = useSelector((state) => state.product);

  const emptyForm = () => {
    setNombre("");
    setPrecio("");
  };
  useEffect(() => {
    if (initialRender) {
      initialRender = false;
    } else {
      if (created == "yes") {
        setBorder("lime");
        emptyForm();
        notification.success(`Producto "${product.nombre}" creado!`);
      } else if (created == "no") {
        setBorder("red");
        notification.error("No se pudo crear, corrobore los datos ingresados");
      }
    }
  }, [created]);

  const handleSubmit = () => {
    let error = {};
    if (!nombre.length) error = { ...error, nombre: "Ingresar nombre del producto" };
    if (typeof precio !== "number") error = { ...error, precio: "Ingresar precio" };
    let errorArray = Object.values(error);
    if (!errorArray.length) {
      dispatch(createProduct({ nombre, precio }));
    } else {
      notification.error(errorArray[0]);
      setBorder("red");
    }
  };
  return (
    <AddProducts
      border={border}
      handleSubmit={handleSubmit}
      precio={precio}
      nombre={nombre}
      setNombre={setNombre}
      setPrecio={setPrecio}
    />
  );
};

export default AddProductsContainer;
