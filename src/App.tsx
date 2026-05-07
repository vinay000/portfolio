import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RootRoutes from './routes/RootRoutes';
import { ReactLenis } from '@studio-freight/react-lenis';
import { CustomCursor } from './components/CustomCursor';
import { TeslaGridCanvas } from './components/TeslaGridCanvas';
import { WordGameOverlay } from './components/WordGameOverlay';

const App: React.FC = () => {
  return (
    <ReactLenis root>
      <Router basename={import.meta.env.BASE_URL}>
        <CustomCursor />
        <TeslaGridCanvas />
        <div id="portfolio-content" className="w-full min-h-screen">
          <RootRoutes />
        </div>
        <WordGameOverlay />
      </Router>
    </ReactLenis>
  );
};

export default App;





