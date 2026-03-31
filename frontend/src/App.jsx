import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import HealthAnalysis from './pages/HealthAnalysis';
import CalendarView from './pages/CalendarView';
import FastingRegimens from './pages/FastingRegimens';

// Pulse page reuses FastingRegimens (it's the exercise/pulse section)
import PulsePage from './pages/PulsePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="analysis"  element={<HealthAnalysis />} />
          <Route path="calendar"  element={<CalendarView />} />
          <Route path="fasting"   element={<FastingRegimens />} />
          <Route path="pulse"     element={<PulsePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
