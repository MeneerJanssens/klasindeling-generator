import { useState } from 'react';
import KlasindelingApp from './components/KlasindelingApp';
import Sidebar from './components/Sidebar';
import About from './pages/About';
import Contact from './pages/Contact';
import Groepjesmaker from './pages/Groepjesmaker';
import ERBSimulator from './pages/ERBSimulator';
import ArchimedesSimulator from './pages/ArchimedesSimulator';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <KlasindelingApp />;
      case 'groepjesmaker':
        return <Groepjesmaker />;
      case 'erb-simulator':
        return <ERBSimulator />;
      case 'archimedes-simulator':
        return <ArchimedesSimulator />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      default:
        return <KlasindelingApp />;
    }
  };

  return (
    <div className="flex">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="flex-1 lg:ml-0">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;