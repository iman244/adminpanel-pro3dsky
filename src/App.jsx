import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./tools/ProtectedRoute";
import Page from "./components/page/Page";
import CreateUser from "./components/FetchesViews/CreateUser";
import UpdateUser from "./components/FetchesViews/UpdateUser";
import DeleteUser from "./components/FetchesViews/DeleteUser";
import UploadNewDesign from "./components/FetchesViews/UploadNewDesign";
import UpdateDesign from "./components/FetchesViews/UpdateDesign";
import DeleteDesign from "./components/FetchesViews/DeleteDesign";
import { QueryClient, QueryClientProvider } from "react-query";
import Users from "./views/Users/Users";
import LoginService from "./context/LoginService";
import UsersService from "./views/Users/UsersService";

/*

error when credential is wrong
skeleton
form for upload images
sidebar need to added in mobile devices
buttons react-hook-form are not responsive
signOut

*/

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <LoginService>
                <BrowserRouter>
                    <Routes>
                        <Route element={<ProtectedRoute />}>
                            <Route
                                path="/login"
                                element={<Page content={<span>home</span>} />}
                            />
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
                                path="/newDesign"
                                element={
                                    <Page content={<span>new design</span>} />
                                }
                            />
                            <Route
                                path="/newDesign/upload"
                                element={<Page content={<UploadNewDesign />} />}
                            />
                            <Route
                                path="/newDesign/update"
                                element={<Page content={<UpdateDesign />} />}
                            />
                            <Route
                                path="/newDesign/delete"
                                element={<Page content={<DeleteDesign />} />}
                            />

                            <Route
                                path="*"
                                element={<Page content={<span>home</span>} />}
                            />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </LoginService>
        </QueryClientProvider>
    );
}

export default App;
