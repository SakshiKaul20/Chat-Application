import React from "react";
import Register from "./pages/Register";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import { useCookies } from "react-cookie";
import ChatRoom from "./pages/ChatRoom";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/login" element={<Login />} />
                <Route
                    exact
                    path="/"
                    element={
                        <ProtectedRoute>
                            <ChatRoom />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

const ProtectedRoute = ({ children }) => {
    const [cookies] = useCookies(["user"]);

    let user = cookies.user;
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};
