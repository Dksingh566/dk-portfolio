
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import CursorEffect from './components/cursor-effect';
import AIChat from './components/ai-chatbot';

function App() {
  return (
    <Router>
      <CursorEffect />
      <AIChat />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
