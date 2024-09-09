import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext"; // Import the context
import Loader from "./components/Loader";
import Login from "./Login";

import Offices from "./pages/Offices/Offices";
import ProtectedRoute from "./ProtectedRoute";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const DeptTable = lazy(() => import("./pages/DeptTable"));
const OfficeCreation = lazy(() => import("./pages/OfficeCreation"));
const ModifyOffice = lazy(() => import("./pages/ModifyOffice"));
const DepartmentCreation = lazy(() => import("./pages/DepartmentCreation"));
const OfficeRecords = lazy(() => import("./pages/Records/OfficeRecords"));
const EmployeeRecords = lazy(() => import("./pages/Records/EmployeesRecords"));

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect to login */}
            <Route path="/login" element={<Login />} />
            
            {/* Protected Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/office/:id"
              element={
                <ProtectedRoute>
                  <Offices />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-office"
              element={
                <ProtectedRoute>
                  <OfficeCreation />
                </ProtectedRoute>
              }
            />

         <Route   
              path="/modify-office/:id"
              element={
                <ProtectedRoute>
                  <ModifyOffice />
                </ProtectedRoute>
              }
            />

            <Route


              path="/dept-info/:id"
              element={
                <ProtectedRoute>
                  <DeptTable />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dept-creation"
              element={
                <ProtectedRoute>
                  <DepartmentCreation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/office-records"
              element={
                <ProtectedRoute>
                  <OfficeRecords />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee-records"
              element={
                <ProtectedRoute>
                  <EmployeeRecords />
                </ProtectedRoute>
              }
            />


       <Route path="/dept-info/:departmentName"
           element={ <ProtectedRoute>
            <DeptTable/>
          </ProtectedRoute>} />
          </Routes>

      
        </Suspense>
      </Router>
    </AuthProvider>
  );
};

export default App;
