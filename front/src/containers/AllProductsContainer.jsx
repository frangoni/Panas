import React, { useState, useEffect } from "react";
import AllProducts from "../components/AllProducts";
import { editProduct, fetchProducts, deleteProduct } from "../../store/reducer/product";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import messageHandler from "../../utils/notification";

const AllProductsContainer = () => {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [editable, setEditable] = useState("");
  const dispatch = useDispatch();
  const notification = messageHandler(useSnackbar());
  const { products } = useSelector(({ product }) => product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const handleEditable = (id) => {
    id ? setEditable(id) : setEditable("");
    setNombre("");
    setPrecio("");
  };

  const handleEdit = (id) => {
    nombre.length || precio
      ? (dispatch(editProduct({ id, nombre, precio })),
        setNombre(""),
        setPrecio(""),
        setEditable(""),
        notification.success("Producto editado"))
      : notification.error("Completar datos");
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    notification.success("Producto eliminado");
  };

  return (
    <AllProducts
      products={products}
      handleEdit={handleEdit}
      handleEditable={handleEditable}
      handleDelete={handleDelete}
      editable={editable}
      nombre={nombre}
      precio={precio}
      setPrecio={setPrecio}
      setNombre={setNombre}
    />
  );
};

export default AllProductsContainer;
