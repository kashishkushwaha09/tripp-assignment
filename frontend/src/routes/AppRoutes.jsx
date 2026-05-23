import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import UploadPage from "../pages/UploadPage";
import ItineraryDetails from "../pages/ItineraryDetails";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/upload"
        element={
          <ProtectedRoute>
            <UploadPage />
          </ProtectedRoute>
        }
      />
 <Route path="/share/:shareId" element={<ItineraryDetails />} />
      <Route
        path="/itinerary/:id"
        element={
          <ProtectedRoute>
            <ItineraryDetails />
          </ProtectedRoute> 
        }
      />
     
    </Routes>
  );
};

export default AppRoutes;
