import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./Services/ProtectedRoute";
import Page from "./components/page/Page";
import UploadDesign from "./components/FetchesViews/UploadDesign";
import { QueryClient, QueryClientProvider } from "react-query";
import Users from "./views/Users/Users";
import LoginService from "./context/LoginService";
import UsersService from "./views/Users/UsersService";
import Home from "./views/Home/home";
import { SnackbarProvider } from "notistack";
import Designs from "./views/Designs/Designs.jsx";
import DesignService from "./Services/DesignService";
import Product from "./views/Product/Product";
import AppService from "./Services/AppService";

/*

category not chosen don't error in uploadImages

we must check for error in uploadImages, for example if error happened do really no data save in mongodb and ArvanCloud?

proFree badge
upload the real file and download it

originalname may be same in /uploads backend

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
        <AppService>
          <LoginService>
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
                    path="/design"
                    element={
                      <Page
                        content={
                          <DesignService>
                            <Designs />
                          </DesignService>
                        }
                      />
                    }
                  />
                  <Route
                    path="/design/upload"
                    element={<Page content={<UploadDesign />} />}
                  />
                  <Route
                    path="/design/:id"
                    element={<Page content={<Product />} />}
                  />
                  <Route path="*" element={<Page content={<Home />} />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </LoginService>
        </AppService>
      </SnackbarProvider>
    </QueryClientProvider>
  );
}

export default App;
