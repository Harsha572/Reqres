import React, { useState} from "react";
import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Login from "./components/Login";
import UsersList from "./components/UsersList";
import EditUser from "./components/EditUser";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={token ? "/users" : "/login"} />} />
        <Route path="/login" element={token ? <Navigate to="/users" /> : <Login setToken={setToken} />} />
        <Route path="/users" element={token ? <UsersList /> : <Navigate to="/login" />} />
        <Route path="/edit/:id" element={token ? <EditUser /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
