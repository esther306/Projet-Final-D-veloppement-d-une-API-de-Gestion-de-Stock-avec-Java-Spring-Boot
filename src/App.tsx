import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DashboardLayout } from './layout/DashboardLayout'
import Register from './pages/Register';
import Login from './pages/Login';
import AdminUser from './pages/AdminUser';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <DashboardLayout />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-user" element={<AdminUser />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
