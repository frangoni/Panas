import React, { useState, useEffect } from "react";
import Checkin from "../components/Checkin";
import messageHandler from "../../utils/notifications";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { createService } from "../../store/reducer/service";
import { findClient } from "../../store/reducer/client";

let initialRender = true;

const CheckinContainer = () => {
  const [patente, setPatente] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [estado, setEstado] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [producto, setProducto] = useState("");
  const [precio, setPrecio] = useState(0);
  const notification = messageHandler(useSnackbar());
  const [border, setBorder] = useState("transparent");
  const [disabled, setDisabled] = useState(false);
  const { created } = useSelector((state) => state.service);
  const { client } = useSelector((state) => state.client);

  const dispatch = useDispatch();

  const emptyForm = () => {
    setPatente("");
    setMarca("");
    setModelo("");
    setNombre("");
    setTelefono("");
    setEmail("");
    setEstado("");
    setObservaciones("");
    setProducto("");
  };

  useEffect(() => {
    if (initialRender) {
      initialRender = false;
    } else {
      if (created == "yes") {
        setBorder("lime");
        emptyForm();
        notification.success("Auto ingresado!");
        setDisabled(false);
      } else if (created == "no") {
        setBorder("red");
        notification.error("No se pudo crear, corrobore los datos ingresados");
      }
    }
  }, [created]);

  useEffect(() => {
    if (patente.length > 5) {
      dispatch(findClient(patente));
    }
  }, [patente]);

  useEffect(() => {
    if (client._id) {
      setPatente(client.patente);
      setMarca(client.marca);
      setModelo(client.modelo);
      setNombre(client.nombre);
      setEmail(client.email);
      setTelefono(client.telefono.toString());
      setDisabled(true);
    }
  }, [client]);

  const handlePatente = ({ target: { value } }) => {
    const valor = value.toUpperCase().trim(" ").slice(0, 7);
    setPatente(valor);
  };

  const handleSubmit = () => {
    let error = {};
    if (!patente.length) error = { ...error, patente: "Ingresar patente" };
    if (!marca.length) error = { ...error, marca: "Ingresar marca" };
    if (!modelo.length) error = { ...error, modelo: "Ingresar modelo" };
    if (!nombre.length) error = { ...error, nombre: "Ingresar nombre" };
    if (!telefono.length) error = { ...error, telefono: "Ingresar telefono" };
    if (!email.length || !/.+\@.+\..+/.test(email)) error = { ...error, email: "Ingresar email correctamente" };
    if (!producto.length) error = { ...error, producto: "Ingresar producto" };
    //setPrecio
    let errorArray = Object.values(error);
    let client = { patente, marca, modelo, nombre, telefono, email };
    console.log("client :", client);
    let service = { producto, precio, estado, observaciones };
    if (!errorArray.length) {
      dispatch(createService({ service, client }));
    } else {
      notification.error(errorArray[0]);
      setBorder("red");
    }
  };
  return (
    <Checkin
      datos={{ patente, marca, modelo, nombre, telefono, email, estado, observaciones, producto }}
      setters={{
        setMarca,
        setModelo,
        setNombre,
        setTelefono,
        setEmail,
        setEstado,
        setObservaciones,
        setProducto,
      }}
      handleSubmit={handleSubmit}
      border={border}
      handlePatente={handlePatente}
      disabled={disabled}
    />
  );
};

export default CheckinContainer;
