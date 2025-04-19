
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import CursorEffect from './components/cursor-effect';
import AIChat from './components/ai-chatbot';

function App() {
  return (
    <HashRouter>
      <CursorEffect />
      <AIChat />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
