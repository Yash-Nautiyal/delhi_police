import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import './style/theme.css';
import DashboardView from './view/dashboard/dashboard_view';
import StudentView from './view/students/student_view';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/dashboard" element={<DashboardView />} />
          <Route path="/students" element={<StudentView />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;