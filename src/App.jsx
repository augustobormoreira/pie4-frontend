import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './index.css'
import PrivateRoute from './components/PrivateRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import DiscoverPage from './pages/DiscoverPage'
import StudyPage from './pages/StudyPage';
import CollectionFormPage from './pages/CollectionFormPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/settings" element={<PrivateRoute><SettingsPage /></PrivateRoute>} />

      
      <Route path="/discover" element={<PrivateRoute><DiscoverPage /></PrivateRoute>} />
      <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
      
      <Route path="/collections/:id/study" element={<PrivateRoute><StudyPage /></PrivateRoute>} />
      <Route path="/collections/new" element={<PrivateRoute><CollectionFormPage /></PrivateRoute>} />
      <Route path="/collections/:id/edit" element={<PrivateRoute><CollectionFormPage /></PrivateRoute>} />
      
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;