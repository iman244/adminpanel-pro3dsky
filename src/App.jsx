import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./tools/ProtectedRoute";
import Login from "./views/Login/Login";
import Page from "./components/page/Page";

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
                        element={<Page content={<span>home</span>} />}
                    />
                    <Route
                        path="/users/create"
                        element={<Page content={<span>home</span>} />}
                    />
                    <Route
                        path="/users/update"
                        element={<Page content={<span>home</span>} />}
                    />
                    <Route
                        path="/users/delete"
                        element={<Page content={<span>home</span>} />}
                    />
                    <Route
                        path="/newDesign"
                        element={<Page content={<span>home</span>} />}
                    />
                    <Route
                        path="/newDesign/upload"
                        element={<Page content={<span>home</span>} />}
                    />
                    <Route
                        path="/newDesign/update"
                        element={<Page content={<span>home</span>} />}
                    />
                    <Route
                        path="/newDesign/delete"
                        element={<Page content={<span>home</span>} />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
