import { Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import { Home } from "./pages";
import { LoginPage } from "./pages/auth/LoginPage";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div className="flex w-full bg-gray-50 ">
            <Routes>
                <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
                <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/Home/*" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
            </Routes>
        </div>
    );
}

export default App;
