import { useSnackbar } from "notistack";
import React, { createContext } from "react";
import { useMutation } from "react-query";

export const AppContext = createContext();

const AppService = ({ children }) => {
  const logOut = useMutation(async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_NETWORKIP}/auth/logout`,
      { method: "GET", credentials: "include" }
    );
    return response.json();
  });

  const { enqueueSnackbar } = useSnackbar();
  const errorUI = (
    type,
    message = "if you see this, then you need provide message as a second variable"
  ) => {
    switch (type) {
      case "logout":
        enqueueSnackbar("you have been logout successfully", {
          variant: "info",
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
        break;
    }
    // console.log("now window.location.reload will be run, type is:", type);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const UserLog = (type, message, autoHideDuration = 3000) => {
    enqueueSnackbar(message, {
      variant: type,
      preventDuplicate: true,
      autoHideDuration,
    });
  };

  return (
    <AppContext.Provider value={{ errorUI, UserLog, logOut }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppService;
