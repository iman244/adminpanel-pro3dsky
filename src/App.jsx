import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./tools/ProtectedRoute";
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
                  path="/users/create"
                  element={<Page content={<CreateUser />} />}
                />
                <Route
                  path="/users/update"
                  element={<Page content={<UpdateUser />} />}
                />
                <Route
                  path="/users/delete"
                  element={<Page content={<DeleteUser />} />}
                />
                <Route
                  path="/Design"
                  element={<Page content={<span>new design</span>} />}
                />
                <Route
                  path="/Design/upload"
                  element={<Page content={<UploadDesign />} />}
                />
                <Route
                  path="/Design/update"
                  element={<Page content={<UpdateDesign />} />}
                />
                <Route
                  path="/Design/delete"
                  element={<Page content={<DeleteDesign />} />}
                />

                <Route path="*" element={<Page content={<Home />} />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </LoginService>
      </SnackbarProvider>
    </QueryClientProvider>
  );
}

export default App;
