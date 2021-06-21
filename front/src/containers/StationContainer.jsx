import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchServices, updateService } from "../../store/reducer/service";
import Station from "../components/Station";
import ConfirmationModal from "../components/ConfirmationModal";
import messageHandler from "../../utils/notification";
import { useSnackbar } from "notistack";
import io from "socket.io-client";

const StationContainer = () => {
  const dispatch = useDispatch();
  const { services } = useSelector((state) => state.service);
  const { user } = useSelector((state) => state.user);
  const [hidden, setHidden] = useState(true);
  const [id, setId] = useState("");
  const notification = messageHandler(useSnackbar());
  const socket = io(window.location.origin);

  const handleNext = () => {
    dispatch(updateService(id));
    setHidden(true);
    const message = user.rol == "parking" ? "Servicio finalizado" : "Auto enviado a próxima estación";
    notification.success(message);
  };

  useEffect(() => {
    dispatch(fetchServices());
    socket.on("station", () => {
      dispatch(fetchServices());
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <Station services={services} user={user} setId={setId} setHidden={setHidden} />
      {hidden ? null : <ConfirmationModal setHidden={setHidden} handleNext={handleNext} />}
    </>
  );
};

export default StationContainer;
