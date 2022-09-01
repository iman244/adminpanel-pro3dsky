import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./tools/ProtectedRoute";
import Login from "./views/Login/Login";
import Page from "./components/page/Page";
import CreateUser from "./components/FetchesViews/CreateUser";
import UpdateUser from "./components/FetchesViews/UpdateUser";
import DeleteUser from "./components/FetchesViews/DeleteUser";
import UploadNewDesign from "./components/FetchesViews/UploadNewDesign";
import UpdateDesign from "./components/FetchesViews/UpdateDesign";
import DeleteDesign from "./components/FetchesViews/DeleteDesign";

function App() {
    const [user, setUser] = useState(1);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route element={<ProtectedRoute isAllowed={user} />}>
                    <Route
                        path="/"
                        element={<Page content={<span>home</span>} />}
                    />
                    <Route
                        path="/users"
                        element={<Page content={<span>users</span>} />}
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
                        element={<Page content={<span>new design</span>} />}
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
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
