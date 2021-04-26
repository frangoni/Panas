const messagesHandler = ({ enqueueSnackbar }) => {
  const notification = {
    error: (msg) =>
      enqueueSnackbar(`${msg}`, {
        variant: "error",
        preventDuplicate: true,
        anchorOrigin: { vertical: "top", horizontal: "center" },
      }),

    success: (msg) =>
      enqueueSnackbar(`${msg}`, {
        variant: "success",
        preventDuplicate: true,
        anchorOrigin: { vertical: "top", horizontal: "center" },
      }),

    info: (msg) =>
      enqueueSnackbar(`${msg}`, {
        variant: "info",
        preventDuplicate: true,
        anchorOrigin: { vertical: "top", horizontal: "center" },
      }),
  };

  return notification;
};

export default messagesHandler;
