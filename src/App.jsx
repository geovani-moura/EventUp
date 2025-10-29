import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider } from "../src/contexts/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import EventsPage from "./pages/Events/EventsPage";
import EventCreate from "./pages/Events/EventCreate";
import EventDetails from "./pages/Events/EventDetails";
import EventEdit from "./pages/Events/EventEdit";
import ProfilePage from "./pages/Profile/ProfilePage";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rotas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/events/details/:id" element={<EventDetails />} />

          {/* Rotas privadas agrupadas */}
          <Route element={<PrivateRoute />}>
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/create" element={<EventCreate />} />
            <Route path="/events/edit/:id" element={<EventEdit />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          {/* Redirecionamento para página inicial se rota não encontrada */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
