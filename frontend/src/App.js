import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from "./pages/Home";
import { useAuth } from "./context /AuthContext";
const App = () => {
  const { token } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
