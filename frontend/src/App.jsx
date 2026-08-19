import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import MainLayout from "./components/MainLayout";

import Dashboard from "./pages/Dashboard";
import Devices from "./pages/Devices";
import Rooms from "./pages/Rooms";
import Sensors from "./pages/Sensors";
import Analytics from "./pages/Analytics";
import Automation from "./pages/Automation";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* =========================
            PUBLIC
        ========================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* =========================
            AUTHENTICATED APP
        ========================= */}

        <Route element={<MainLayout />}>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/rooms"
            element={<Rooms />}
          />

          <Route
            path="/devices"
            element={<Devices />}
          />

          <Route
            path="/sensors"
            element={<Sensors />}
          />

          <Route
            path="/analytics"
            element={<Analytics />}
          />

          <Route
            path="/automation"
            element={<Automation />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;