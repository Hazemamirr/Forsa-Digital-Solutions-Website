import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import ProjectsPage from './pages/ProjectsPage';
import UseCasesPage from './pages/UseCasesPage';
import ContactPage from './pages/ContactPage';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';

export function App() {
  useIntersectionObserver();

  return (
    <Router>
      <div className="font-sans text-gray-800 bg-white min-h-screen">
        <Navbar />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/use-cases" element={<UseCasesPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
