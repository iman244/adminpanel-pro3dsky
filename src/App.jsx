import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./Services/ProtectedRoute";
import Page from "./components/page/Page";
import CreateUser from "./components/FetchesViews/CreateUser";
import UpdateUser from "./components/FetchesViews/UpdateUser";
import DeleteUser from "./components/FetchesViews/DeleteUser";
import UploadDesign from "./components/FetchesViews/UploadDesign";
import UpdateDesign from "./components/FetchesViews/UpdateDesign";
import DeleteDesign from "./components/FetchesViews/DeleteDesign";
import { QueryClient, QueryClientProvider } from "react-query";
import Users from "./views/Users/Users";
import LoginService from "./context/LoginService";
import UsersService from "./views/Users/UsersService";
import Home from "./views/Home/home";
import { SnackbarProvider } from "notistack";
import Designs from "./views/Designs/Designs.jsx";
import DesignService from "./Services/DesignService";
import Product from "./views/Product/Product";

/*

delete

pro freebutton padding

page 404

*/

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={3000}
        style={{ width: "fit-content", minWidth: "0" }}
      >
        <LoginService>
          <DesignService>
            <BrowserRouter>
              <Routes>
                <Route element={<ProtectedRoute />}>
                  <Route
                    path="/users"
                    element={
                      <Page
                        content={
                          <UsersService>
                            <Users />
                          </UsersService>
                        }
                      />
                    }
                  />
                  <Route
                    path="/Design"
                    element={<Page content={<Designs />} />}
                  />
                  <Route
                    path="/Design/upload"
                    element={<Page content={<UploadDesign />} />}
                  />
                  <Route
                    path="/Design/:id"
                    element={<Page content={<Product />} />}
                  />
                  <Route path="*" element={<Page content={<Home />} />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </DesignService>
        </LoginService>
      </SnackbarProvider>
    </QueryClientProvider>
  );
}

export default App;
