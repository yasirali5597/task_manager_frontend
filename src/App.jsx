import { BrowserRouter, Routes, Route ,Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/protectedRoute";
import Register from "./pages/Register";
export default function App() {
  return (
   <BrowserRouter>
   <div >
      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
              
            </ProtectedRoute>
          }
        />
        
      </Routes>
      
      {/* <Text /> */}
      </div>
    </BrowserRouter>

    
  );
}
