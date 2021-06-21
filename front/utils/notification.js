const messagesHandler = ({ enqueueSnackbar }) => {
  const notification = {
    error: (msg) =>
      enqueueSnackbar(`${msg}`, {
        variant: "error",
        preventDuplicate: true,
        anchorOrigin: { vertical: "top", horizontal: "center" },
        autoHideDuration: 2000,
        containerRoot: { position: "fixed" },
      }),

    success: (msg) =>
      enqueueSnackbar(`${msg}`, {
        variant: "success",
        preventDuplicate: true,
        anchorOrigin: { vertical: "top", horizontal: "center" },
        autoHideDuration: 2000,
        containerroot: { position: "fixed" },
      }),

    info: (msg) =>
      enqueueSnackbar(`${msg}`, {
        variant: "info",
        preventDuplicate: true,
        anchorOrigin: { vertical: "top", horizontal: "center" },
        autoHideDuration: 2000,
        containerroot: { position: "fixed" },
      }),
  };

  return notification;
};

export default messagesHandler;
