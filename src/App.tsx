import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import theme from './styles/theme';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Solutions from './pages/Solutions';
import Consultations from './pages/Consultations';
import Products from './pages/Products';
import CleaningRobots from './pages/CleaningRobots';
import ServiceRobots from './pages/ServiceRobots';
import LogisticsRobots from './pages/LogisticsRobots';
import NovaRobot from './pages/NovaRobot';
import MiniRobot from './pages/MiniRobot';
import LuckiProRobot from './pages/LuckiProRobot';
import LuckiPlusRobot from './pages/LuckiPlusRobot';
import LuckiAutodoorRobot from './pages/LuckiAutodoorRobot';
import LuckibotRobot from './pages/LuckibotRobot';
import BeetleRobot from './pages/BeetleRobot';
import OmnieRobot from './pages/OmnieRobot';
import Scrubber75Robot from './pages/Scrubber75Robot';
import Scrubber50ProRobot from './pages/Scrubber50ProRobot';
import PhantasRobot from './pages/PhantasRobot';
import Vacum40Robot from './pages/Vacum40Robot';
import CaseStudies from './pages/CaseStudies';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import AIAgent from './components/AIAgent';
import { useScrollToTop } from './hooks/useScrollToTop';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <LanguageProvider>
        <Router>
          <AppContent />
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

function AppContent() {
  // This hook will scroll to top on every route change
  useScrollToTop();
  
  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/consultations" element={<Consultations />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/cleaning" element={<CleaningRobots />} />
          <Route path="/products/service" element={<ServiceRobots />} />
          <Route path="/products/logistics" element={<LogisticsRobots />} />
          <Route path="/robots/nova" element={<NovaRobot />} />
          <Route path="/robots/mini" element={<MiniRobot />} />
          <Route path="/robots/lucki-pro" element={<LuckiProRobot />} />
          <Route path="/robots/lucki-plus" element={<LuckiPlusRobot />} />
          <Route path="/robots/lucki-autodoor" element={<LuckiAutodoorRobot />} />
              <Route path="/robots/luckibot" element={<LuckibotRobot />} />
              <Route path="/robots/beetle" element={<BeetleRobot />} />
              <Route path="/robots/omnie" element={<OmnieRobot />} />
              <Route path="/robots/scrubber-75" element={<Scrubber75Robot />} />
              <Route path="/robots/scrubber-50-pro" element={<Scrubber50ProRobot />} />
              <Route path="/robots/phantas" element={<PhantasRobot />} />
              <Route path="/robots/vacum-40" element={<Vacum40Robot />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <AIAgent />
    </div>
  );
}

export default App;
