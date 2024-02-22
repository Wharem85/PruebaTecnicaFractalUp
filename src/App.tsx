import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Vista from './pages/Vista';
import Vista2 from './pages/Vista2';
import Layout from './pages/Layout';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Layout><Home /></Layout>} />
        <Route path="/perfil" element={<Layout><Vista2 /></Layout>} />
        <Route path="/vista" element={<Layout><Vista /></Layout>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
