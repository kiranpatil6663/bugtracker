import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";

// Pages
import RoleSelect from "./pages/RoleSelect";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ManagerReport from "./pages/ManagerReport";


const PrivateRoute = ({ children }) => {
  const { user } = useContext(AppContext);
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children ? children : <Outlet />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoleSelect />} />
        <Route path="/login/:role" element={<Login />} />

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reports" element={<ManagerReport />} />
         
        </Route>
      </Routes>
    </Router>
  );
}

export default App;