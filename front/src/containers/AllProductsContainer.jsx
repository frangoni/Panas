import React, { useState, useEffect } from 'react';
import AllProducts from '../components/AllProducts';
import { editProduct, fetchProducts, deleteProduct } from '../../store/reducer/product';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import messageHandler from '../../utils/notification';
import ConfirmationModal from '../components/ConfirmationModal';

const AllProductsContainer = () => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [editable, setEditable] = useState('');
  const [hidden, setHidden] = useState(true);
  console.log('hidden :', hidden);
  const [action, setAction] = useState('');
  const dispatch = useDispatch();
  const notification = messageHandler(useSnackbar());
  const { products } = useSelector(({ product }) => product);
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const handleEditable = (id, method) => {
    id ? (setEditable(id), setAction(method)) : setEditable('');
    setNombre('');
    setPrecio('');
    method == 'delete' ? setHidden(false) : setHidden(true);
  };

  const handleEdit = id => {
    nombre.length || precio
      ? (dispatch(editProduct({ id, nombre, precio })),
        setNombre(''),
        setPrecio(''),
        setEditable(''),
        notification.success('Producto editado'))
      : notification.error('Completar datos');
  };
  const handleDelete = id => {
    dispatch(deleteProduct(id));
    notification.success('Producto eliminado');
  };

  const handleNext = () => {
    action == 'edit' ? handleEdit(editable) : handleDelete(editable);
    setHidden(true);
  };
  const handleAction = str => {
    setAction(str);
    setHidden(false);
  };
  return (
    <>
      <AllProducts
        products={products}
        editable={editable}
        nombre={nombre}
        precio={precio}
        setPrecio={setPrecio}
        setNombre={setNombre}
        handleAction={handleAction}
        handleEditable={handleEditable}
      />
      {hidden ? null : (
        <ConfirmationModal
          text={`¿Confirmar acción?`}
          setHidden={setHidden}
          handleNext={handleNext}
        />
      )}
    </>
  );
};

export default AllProductsContainer;
