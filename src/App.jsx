import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./Services/ProtectedRoute";
import Page from "./components/page/Page";
import UploadDesign from "./components/FetchesViews/UploadDesign";
import { QueryClient, QueryClientProvider } from "react-query";
import Users from "./views/Users/Users";
import LoginService from "./Services/LoginService";
import UsersService from "./Services/UsersService";
import Home from "./views/Home/home";
import { SnackbarProvider } from "notistack";
import Designs from "./views/Designs/Designs.jsx";
import DesignService from "./Services/DesignService";
import Product from "./views/Product/Product";
import AppService from "./Services/AppService";
import PageNotFound from "./views/404/PageNotFound";

const queryClient = new QueryClient();
/*
css sidebar, speacially front
*/
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
                                        element={
                                            <Page content={<UploadDesign />} />
                                        }
                                    />
                                    <Route
                                        path="/design/:id"
                                        element={<Page content={<Product />} />}
                                    />
                                    <Route
                                        path="/"
                                        element={<Page content={<Home />} />}
                                    />
                                    <Route
                                        path="*"
                                        element={
                                            <Page content={<PageNotFound />} />
                                        }
                                    />
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
