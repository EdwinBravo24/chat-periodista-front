import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import SalonInfo from './components/SalonInfo.jsx'; // Asegúrate de crear este archivo
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/salon/:roomId" element={<SalonInfo />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
