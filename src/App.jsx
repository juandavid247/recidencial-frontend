import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
// import Footer from './components/Footer';
// import Login from './pages/Login';
// import NotFound from './pages/NotFound';
// import ProtectedRoute from './components/ProtectedRoute';

import Profile from "./pages/Profile";
import ResidentsTable from "./components/ResidentsTable";
import VehiclesTable from "./components/VehiclesTable";
import ApartmentTable from "./components/ApartmentTable";
import VisitorsTable from "./components/VisitorsTable";
import EmpleadosTable from "./components/EmpleadosTable";

import Settings from "./pages/Settings";
import Live from "./pages/Live";

import "./index.css";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    // Cargar la preferencia de tema desde localStorage, si está disponible
    const savedTheme = localStorage.getItem("darkMode");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  const toggleTheme = () => {
    setDarkMode((prevDarkMode) => {
      const newDarkMode = !prevDarkMode;
      // Guardar la preferencia de tema en localStorage
      localStorage.setItem("darkMode", JSON.stringify(newDarkMode));
      return newDarkMode;
    });
  };

  return (
    <Router>
      <div
        className={`flex min-h-screen ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
      >
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          darkMode={darkMode}
        />
        <div
          className={`flex-1 xl:pl-8 lg:pl-4 md:pl-2 xs:pl-0 sm:pl-0 xl:pr-8 lg:pr-4 md:pr-2 xs:pr-0 sm:pr-0 ${
            darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
          }`}
        >
          <Header
            setSidebarOpen={setSidebarOpen}
            setSearchQuery={setSearchQuery}
            darkMode={darkMode}
            toggleTheme={toggleTheme}
          />
          <main className="py-8">
            <Routes>
              <Route path="/" element={<div>Home</div>} />
              <Route
                path="/residentes"
                element={
                  <ResidentsTable
                    searchQuery={searchQuery}
                    darkMode={darkMode}
                  />
                }
              />
              <Route
                path="/vehiculos"
                element={
                  <VehiclesTable
                    searchQuery={searchQuery}
                    darkMode={darkMode}
                  />
                }
              />
              <Route
                path="/apartamentos"
                element={
                  <ApartmentTable
                    searchQuery={searchQuery}
                    darkMode={darkMode}
                  />
                }
              />
              <Route
                path="/visitantes"
                element={
                  <VisitorsTable
                    searchQuery={searchQuery}
                    darkMode={darkMode}
                  />
                }
              />
              <Route
                path="/empleados"
                element={
                  <EmpleadosTable
                    searchQuery={searchQuery}
                    darkMode={darkMode}
                  />
                }
              />
              <Route
                path="/live"
                element={<Live darkMode={darkMode} searchQuery={searchQuery} />}
              />
              <Route
                path="/settings"
                element={<Settings darkMode={darkMode} />}
              />
              <Route path="/profile" element={<Profile />} />
              {/* <Route path="/login" element={<Login />} /> */}
              {/* Agrega rutas protegidas aquí si es necesario */}
              <Route path="*" element={<div>Not Found</div>} />
            </Routes>
          </main>
        </div>
      </div>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
