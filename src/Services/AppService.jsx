import { useSnackbar } from "notistack";
import React, { createContext } from "react";

export const AppContext = createContext();

const AppService = ({ children }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const errorUI = (
    type,
    message = "if you see this, then you need provide message as a second variable"
  ) => {
    switch (type) {
      case "logout":
        enqueueSnackbar("you have been logout successfully", {
          variant: "success",
          preventDuplicate: true,
        });
        break;
      case "cookieProblem":
        enqueueSnackbar("Your session is expired! please login again", {
          variant: "error",
          preventDuplicate: true,
        });
        break;
      case "custom":
        enqueueSnackbar(message, {
          variant: "error",
          preventDuplicate: true,
        });
    }
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };
  return (
    <AppContext.Provider value={{ errorUI }}>{children}</AppContext.Provider>
  );
};

export default AppService;
